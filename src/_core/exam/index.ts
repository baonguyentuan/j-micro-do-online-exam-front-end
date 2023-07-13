import { OrderByModel, PaginationModel } from "../common/Common";

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
  examType: string,
  description: string,
  duration: number,
  question: QuestionRowModel[],
  file: File |string | null
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
  image: string,
  examType: string,
  examName: string,
  createAt: string,
  duration: number,
  totalRating: number
  categoryID: number
  description: string,
  categoryName: string,
  downloadNumber: number,
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
  name: string | null;
  durations: string | null;
  category_ids: string | null;
  from_date: string | null;
  to_date: string | null;
  page_size: number;
  page_index: number;
  order_by: number;
}

export type ExamCategory = {
  [id: string]: ExamCardInfoModel[]
}

export type ExamsByCategory = {
  data: ExamCardInfoModel[]
  pagination: PaginationModel
}

export interface ExamOptionModel {
  id: number,
  name: string
}

export interface QuestionExamSubmitModel {
  questionType: string,
  questionPoint: number,
  question: string,
  answers: string[],
  correctAnswers: number[]
}

export interface examSliceInitState {
  examType: string;
  examModifyDetail:ExamDetailFormModel
  lstOptionExam: ExamOptionModel[];

  hotExamsByCategory: ExamCategory;

  examsByCategory: ExamsByCategory;

  examDurationOptions: [];

  examOrderByOptions: OrderByModel[];

  examGetDetail: ExamCardInfoModel;

  examFetchDetail: ExamFetchModel;

  randomExams: ExamCardInfoModel[];
}