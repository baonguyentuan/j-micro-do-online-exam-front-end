import {BaseService} from "./BaseService"


export interface ExamSearchParams{
    name: string | null
    duration: number
    category_ids: string | null
    from_date: string | null
    to_date:string | null
    page_size: number
    page_index:number
    order_by: number
}

class ExamService extends BaseService {
    constructor() {
        super()
    }
    creatExam = (examDetail: FormData) => {
        return this.post('exams/create', examDetail)
    }
    editExam = (examDetail: FormData) => {
        return this.post('exams/edit', examDetail)
    }
    deleteExam=(examID:number)=>{
        return this.delete('exams/delete',examID)
    }

    getExamByCategory = () =>{
        return this.get('exams/hot/category')
    }

    getExams = (params: ExamSearchParams) =>{
        return this.getByParams('exams/get',params)
    }

}
export const examService = new ExamService()