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
    getEndpointsByName = (name: string) => {
        return this.getOrderBy('auth/endpoints', name)
    }
    getEndpointOption = () => {
        return this.get('auth/endpoints/options')
    }
    createEndpoint = (endpointPath: any) => {
        return this.postAdmin('auth/endpoints/create', endpointPath)
    }
    editEndpoint = (id: number, endPointPath: string) => {
        return this.putAdmin('auth/endpoints/edit', {id, endPointPath})
    }
    deleteEndpoint = (id: number) => {
        return this.delete('auth/endpoints/delete', id)
    }
}
export const endpointService = new EndpointService()
