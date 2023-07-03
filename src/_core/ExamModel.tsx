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