export interface QuestionRowModel {
    id: number,
    question: string,
    questionType: string,
    answers: string[],
    questionPoint: number,
    correctAnswers: number[]
}
export interface ExamDetailFormModel {
    title: string,
    categoryId: number | null,
    examType:string,
    description: string,
    duration: number,
    question: QuestionRowModel[],
    file: File | null
}
export interface QuestionContestModel {
    id: number,
    question: string,
    type: string,
    answer: string[],
    point: number,
}
export interface QuestionExamSubmitModel {
    questionType: string,
    questionPoint: number,
    question: string,
    answers: string[],
    correctAnswers: number[]
}
export interface ExamOptionModel{
    id:number,
    name:string
}
export interface ExamStateModel{
    // examModify:ExamDetailFormModel[]
    lstOptionExam:ExamOptionModel[],
    examType:string
    hotExamsByCategory: ExamCategory
    examsByCategory: ExamCardInfoModel[]
}
export interface ExamCardInfoModel{
    id: number
    categoryID: number
    image: string,
    examName: string,
    duration: number,
    categoryName: string,
    downloadNumber: number,
    description: string,
}
export type ExamCategory = {
    [id: string]: ExamCardInfoModel[]
}