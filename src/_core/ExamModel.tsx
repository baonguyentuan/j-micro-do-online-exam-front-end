export interface QuestionRowModel {
    id: number,
    question: string,
    type: string,
    answer: string[],
    point: number,
    correctAnswer: number[]
}
export interface ExamDetailFormModel {
    name: string,
    category: number | null,
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
    lstOptionExam:ExamOptionModel[]
}