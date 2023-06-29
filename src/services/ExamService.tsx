import { ExamDetailFormModel } from "../_core/ExamModel"
import { BaseService } from "./BaseService"

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

}
export const examService = new ExamService()