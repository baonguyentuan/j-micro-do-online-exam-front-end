
import { BaseService } from "./BaseService"
import { ENDPOINT_PATH } from "../utils/config"

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
        return this.post(ENDPOINT_PATH.EXAM.CREATE_EXAM, examDetail)
    }
    getExamOption=()=>{
        return this.get(ENDPOINT_PATH.EXAM.GET_EXAM_OPTION)
    }
    editExam = (examDetail: FormData) => {
        return this.post(ENDPOINT_PATH.EXAM.EDIT_EXAM, examDetail)
    }
    deleteExam=(examID:number)=>{
        return this.delete(ENDPOINT_PATH.EXAM.DELETE_EXAM,examID)
    }

    getExamByCategory = () =>{
        return this.get('exams/hot/category')
    }

    getExams = (params: ExamSearchParams) =>{
        return this.getByParams('exams/get',params)
    }

}
export const examService = new ExamService()