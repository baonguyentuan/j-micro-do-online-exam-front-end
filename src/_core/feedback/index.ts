
export interface FeedBackExamCommand{
  examID: number | null | string,
  vote: number,
  comment: string,
}

export interface FeedBackSearchParams{
  vote: number,
  name: string,
  page_size:number,
  page_index:number,
}

export interface RatingExamStatisticModel{
  ranking: string,
  totalRating:number,
  ratingData: RatingDataModel
}

export type RatingDataModel={
  stars:number[],
  values:number[]
}

export interface RatingExamPagination{
  index: number,
  pages: number,
  totals: number
}

export interface RatingExamModel{
  pagination: RatingExamPagination,
  
  data: RatingExamFeedBackModel[]
}

export interface RatingExamFeedBackModel{
  id: number,
  vote: number,
  comment: string,
  createdAt: string,
  username:string
  userID: number
}


export interface feedBackSliceInitState {
  examRating: RatingExamStatisticModel,
  
  examRatingList:RatingExamModel,
  
  loading: boolean
}