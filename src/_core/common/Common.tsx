
export interface PaginationModel {
    index: number
    pages: number
    totals: number
}

export type OrderByModel = {
    [key: number]: string
}