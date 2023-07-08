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
import AdminUser from './pages/AdminUser/AdminUser';
import Admin from './pages/Admin/Admin';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import HomeLayout from './layouts/HomeLayout';
import ContestDetail from './pages/ContestDetail/ContestDetail';
import { history } from './utils/config';
import CreateContest from './pages/CreateContest/CreateContest';
import CreateExam from './pages/CreateExam/CreateExam';
import Contesting from './pages/Contesting/Contesting';
import Account from './pages/Account/Account';
import TrainingCoursesByCategory from "./pages/TrainingCourses/TrainingCoursesByCategory";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history} >
      <Routes>
        <Route path='' element={<HomeLayout />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='contest/:contestId' element={<ContestDetail />}></Route>
          <Route path='contesting/:contestId' element={<Contesting />}></Route>
          <Route path='create_contest' element={<CreateContest />}></Route>
          <Route path='training_course' element={<TrainingCourses />} />
          <Route path='training_course/:categoryId' element={<TrainingCoursesByCategory/>}/>
          <Route path='create_exam' element={<CreateExam />} />
          <Route path='blog' element={<BlogList />} />
          <Route path='contact' element={<Contact />} />
          <Route path='account' element={<Account/>}/>
          <Route path='*' element={<Home />}></Route>
        </Route>
        <Route path='/admin_user' element={<AdminUser />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </HistoryRouter >
  </Provider>
);

reportWebVitals();