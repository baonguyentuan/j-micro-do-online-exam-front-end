import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import './i18n'
import Home from './pages/Home/Home';
import Login from './pages/Registration/Login';
import Register from './pages/Registration/Register';
import TrainingCourses from './pages/TrainingCourses/TrainingCourses';
import BlogList from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';
import AdminUser from './Admin/AdminUser/AdminUser';
import Admin from './Admin/Admin';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import HomeLayout from './layouts/HomeLayout';
import CreateContest from './pages/CreateContest/CreateContest';
import CreateExam from './pages/CreateExam/CreateExam';
import Contesting from './pages/Contesting/Contesting';
import Account from './pages/Account/Account';
import TrainingCoursesByCategory from "./pages/TrainingCourses/TrainingCoursesByCategory";
import AppRoutes from "./constants/AppRoutes";
import Course from "./pages/TrainingCourses/Course";
import { createBrowserHistory } from "history";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const history = createBrowserHistory(window)

root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path={AppRoutes.public.login} element={<Login />} />
          <Route path={AppRoutes.public.register} element={<Register />} />
          <Route path='contesting/:contestId' element={<Contesting />} />
          <Route path='create_contest' element={<CreateContest />} />
          <Route path={AppRoutes.public.courses} element={<TrainingCourses />} />
          <Route path={AppRoutes.public.courses_sort_category} element={<TrainingCoursesByCategory />} />
          <Route path={AppRoutes.public.courses_detail} element={<Course />} />
          <Route path='create_exam' element={<CreateExam />} />
          <Route path='account' element={<Account />} />
          <Route path={AppRoutes.public.blog} element={<BlogList />} />
          <Route path={AppRoutes.public.contact} element={<Contact />} />
          <Route path='*' element={<Home />} />
        </Route>
        <Route path='/admin_user' element={<AdminUser />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </HistoryRouter>
  </Provider>
);

reportWebVitals();