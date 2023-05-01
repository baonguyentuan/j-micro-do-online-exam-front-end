export interface CourseInfoModel{
    id: number,
    name: string
    imgSrc: string,
    categories: string[],
    duration: number,
    rating: number,
    description: string,
    premium: string,
    quantityDownload:number,
    createBy:string
}
export interface CourseState {
    arrHotCourse: CourseInfoModel[]
}