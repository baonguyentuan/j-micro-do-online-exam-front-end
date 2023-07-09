import {BaseService} from "./BaseService"
import ApiEndpoint from "../constants/ApiEndpoint";

class AuthService extends BaseService {
  constructor() {
    super()
  }

  getUserInfo = () => {
    return this.get(ApiEndpoint.auth.GET_USER_INFO)
  }
}

export const authService = new AuthService()