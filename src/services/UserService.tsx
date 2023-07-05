import { ENDPOINT_URL } from "../utils/config"
import { BaseService } from "./BaseService"

class UserService extends BaseService {
    constructor() {
        super()
    }
    getUserInfo=()=>{
        return this.get(ENDPOINT_URL.AUTH.GET_USER_INFO)
    }
}
export const userService = new UserService()