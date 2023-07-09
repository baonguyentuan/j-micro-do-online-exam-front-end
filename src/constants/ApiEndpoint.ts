export default {
  domain:process.env.REACT_APP_SERVER_URL || "http://localhost:8763/api/v1",
  auth: {
    "LOGIN": 'auth/login',
    "LOGOUT": 'auth/logou',
    "GET_USER": 'auth/users',
    "REGISTER": 'auth/register',
    "GET_USER_INFO": 'auth/user/info',
    "REFRESH_TOKEN": 'auth/refreshToken',
    "UPDATE_USER_INFO": 'auth/update/info',
    "UPDATE_USER_THUMBNAIL": 'auth/update/thumbnail',
  },
  auth_exam:{
    LOGIN:'auth/accounts-exam/login'
  },
  role:{
    "GET": 'auth/roles',
    "EDIT":'auth/roles/edit',
    "CREATE":'auth/roles/create',
    "GET_ROLE_DETAIL":'auth/roles/detail',
  },
  article:{
    "GET":'articles',
    "CREATE":'articles/create',
    "DELETE":'articles/delete',
    "GET_ARTICLE_BY_ID":'articles/id',
    "GET_ARTICLE_BY_NAME":'articles/name',
    "UPDATE_ARTICLE_INFO":'articles/update',
    "UPDATE_ARTICLE_THUMBNAIL":'articles/update-img',
  },
  exam: {
    "GET": 'exams/get',
    "EDIT": 'exams/edit',
    "CREATE": 'exams/create',
    "DELETE": 'exams/delete',
    "GET_DETAIL": 'exams/name',
    "GET_RANDOM": 'exams/random',
    "FETCH_DETAIL": 'exams/fetch',
    "GET_DURATIONS": 'exams/durations',
    "GET_EXAM_OPTIONS": 'exams/options',
    "GET_ORDER_BY": 'exams/orderByOptions',
    "GET_HOT_EXAMS_CATEGORY": 'exams/hot/category'
  },
  contest:{
    "DELETE":'exams/contests/',
    "GET":'exams/contests/owner',
    "CREATE":'exams/contests/create',
    "GET_CONTEST_BY_ID":'exams/contests/get',
    "GET_CONTEST_FOR_USER":'exams/contests/user',
  },
  category: {
    "GET": 'exams/categories/get',
    "CREATE": 'exams/categories/create',
    "DELETE": 'exams/categories/delete',
    "GET_DETAIL": 'exams/categories/detail',
    "GET_CATEGORY_OPTION": 'exams/categories/options',
    "UPDATE_CATEGORY_INFO": 'exams/categories/update/info',
    "UPDATE_CATEGORY_THUMBNAIL": 'exams/categories/update/thumbnail',
  },
  endpoint:{
    "GET":'auth/endpoints',
    "EDIT":'auth/endpoints/edit',
    "CREATE":'auth/endpoints/create',
    "DELETE":'auth/endpoints/delete',
    "GET_ENDPOINT_OPTIONS":'auth/endpoints/options',
  },
  topic:{
    "GET":'notify/topics',
    "CREATE":'notify/topics',
    "DELETE":'notify/topics/delete',
    "SUBSCRIBE_TOPIC":'notify/topic/subscribe',
    "UNSUBSCRIBE_TOPIC":'notify/topic/unsubscribe',
  },
  notification:{
    "GET_NOTIFY_BY_USER":'notify/user'
  },
  feedback:{
    "EDIT":'exams/feedback/edit',
    "DELETE":'exams/feedback/delete',
    "GET_EXAM_RATING":'exams/feedback/calculate',
    "CREATE_EXAM_FEEDBACK":'exams/feedback/create',
    "GET_FEEDBACK_BY_EXAM_NAME":'exams/feedback/exam',
    "GET_STATUS_USER_FEEDBACK":'exams/feedback/check',
  }
}