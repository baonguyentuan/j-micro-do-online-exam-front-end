import { ExamDetailFormModel } from "../_core/ExamModel"
import { BaseService } from "./BaseService"

class ExamService extends BaseService {
    constructor() {
        super()
    }
    creatExam = (examDetail: ExamDetailFormModel) => {
        return this.post('Exam/CreateExam', examDetail)
    }
    updateExam = (examDetail: ExamDetailFormModel) => {
        return this.put('Exam/UpdateExam', examDetail)
    }
}
export const examService = new ExamService()