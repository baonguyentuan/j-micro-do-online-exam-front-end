const courseRootRoute = '/courses'

export default {
  "public": {
    "home": '/',
    "blog": '/blog',
    "login": 'login',
    "contact": '/contact',
    "register": 'register',
    "courses": courseRootRoute,
    "courses_detail": courseRootRoute + "/:category/:name",
    "courses_sort_category": courseRootRoute + "/:category"
  },
  "private": {
    "user": {
      "feedback":'/feedback',
      "home": '/user/dashboard',
      "doExam":'/takeExam/:name',
      "doContest":'/takeContest/:name',
    },
    "admin": {
      "home": 'admin/dashboard'
    }
  }
}