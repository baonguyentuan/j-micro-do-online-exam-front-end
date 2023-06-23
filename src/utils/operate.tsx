import { notification } from "antd";
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
type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const openNotificationWithIcon = (type:NotificationType,title:string,content:string,duration:number) => {
    notification[type]({
      message: title,
      description:content ,
      duration,
    });
  };