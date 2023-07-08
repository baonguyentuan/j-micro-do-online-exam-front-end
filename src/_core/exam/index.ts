import {OrderByModel, PaginationModel} from "../common/Common";

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

export interface ExamCardInfoModel {
  id: number
  categoryID: number
  image: string,
  examType: string,
  examName: string,
  duration: number,
  categoryName: string,
  downloadNumber: number,
  description: string,
}

export interface ExamFetchModel {
  id: number,
  examName: string,
  duration: number,
  categoryName: string,
  questionsExam: QuestionExamModel[],
}

export interface QuestionExamModel {
  id: number,
  question: string,
  answers: string[],
  questionPoint: number,
  questionType: string,
}

export interface ExamSearchParams {
  name: string | null
  durations: string | null
  category_ids: string | null
  from_date: string | null
  to_date: string | null
  page_size: number
  page_index: number
  order_by: number
}

export type ExamCategory = {
  [id: string]: ExamCardInfoModel[]
}

export type ExamsByCategory = {
  data: ExamCardInfoModel[]
  pagination: PaginationModel
}

export interface examSliceInitState {
  hotExamsByCategory: ExamCategory

  examsByCategory: ExamsByCategory

  examDurationOptions: []

  examOrderByOptions: OrderByModel[]

  examGetDetail: ExamCardInfoModel
  
  examFetchDetail: ExamFetchModel
  
  randomExams: ExamCardInfoModel[]
}