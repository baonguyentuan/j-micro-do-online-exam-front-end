import { CreateContestFormModel } from "../_core/ContestModel"
import { BaseService } from "./BaseService"

class CategoryService extends BaseService {
    constructor() {
        super()
    }
    getAllCategory = () => {
        return this.get('Category/getAllCategory')
    }
    updateCategoryById=(idCategory:string)=>{
        return this.put('Category/updateCategoryById',idCategory)
    }
}
export const categoryService = new CategoryService()