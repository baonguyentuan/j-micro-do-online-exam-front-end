export interface ContestCommentModel{
    cmtID:number
    userId:number,
    comment:string,
    vote:number
}
export interface CommentState{
    lstComment:ContestCommentModel[]
}
export interface CommentFormValue{
    comment:string,
    vote:number
}