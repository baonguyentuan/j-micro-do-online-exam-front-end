import ApiEndpoint from "../constants/ApiEndpoint"
import { BaseService } from "./BaseService"

class RoleService extends BaseService {
    constructor() {
        super()
    }
    getRoles = (param:object) => {
        return this.getByCondition(ApiEndpoint.role.GET,param)
    }
    createRole = (name: string, endPoint: string) => {
        return this.postAdmin('auth/roles/create', {name, endPoint})
    }
    editRole = (name: string, endPoint: string) => {
        return this.putAdmin('auth/roles/edit', {name, endPoint})
    }
}
export const rolesService = new RoleService()
