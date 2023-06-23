import {ContestCommentModel} from './CommentModel'
import dayjs, { Dayjs } from 'dayjs';

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
    arrRelateContest:ContestInfoModel[],
    arrHotContest:ContestInfoModel[],
}
export interface ContestCategoryModel{
    id:number,
    category:string
}
export interface CreateContestFormModel {
    name: string,
    description: string,
    duration: number,
    timeStart: string
    contestantList: File | null,
    exam: string | null
}
export interface ContestResultModel {
    questionIndex: number,
    answerSelected: number[]
}