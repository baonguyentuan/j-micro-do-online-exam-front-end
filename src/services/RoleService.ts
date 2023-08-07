import { BaseService } from "./BaseService"

class RoleService extends BaseService {
    constructor() {
        super()
    }
    getRoles = () => {
        return this.get('auth/roles')
    }
    getRolesOrderBy = (order_by: {}) => {
        return this.getOrderBy('auth/roles', order_by)
    }
    createRole = (name: string, endPoint: Array<number>) => {
        return this.postAdmin('auth/roles/create', {name, endPoint})
    }
    editRole = (name: string, endPoint:  Array<number>) => {
        return this.putAdmin('auth/roles/edit', {name, endPoint})
    }
}
export const rolesService = new RoleService()
