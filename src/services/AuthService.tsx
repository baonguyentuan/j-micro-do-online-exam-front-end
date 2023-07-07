import { ENDPOINT_URL } from "../utils/config"
import { BaseService } from "./BaseService"

class AuthService extends BaseService {
    constructor() {
        super()
    }
    getUserInfo=()=>{
        return this.get(ENDPOINT_URL.AUTH.GET_USER_INFO)
    }
}
export const authService = new AuthService()