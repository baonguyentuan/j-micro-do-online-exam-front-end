import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './i18n'
import Home from './pages/Home/Home';
import Login from './pages/Registration/Login';
import Register from './pages/Registration/Register';
import TrainingCourses from './pages/TrainingCourses/TrainingCourses';
import BlogList from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';
import AdminUser from './pages/AdminUser/AdminUser';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import HomeLayout from './layouts/HomeLayout';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path='' element={<HomeLayout />}>
        <Route index element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='training_course' element={<TrainingCourses />}></Route>
        <Route path='blog' element={<BlogList />}></Route>
        <Route path='contact' element={<Contact />}></Route>
        <Route path='admin_user' element={<AdminUser />}></Route>
        <Route path='*' element={<Home />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
