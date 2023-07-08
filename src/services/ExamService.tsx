import { BaseService } from "./BaseService"
import { ENDPOINT_PATH } from "../utils/config"

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

}
export const examService = new ExamService()