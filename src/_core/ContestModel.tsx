import {ContestCommentModel} from './CommentModel'
import dayjs, { Dayjs } from 'dayjs';
import { QuestionContestModel } from './ExamModel';

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
    contestingInfo:ContestingInfoModel|null,
    lstAnswer:ContestResultModel[]
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
export interface ContestingInfoModel{
    name: string,
    organization:string,
    category: string[],
    description: string,
    duration: number,
    timeStart: string,
    lstQuestion: QuestionContestModel[]
}