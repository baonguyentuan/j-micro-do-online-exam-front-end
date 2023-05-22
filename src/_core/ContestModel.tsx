import {ContestCommentModel} from './CommentModel'
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
    arrHotCourse: ContestInfoModel[],
    contestDetail: ContestInfoModel | null,
    arrRelateContest:ContestInfoModel[],
    arrHotContest:ContestInfoModel[],
}
export interface ContestCategoryModel{
    id:number,
    category:string
}