import React, { useEffect, useRef, useState } from 'react';
import * as UI from './style';
import * as Icon from '../../../../../assets/svg';
import FilterSearch from '../../filterSearch';

const FilterSearchInputOnly = () => {
  const [filterFold, setFilterFold] = useState(false);

  if (!filterFold) {
    return (
      <UI.EXContainer>
        <Icon.Search width={22} height={22} />
        <UI.Container>
          <UI.Input type='text' />
          <UI.FilterBtn onClick={() => setFilterFold(true)}>
            검색필터
          </UI.FilterBtn>
          <UI.SearchBtn>검색</UI.SearchBtn>
        </UI.Container>
      </UI.EXContainer>
    );
  } else {
    return <FilterSearch></FilterSearch>;
  }
};

export default FilterSearchInputOnly;
