
export interface FeedBackExamCommand{
  examID: number,
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

export interface RatingExamModel{
  id: number,
  vote: number,
  comment: string,
  createdAt: string,
  username:string
}


export interface feedBackSliceInitState {
  examRating: RatingExamStatisticModel,
  
  examRatingList:RatingExamModel[]
}