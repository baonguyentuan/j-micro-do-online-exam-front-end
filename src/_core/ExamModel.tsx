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
    category: string[],
    description: string,
    duration:number,
    question:QuestionRowModel[]
}