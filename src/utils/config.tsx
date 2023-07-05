import { createBrowserHistory } from "history"
export const DOMAIN = 'http://localhost:8763/api/v1'
export const ENDPOINT_URL = {
    EXAM: {
        GET_EXAM: 'exams/get',
        GET_EXAM_OPTION: 'exams/options',
        FETCH_EXAM_To_CONTESTING: 'exams/fetch',
        GET_EXAM_INFO: 'exams/name',
        CREATE_EXAM: 'exams/create',
        EDIT_EXAM: "exams/edit",
        DOWNLOAD_EXAM: "exams/downloadExam",
        GET_EXAMDuration: "exams/durations",
        DELETE_EXAM: 'exams/delete',
        UPDATE_EXAM_THUMBNAIL: 'exams/update-thumbnail',
        SUBMIT_EXAM: 'exams/submit'
    },
    CATEGORY: {
        GET_CATEGORY: 'exams/categories/get',
        GET_CATEGORY_OPTION: 'exams/categories/options',
        GET_CATEGORY_DETAIL: 'exams/categories/detail',
        CREATE_CATEGORY: 'exams/categories/create',
        UPDATE_CATEGORY_THUMBNAIL: 'exams/categories/update/thumbnail',
        UPDATE_CATEGORY_INFO: 'exams/categories/update/info',
        DELETE_CATEGORY: 'exams/categories/delete'
    },
    AUTH: {
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        LOGOUT: "auth/logout",
        GET_USER: "auth/users",
        GET_ENDPOINT_BY_ROLE: "auth/getEndPointsByRoles",
        GET_USER_INFO: "auth/user/info",
        UPDATE_USER_INFO: "auth/update/info",
        UPDATE_USER_THUMNAIL: "auth/update/thumbnail",
        REFRESH_TOKEN: "auth/refreshToken",
        CEHCK_USER_ACTION: "auth/check/user-actions",
    },
    ACCOUNT_EXAM: {
        LOGIN: "auth/accounts-exam/login",
        REGISTER: "auth/accounts-exam/registerAccountExam"
    },
    ROLE: {
        GET_ROLE: "auth/roles",
        GET_ENDPOINT_BY_ROLE: "auth/roles/getEndPointsByRole",
        GET_ROLE_DETAIL: "auth/roles/detail",
        CREATE_ROLE: "auth/roles/create",
        EDIT_ROLE: "auth/roles/edit",
    },
    ENDPOINT: {
        GET_ENDPOINT: "auth/endpoints",
        GET_ENDPOINT_OPTION: "auth/endpoints/options",
        CREATE_ENDPOINT: "auth/endpoints/create",
        EDIT_ENDPOINT: "auth/endpoints/edit",
        DELETE_ENDPOINT: "auth/endpoints/delete",
    },
    ARTICLE: {
        GET_ARTICLE: "articles",
        CREATE_ARTICLE: "articles/create",
        UPDATE_ARTICLE: "articles/update",
        UPDATE_ARTICLE_IMG: "articles/update-img",
        GET_ARTICLE_BY_NAME: "articles/name",
        GET_ARTICLE_BY_ID: "articles/id",
        DELETE_ARTICLE: "articles/delete",
    },
    FILE: {
        GET_FILE_BY_DOMAIN_NAME: "files/images/",
        UPDATE_IMG: "files/image/updateImage",
        UPLOAD_FILE: "files",
    },
    CONTEST: {
        GET_CONTEST_OWNER: "exams/contests/owner",
        CREATE_CONTEST: "exams/contests/create",
        GET_CONTEST_DETAIL_BY_ID: "exams/contests/get",
        GET_CONTEST_: "exams/contests/user",
        DELETE_CONTEST: "exams/contests/",
    }, TOPIC: {
        GET_TOPIC_LIST: "notify/topics",
        CREATE_TOPIC: "notify/topics",
        SUBCRIBE_TOPIC: "notify/topic/subscribe",
        UNSUBCRIBE_TOPIC: "notify/topic/unsubscribe",
        DELETE_TOPIC: "notify/topics/delete",
    },
    NOTIFICATION: {
        GET_NOTIFICATION_BY_USER: "notify/user"
    }
}
export const history = createBrowserHistory(window)
export const STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    SERVER_ERR: 500,
    INPUT_FAIL: 400,
    NOT_ASSIGN: 403,
    ROUTER_PRIVATE: 401

}
export const USER_LOGIN = 'USER_LOGIN'
export const TOKEN = 'access_token';
export const MIN_QUESTION_EXAM = 10
export const MAX_QUESTION_EXAM = 30
export const DEFAULT__PAGE__SIZE = 10
export const MIN_DURATION_EXAM = 10
export const MAX_DURATION_EXAM = 60
export const MIN_PERIOD_CONTEST = 2

