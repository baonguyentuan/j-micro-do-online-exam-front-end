export interface ChatMessageModel {
    isUser: boolean;
    message: string
}
export interface ChatState {
    chatboxShow: boolean,
    arrMessage: ChatMessageModel[],
    unReadMessage: number
}