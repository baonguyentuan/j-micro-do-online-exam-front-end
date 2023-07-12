import {CategoryGetModel} from "../_core/CategoryModel"
import {BaseService} from "./BaseService"
import ApiEndpoint from "../constants/ApiEndpoint";

class CategoryService extends BaseService {
  constructor() {
    super()
  }

  getCategoryOption = () => {
    return this.get(ApiEndpoint.category.GET_CATEGORY_OPTION)
  }
  getCategoryByCondition = (condition: CategoryGetModel) => {
    return this.getByCondition(ApiEndpoint.category.GET, condition)
  }
  getCategoryDetail = (condition: { id: number }) => {
    return this.getByCondition(ApiEndpoint.category.GET_DETAIL, condition)
  }
  createCategory = (model: FormData) => {
    return this.post(ApiEndpoint.category.CREATE, model)
  }
  updateCategoryName = (model: Object) => {
    return this.putByParam(ApiEndpoint.category.UPDATE_CATEGORY_INFO, model)
  }
  updateCategoryThumbnail = (model: FormData) => {
    return this.put(ApiEndpoint.category.UPDATE_CATEGORY_THUMBNAIL, model)
  }
  deleteCategory = (idCategory: number) => {
    return this.delete(ApiEndpoint.category.DELETE, idCategory)
  }
}

export const categoryService = new CategoryService()