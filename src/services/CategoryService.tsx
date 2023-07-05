import { BaseService } from "./BaseService"

class CategoryService extends BaseService {
    constructor() {
        super()
    }
    getAllCategory = () => {
        return this.get('exams/categories/options')
    }
    getCategoryDetail=(idCategory:number)=>{
        return this.getByCondition('exams/categories/detail',idCategory)
    }
}
export const categoryService = new CategoryService()