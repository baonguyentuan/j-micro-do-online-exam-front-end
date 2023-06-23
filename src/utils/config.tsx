import { createBrowserHistory } from "history"

export const DOMAIN = 'http://examinationapi.cyberlearn.vn/api/vi'
export const history = createBrowserHistory(window)
export const STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    SERVER_ERR: 500
}
export const USER_LOGIN = 'USER_LOGIN'
export const TOKEN = 'access_token';
export const MIN_QUESTION_EXAM = 10