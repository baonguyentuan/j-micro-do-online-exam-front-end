import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import Home from "./pages/public/home/Home";
import Login from "./pages/public/auth/Login";
import Register from "./pages/public/auth/Register";
import BlogList from "./pages/public/blog/Blog";
import AdminUser from "./Admin/AdminUser/AdminUser";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import HomeLayout from "./layouts/HomeLayout";
import Account from "./pages/user/account/Account";
import Contact from "./pages/public/contact/Contact";
import AppRoutes from "./constants/AppRoutes";
import AdminLayout from "./layouts/AdminLayout";
import { createBrowserHistory } from "history";
import DoExam from "./pages/private/exam/DoExam";
import Course from "./pages/public/course/Course";
import Constants from "./constants/Constants";
import CreateExam from "./pages/Exam/CreateExam";
import FeedBack from "./pages/private/feedback/FeedBack";
import ProtectedRoute from "./components/ProtectedRoute";
import DoContest from "./pages/private/contest/DoContest";
import AdminCategory from "./Admin/AdminCategory/AdminCategory";
import CreateContest from "./pages/CreateContest/CreateContest";
import LoginExamAccount from "./pages/public/auth/LoginExamAccount";
import TrainingCourses from "./pages/public/course/TrainingCourses";
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
          {/* PUBLIC ROUTE */}
          <Route path={AppRoutes.public.blog} element={<BlogList />} />
          <Route path={AppRoutes.public.contact} element={<Contact />} />
          <Route path={AppRoutes.public.courses_detail} element={<Course />} />
          <Route path={AppRoutes.public.courses} element={<TrainingCourses />} />
          {/* PRIVATE ROUTE*/}
          <Route path={AppRoutes.private.user.account}
            element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="create_contest" element={<CreateContest />} />
          <Route path="create_exam" element={<CreateExam status={Constants.formStatus.CREATE} />} />
          <Route path={AppRoutes.public.courses_sort_category} element={<TrainingCoursesByCategory />} />
          <Route path="*" element={<Home />} />
        </Route>

        {/* TODO: FIX */}
        {/*<Route path={AppRoutes.private.admin.admin} element={<AdminLayout />}>*/}
        {/*  <Route path={AppRoutes.public.login} element={<AdminUser />} />*/}
        {/*  <Route path={AppRoutes.private.admin.category} element={<AdminCategory />} />*/}
        {/*</Route>*/}

        <Route path="admin" element={<AdminLayout />}>
          <Route path={AppRoutes.private.admin.user} element={<AdminUser />} />
          <Route path={AppRoutes.private.admin.category} element={<AdminCategory />} />
          <Route index element={<AdminUser />} />
          <Route path={AppRoutes.private.admin.exam} element={<AdminExam />} />
        </Route>

        {/* PRIVATE ROUTE */}
        <Route path={AppRoutes.private.user.feedback}
               element={<ProtectedRoute><FeedBack /></ProtectedRoute>} />
        <Route path={AppRoutes.private.user.doExam}
               element={<ProtectedRoute><DoExam /></ProtectedRoute>} />
        <Route path={AppRoutes.private.user.doContest}
               element={<ProtectedRoute><DoExam /></ProtectedRoute>} />
        <Route path={AppRoutes.private.user.contest}
               element={<ProtectedRoute><DoContest /></ProtectedRoute>} />

        {/* PUBLIC ROUTE */}
        <Route path={AppRoutes.public.login} element={<Login />} />
        <Route path={AppRoutes.public.register} element={<Register />} />
        <Route path={AppRoutes.public.contest} element={<LoginExamAccount />} />
      </Routes>
    </HistoryRouter>
  </Provider>
);
