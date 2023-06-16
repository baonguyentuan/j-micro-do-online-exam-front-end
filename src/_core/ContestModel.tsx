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
    arrHotCourse: ContestInfoModel[],
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
    timeStart: Dayjs | null
    contestantList: File | null,
    exam: string | null
    category: string[]
}