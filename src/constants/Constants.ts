export default {
  EmptyString: '',
  httpStatusCode: {
    SUCCESS: 200,
    NOT_FOUND: 404,
    SERVER_ERR: 500,
    INPUT_FAIL: 400,
    NOT_ASSIGN: 403,
    ROUTER_PRIVATE: 401
  },
  localStorageKey: {
    accessToken: 'access-token',
    userExamToken:'user-exam-token',
    username:'user',
    userID:'id',
    account: 'account',
    status:'status'
  },
  formStatus: {
    EDIT: 'edit',
    CREATE: 'create',
    VIEW: 'view'
  },
  defaultThumbnail: "http://placehold.it/150",
  optionMenuAdmin: {
    USER: 'user-management',
    CATEGORY: "category-management",
    AUTH: {
      ROLE: "role-management",
      ENDPOINT: "endpoint-management",
    },
    EXAM: "exam-management",
    CONTEST: "contest-management",
    LOGOUT: "logout",
    ARTICLES: "articles"
  },
  typeDrawer: {
    CREAT_CATEGORY: 'createCategory',
    EDIT_CATEGORY: 'updateCategory',
    CREAT_EXAM: 'createExam',
    EDIT_EXAM: 'updateExam',
    VIEW_EXAM: 'viewExam',
    CREAT_CONTEST: 'createContest',
    VIEW_CONTEST: 'viewContest',
    CREATE_ENDPOINT: 'createEndpoint',
    CREATE_ROLE: 'createRole',
    CREATE_ARTICLE: 'createArticle',
    EDIT_ENDPOINT: 'updateEndpoint',
    EDIT_ROLE: 'updateRole',
    EDIT_ARTICLE: 'updateArticle',
  },
  sizeDrawer: {
    SMALL: '30%',
    NORMAL: '50%',
    LARGE: '70%'
  }
}