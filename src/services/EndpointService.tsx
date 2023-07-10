import { EndpointDetailModel } from "../_core/EndpointModel"
import { BaseService } from "./BaseService"

class EndpointService extends BaseService {
    constructor() {
        super()
    }
    getEndpoints = () => {
        return this.get('auth/endpoints')
    }
    getEndpointsOrderBy = (order_by: any) => {
        return this.getOrderBy('auth/endpoints', order_by)
    }
    getEndpointOption = () => {
        return this.get('auth/endpoints/options')
    }
    createEndpoint = (endpointPath: any) => {
        return this.postAdmin('auth/endpoints/create', endpointPath)
    }
    editEndpoint = (endpointDetail: EndpointDetailModel) => {
        return this.post('auth/endpoints/edit', endpointDetail)
    }
    deleteEndpoint = (id: number) => {
        return this.delete('auth/endpoints/delete', id)
    }
}
export const endpointService = new EndpointService()
