export interface EndpointDetailModel{
    id:number,
    endPointPath:string
}

export const defaultEndpointDetail: EndpointDetailModel = {
    id: -1,
    endPointPath: ''
  }