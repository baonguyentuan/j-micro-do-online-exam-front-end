
import { BaseService } from "./BaseService"
import {ExamSearchParams} from "../_core/exam";
import ApiEndpoint from "../constants/ApiEndpoint";


class ExamService extends BaseService {
    constructor() {
        super()
    }

    creatExam = (examDetail: FormData) => {
        return this.post(ApiEndpoint.exam.CREATE, examDetail)
    }
    getExamOption=()=>{
        return this.get(ApiEndpoint.exam.GET_EXAM_OPTIONS)
    }
    editExam = (examDetail: FormData) => {
        return this.post(ApiEndpoint.exam.EDIT, examDetail)
    }
    deleteExam=(examID:number)=>{
        return this.delete(ApiEndpoint.exam.DELETE,examID)
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