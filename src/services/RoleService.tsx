import { BaseService } from "./BaseService"

class RoleService extends BaseService {
    constructor() {
        super()
    }
    getRoles = () => {
        return this.get('auth/roles')
    }
    createRole = (rolePath: string) => {
        return this.post('auth/roles/create', rolePath)
    }
    editRole = (id: number) => {
        return this.put('auth/roles/edit', id)
    }
}
export const rolesService = new RoleService()
