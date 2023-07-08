
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
        return this.get(ApiEndpoint.exam.GET_HOT_EXAMS_CATEGORY)
    }
    getExams = (params: ExamSearchParams) =>{
        return this.getByParams(ApiEndpoint.exam.GET,params)
    }
    getRandomExams = (name:object) =>{
       return this.getByParams(ApiEndpoint.exam.GET_RANDOM,name)
    }
    getExamDurationOptions = () =>{
        return this.get(ApiEndpoint.exam.GET_DURATIONS);
    }
    getExamOrderByOptions = ()=>{
        return this.get(ApiEndpoint.exam.GET_ORDER_BY)
    }
    getExamDetail = (name: object) =>{
        return this.getByParams(ApiEndpoint.exam.GET_DETAIL,name)
    }
    fetchExamDetail = (name: string)=>{
        return this.getByParams(ApiEndpoint.exam.FETCH_DETAIL,name)
    }
}
export const examService = new ExamService()