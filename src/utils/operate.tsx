import { ContestCommentModel } from "../_core/CommentModel";

export const calculateAverageRate = (lstRate: ContestCommentModel[]) => {
    return Math.round(lstRate.reduce((acc, currentRate) => {
        return acc + currentRate.vote
    }, 0) / lstRate.length)
}
export const backToPosition=(position:number)=>{
    document.body.scrollTo({
        top: position,
        behavior: 'smooth'
    });
    document.documentElement.scrollTo({
        top: position,
        behavior: 'smooth'
    });
}