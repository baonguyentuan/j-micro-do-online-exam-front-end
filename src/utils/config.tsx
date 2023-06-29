import { createBrowserHistory } from "history"
export const DOMAIN = 'http://localhost:8763/api/v1/'
export const history = createBrowserHistory(window)
export const STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    SERVER_ERR: 500,
    INPUT_FAIL:400,
    NOT_ASSIGN:403,
    ROUTER_PRIVATE:401

}
export const USER_LOGIN = 'USER_LOGIN'
export const TOKEN = 'access_token';
export const MIN_QUESTION_EXAM = 10
export const MAX_QUESTION_EXAM = 30
export const DEFAULT__PAGE__SIZE = 10
export const MIN_DURATION_EXAM = 10
export const MAX_DURATION_EXAM = 60
export const MIN_PERIOD_CONTEST = 2

