import { EndpointDetailModel } from "../_core/EndpointModel"
import { BaseService } from "./BaseService"

class EnpointService extends BaseService {
    constructor() {
        super()
    }
    getEndpointOption=()=>{
        return this.get('auth/endpoints/options')
    }
    creatEndpoint = (endpointPath: string) => {
        return this.post('auth/endpoints/create', endpointPath)
    }
    editEndpoin = (endpointDetail: EndpointDetailModel) => {
        return this.post('auth/endpoints/edit', endpointDetail)
    }
    deleteEndpoin=(endpointID:number)=>{
        return this.delete('auth/endpoints/delete',endpointID)
    }

}
export const endpointService = new EnpointService()