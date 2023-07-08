import { CategoryGetModel } from "../_core/CategoryModel"
import { ENDPOINT_PATH } from "../utils/config"
import { BaseService } from "./BaseService"

class CategoryService extends BaseService {
    constructor() {
        super()
    }
    getCategoryOption = () => {
        return this.get(ENDPOINT_PATH.CATEGORY.GET_CATEGORY_OPTION)
    }
    getCategoryByCondition = (condition: CategoryGetModel) => {
        return this.getByCondition(ENDPOINT_PATH.CATEGORY.GET_CATEGORY, condition)
    }
    getCategoryDetail = (condition: { id: number }) => {
        return this.getByCondition(ENDPOINT_PATH.CATEGORY.GET_CATEGORY_DETAIL, condition)
    }
    createCategory = (model: FormData) => {
        return this.post(ENDPOINT_PATH.CATEGORY.CREATE_CATEGORY, model)
    }
    updateCategoryName = (model: FormData) => {
        return this.put(ENDPOINT_PATH.CATEGORY.UPDATE_CATEGORY_INFO, model)
    }
    updateCategoryThumbnail = (model: FormData) => {
        return this.put(ENDPOINT_PATH.CATEGORY.UPDATE_CATEGORY_THUMBNAIL, model)
    }
    deleteCategory = (idCategory: number) => {
        return this.delete(ENDPOINT_PATH.CATEGORY.DELETE_CATEGORY, idCategory)
    }
}
export const categoryService = new CategoryService()