import { ChatMessageModel } from "./ChatModel";
import { NotifyModel } from "./NotificationModel";

export interface UserInfoModel {
    id: number;
    username: string;
    phone: string | null;
    email: string;
    createAt:string
    address: string | null;
    birthday: string | null;
    roles: string[];
}
export interface UserStateModel {
    userInfo: UserInfoModel | null
}
