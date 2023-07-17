
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
    editExam = (examDetail: Object) => {
        return this.post(ApiEndpoint.exam.EDIT, examDetail)
    }
    updateThumbnailExam = (thumbnail: FormData) => {
        return this.put(ApiEndpoint.exam.UPDATE_THUMBNAIL, thumbnail)
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
    fetchExamDetail = (name: object)=>{
        return this.getByParams(ApiEndpoint.exam.FETCH_DETAIL,name)
    }
    getFullExamDetail=(param:{id:number})=>{
        return this.getByParams(ApiEndpoint.exam.GET_FULL_DETAIL,param)
    }
    submitExamData = (data: object)=>{
      return this.post(ApiEndpoint.exam.SUBMIT_EXAM,data)
    }
}
export const examService = new ExamService()