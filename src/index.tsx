import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import Home from "./pages/public/home/Home";
import Login from "./pages/public/auth/Login";
import Register from "./pages/public/auth/Register";
import TrainingCourses from "./pages/public/course/TrainingCourses";
import BlogList from "./pages/public/blog/Blog";
import Contact from "./pages/public/contact/Contact";
import AdminUser from "./Admin/AdminUser/AdminUser";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import HomeLayout from "./layouts/HomeLayout";
import CreateExam from "./pages/CreateExam/CreateExam";
import Account from "./pages/user/account/Account";
import AppRoutes from "./constants/AppRoutes";
import AdminLayout from "./layouts/AdminLayout";
import { createBrowserHistory } from "history";
import DoExam from "./pages/private/exam/DoExam";
import Course from "./pages/public/course/Course";
import FeedBack from "./pages/private/feedback/FeedBack";
import AdminCategory from "./Admin/AdminCategory/AdminCategory";
import CreateContest from "./pages/CreateContest/CreateContest";
import TrainingCoursesByCategory from "./pages/public/course/TrainingCoursesByCategory";
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const history = createBrowserHistory(window);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path={AppRoutes.public.login} element={<Login />} />
          <Route path={AppRoutes.public.register} element={<Register />} />
          <Route path="create_contest" element={<CreateContest />} />
          <Route path={AppRoutes.public.courses} element={<TrainingCourses />} />
          <Route path={AppRoutes.public.courses_sort_category} element={<TrainingCoursesByCategory />} />
          <Route path={AppRoutes.public.courses_detail} element={<Course />} />
          <Route path="create_exam" element={<CreateExam />} />
          <Route path="account" element={<Account />} />
          <Route path={AppRoutes.public.blog} element={<BlogList />} />
          <Route path={AppRoutes.public.contact} element={<Contact />} />
          <Route path={AppRoutes.public.login} element={<Login />} />
          <Route path={AppRoutes.public.register} element={<Register />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path={AppRoutes.private.user.feedback} element={<FeedBack />} />
        <Route path={AppRoutes.private.user.doExam} element={<DoExam />} />
        <Route path={AppRoutes.private.user.doContest} element={<DoExam />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route path="admin_user" element={<AdminUser />} />
          <Route path="admin_category" element={<AdminCategory />} />
          <Route index element={<AdminUser />} />
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
