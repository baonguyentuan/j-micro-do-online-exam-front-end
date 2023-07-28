import { ContestCommentModel } from "../CommentModel";
import { QuestionContestModel } from "../exam";

export interface ContestInfoModel {
  id: number,
  name: string
  imgSrc: string,
  categories: string[],
  duration: number,
  rating: ContestCommentModel[],
  description: string,
  premium: string,
  quantityDownload: number,
  createBy: string
}

export interface ContestState {
  contestDetail: ContestInfoModel | null,
  arrRelateContest: ContestInfoModel[],
  arrHotContest: ContestInfoModel[],
  contestingInfo: ContestingInfoModel | null,
  lstAnswer: ContestResultModel[]
}

export interface ContestCategoryModel {
  id: number,
  category: string
}

export interface CreateContestFormModel {
  name: string,
  description: string,
  endAt: string,
  startAt: string
  file: File | null,
  examID: number
}

export interface ContestResultModel {
  questionIndex: number,
  answerSelected: number[]
}

export interface ContestingInfoModel {
  name: string,
  organization: string,
  category: string[],
  description: string,
  duration: number,
  timeStart: string,
  lstQuestion: QuestionContestModel[]
}

export interface InitialContestState {
  loading: boolean,

  contests: {},

  contestInfo: ContestInfoModel,

  contestInfoDetail: {},
}

export interface ContestInfoModel{
  examID: number,
  
  endAt: string,
  
  startAt: string,
  
  examName:string,
  
  contestName: string,
}