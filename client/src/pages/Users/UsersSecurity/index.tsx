import React, { useState, useEffect } from 'react';
import * as API from '../../../api/api';
import LNBLayout from '../../../components/molecules/LNBLayout';
import Avatar from '../../../components/molecules/Avatar';
import Form from '../../../components/atoms/Form';
import FormInputText from '../../../components/molecules/FormInputText';
import FormFooter from '../../../components/molecules/FormFooter';
import PopupCurrentPassword from './template/PopupCurrentPassword';
import Button from '../../../components/atoms/Button';
import { USERS } from '../../../constants/lnb';
import { BUTTON } from '../../../constants/input';
import { ROLE } from '../../../constants/member';
import { LABELTITLE, PLACEHOLDER } from '../../../constants/input';
import { ERROR } from '../../../constants/error';
import { validateEmail } from '../../../functions';
import * as UI from './style';
import InputFileButton from '../../../components/atoms/InputFileButton';

type valueObject = {
  [key: string]: any;
};

const UsersSignout = () => {
  const initialValue = {
    inputName: '',
    inputNickname: '',
    inputEmail: '',
    inputPassword: '',
    inputPasswordConfirm: '',
    inputPhone: '',
    inputRole: ROLE.USER,
  };

  const [openPopupCurrentPassword, setOpenPopupCurrentPassword] =
    useState(false);
  const [formValues, setFormValues] = useState<valueObject>(initialValue);
  const [formErrors, setFormErrors] = useState<valueObject>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const errors: valueObject = {};

  const handleOpenPopupCurrentPassword = (e: any) => {
    e.preventDefault();
    setOpenPopupCurrentPassword(true);
  };

  const handleClosePopupCurrentPassword = (e: any) => {
    e.preventDefault();
    setOpenPopupCurrentPassword(!openPopupCurrentPassword);
  };

  const handleChange = (e: any) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
    setIsSubmit(true);

    try {
      const data = {
        email: formValues.inputEmail,
        name: formValues.inputName,
        password: formValues.inputPassword,
        nickName: formValues.inputNickname,
        phoneNumber: formValues.inputPhone,
        role: formValues.inputRole,
      };

      await API.post('/api/users/register', '', data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values: any) => {
    const isInputNameValue = values.inputName;
    const isInputNicknameValue = values.inputNickname;
    const isInputEmailValue = values.inputEmail;
    const isInputPasswordValue = values.inputPassword;
    const isInputPasswordConfirmValue = values.inputPasswordConfirm;
    const isInputPhoneValue = values.inputPhone;

    const isValidEmail = validateEmail(values.inputEmail);

    const isPasswordMinLength = isInputPasswordValue.length >= 8;
    const isPhoneMinLength = isInputPhoneValue.length >= 11;
    const isNameMinLength = isInputNameValue < 2;

    if (!isInputNameValue) {
      errors.inputName = ERROR.NAME_INPUT;
    } else if (isNameMinLength) {
      errors.inputName = ERROR.NAME_MIN_LENGTH;
    }

    if (!isInputNicknameValue) {
      errors.inputNickname = ERROR.NICKNAME_INPUT;
    }

    if (!isInputEmailValue) {
      errors.inputEmail = ERROR.EMAIL_INPUT;
    } else if (!isValidEmail) {
      errors.inputEmail = ERROR.EMAIL_VALID;
    }

    if (!isInputPasswordValue) {
      errors.inputPassword = ERROR.PASSWORD_INPUT;
    } else if (!isPasswordMinLength) {
      errors.inputPassword = ERROR.PASSWORD_MIN_LENGTH;
    }

    if (!isInputPasswordConfirmValue) {
      errors.inputPasswordConfirm = ERROR.PASSWORD_INPUT;
    } else if (!isPasswordMinLength) {
      errors.inputPasswordConfirm = ERROR.PASSWORD_SAME;
    }

    if (!isInputPhoneValue) {
      errors.inputPhone = ERROR.PHONE_INPUT;
    } else if (!isPhoneMinLength) {
      errors.inputPhone = ERROR.PHONE_VALID;
    }

    return errors;
  };

  const inputTextData = {
    user: [
      {
        htmlFor: 'inputName',
        labelTitle: LABELTITLE.NAME,
        type: 'text',
        id: 'inputName',
        name: 'inputName',
        value: formValues.inputName,
        maxLength: undefined,
        autoComplete: undefined,
        onChange: handleChange,
        placeholder: PLACEHOLDER.NAME,
        error: formErrors.inputName,
      },
      {
        htmlFor: 'inputEmail',
        labelTitle: LABELTITLE.EMAIL,
        type: 'text',
        id: 'inputEmail',
        name: 'inputEmail',
        value: formValues.inputEmail,
        maxLength: undefined,
        autoComplete: undefined,
        onChange: handleChange,
        placeholder: PLACEHOLDER.EMAIL,
        error: formErrors.inputEmail,
      },
      {
        htmlFor: 'inputPassword',
        labelTitle: LABELTITLE.PASSWORD,
        type: 'password',
        id: 'inputPassword',
        name: 'inputPassword',
        value: formValues.inputPassword,
        maxLength: 20,
        autoComplete: 'current-password',
        onChange: handleChange,
        placeholder: PLACEHOLDER.PASSWORD,
        error: formErrors.inputPassword,
      },
      {
        htmlFor: 'inputPasswordConfirm',
        labelTitle: LABELTITLE.PASSWORD_CONFIRM,
        type: 'password',
        id: 'inputPasswordConfirm',
        name: 'inputPasswordConfirm',
        value: formValues.inputPasswordConfirm,
        maxLength: undefined,
        autoComplete: undefined,
        onChange: handleChange,
        placeholder: PLACEHOLDER.PASSWORD_CONFIRM,
        error: formErrors.inputPasswordConfirm,
      },
      {
        htmlFor: 'inputPhone',
        labelTitle: LABELTITLE.PHONE,
        type: 'text',
        id: 'inputPhone',
        name: 'inputPhone',
        value: formValues.inputPhone,
        maxLength: 11,
        autoComplete: undefined,
        onChange: handleChange,
        placeholder: PLACEHOLDER.PHONE,
        error: formErrors.inputPhone,
      },
    ],
  };

  return (
    <LNBLayout items={USERS}>
      <UI.Container>
        <UI.Content>
          <Avatar userId='userIDDDD' image={''} />
          <div>
            <InputFileButton />
            <Button component='disable' size={'small'}>
              삭제
            </Button>
          </div>

          <Form onSubmit={handleOpenPopupCurrentPassword}>
            {inputTextData.user.map((item, index) => {
              return FormInputText(item, index);
            })}

            <FormFooter>
              <Button component={'primary'} size={'large'} block>
                {BUTTON.USER_SECURITY_MODIFY}
              </Button>
            </FormFooter>
          </Form>
        </UI.Content>

        <PopupCurrentPassword
          open={openPopupCurrentPassword}
          onClose={handleClosePopupCurrentPassword}
        />
      </UI.Container>
    </LNBLayout>
  );
};

export default UsersSignout;