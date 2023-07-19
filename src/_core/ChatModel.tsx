export interface ChatMessageModel {
  isUser: boolean;
  message: string;
}

export interface ChatState {
  chatBoxShow: boolean,
  arrMessage: ChatMessageModel[],
  unReadMessage: number
}