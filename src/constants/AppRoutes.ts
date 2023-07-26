const courseRootRoute = "/courses";
const adminRoute = "/admin/";

export default {
  "public": {
    "home": "/",
    "blog": "/blog",
    "login": "/login",
    "contest": "/contest/login",
    "contact": "/contact",
    "register": "register",
    "courses": courseRootRoute,
    "courses_detail": courseRootRoute + "/:category/:name",
    "courses_sort_category": courseRootRoute + "/:category"
  },
  "private": {
    "user": {
      "feedback": "/feedback",
      "home": "/user/dashboard",
      "doExam": "/takeExam/:name",
      "contest": "/contest",
      "doContest": "/takeContest/:name",
      "account":"/account"
    },
    "admin": {
      "admin": adminRoute,
      "home": adminRoute + "dashboard",
      "category": adminRoute + "category",
      "exam": adminRoute + "exam",
      "user": adminRoute + "user",
      "contest": adminRoute + "contest",
      "role": adminRoute + "role",
      "endpoint": adminRoute + "endpoint"
    }
  }
};