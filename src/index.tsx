import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './i18n'
import Home from './pages/Home/Home';
import Login from './pages/Registration/Login';
import Register from './pages/Registration/Register';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import HomeLayout from './layouts/HomeLayout';
import CourseDetail from './pages/ContestDetail/ContestDetail';
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
        <Route path='exam/:id' element={<CourseDetail/>}></Route>
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
