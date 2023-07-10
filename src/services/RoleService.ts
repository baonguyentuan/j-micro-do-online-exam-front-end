import { BaseService } from "./BaseService"

class RoleService extends BaseService {
    constructor() {
        super()
    }
    getRoles = () => {
        return this.get('auth/roles')
    }
    createRole = (name: string, endPoint: string) => {
        return this.postAdmin('auth/roles/create', {name, endPoint})
    }
    editRole = (name: string, endPoint: string) => {
        return this.putAdmin('auth/roles/edit', {name, endPoint})
    }
}
export const rolesService = new RoleService()
