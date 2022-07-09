import { CategoryModel, categoryModel, restaurantModel} from "../db/data-source"
import { categoryInfo } from "../routers";

class CateogryService {
  categoryModel: CategoryModel
  // 본 파일의 맨 아래에서, new ReviewService(reviewModel) 하면, 이 함수의 인자로 전달됨
  constructor(categoryModel:CategoryModel) {
    this.categoryModel = categoryModel;
  }

  // 1. 생성
  async addCategory(categoryInfo:categoryInfo) {
        const createdNewReserve = await this.categoryModel.create(categoryInfo);
        return createdNewReserve;
      }
    
    //Time의 remainder를 우선적으로 줄이되 0보다 작으면 거절함.

  


  // 2. 삭제
  async removeCategory(category:string) {

        const deletedCategory = await this.categoryModel.deleteCategory(category);
        return deletedCategory;
  }
}

const categoryService = new CateogryService(categoryModel);

export { categoryService };