export interface NotifyModel {
    id: number,
    message: string,
    readStatus: boolean
}
export interface NotifyState {
    haveNewNotify: boolean,
    arrNotify: NotifyModel[]
}