import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import './i18n'
import Home from './pages/Home/Home';
import Login from './pages/Registration/Login';
import Register from './pages/Registration/Register';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import HomeLayout from './layouts/HomeLayout';
import CourseDetail from './pages/ContestDetail/ContestDetail';
import { history } from './utils/config';
import CreateContest from './pages/CreateContest/CreateContest';
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
          <Route path='contest/:contestId' element={<CourseDetail />}></Route>
          <Route path='createcontest' element={<CreateContest />}></Route>
          <Route path='*' element={<Home />}></Route>
        </Route>
      </Routes>
    </HistoryRouter >
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
