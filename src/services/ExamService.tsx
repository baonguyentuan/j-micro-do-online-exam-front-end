import { number } from "yup"
import { ExamDetailFormModel } from "../_core/ExamModel"
import { BaseService } from "./BaseService"
import { ENDPOINT_URL } from "../utils/config"

class ExamService extends BaseService {
    constructor() {
        super()
    }
    creatExam = (examDetail: FormData) => {
        return this.post('exams/create', examDetail)
    }
    getExamOption=()=>{
        return this.get('exams/options')
    }
    editExam = (examDetail: FormData) => {
        return this.post('exams/edit', examDetail)
    }
    deleteExam=(examID:number)=>{
        return this.delete(ENDPOINT_URL.EXAM.DELETE_EXAM,examID)
    }

}
export const examService = new ExamService()