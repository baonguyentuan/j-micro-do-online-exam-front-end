import { ChatMessageModel } from "./ChatModel";
import { NotifyModel } from "./NotificationModel";

export interface UserInfoModel{
    userId:number;
    userName:string;
    avatar:string;
    mail:string;
    userPremium:string;
    // message:ChatMessageModel[];
    // notification:NotifyModel[]
}
export interface UserState {
    userInfo: UserInfoModel | null
}
