import { ContestCommentModel } from "../CommentModel";
import { PaginationModel } from "../common/Common";
import { QuestionContestModel } from "../exam";

// export interface ContestInfoModel {
//   id: number,
//   name: string
//   imgSrc: string,
//   categories: string[],
//   duration: number,
//   rating: ContestCommentModel[],
//   description: string,
//   premium: string,
//   quantityDownload: number,
//   createBy: string
// }

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

  contestInfoDetail: ContestInfoDetailModel,

  lstContest: ContestInfoModel[],

  pagination: PaginationModel
}

export interface ContestInfoModel {
  id: number

  examID: number,

  endAt: string,

  startAt: string,

  examName: string,

  contestName: string,
}

export interface ContestInfoDetailModel {
  name: string,

  examName: string,

  endAt: string,

  startAt: string,

  ownerName: string,

  description: string,

  participants: { username: string, email: string }[]
}