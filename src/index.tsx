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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin_user' element={<AdminUser />} />
        <Route path='' element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path='training_course' element={<TrainingCourses />} />
          <Route path='blog' element={<BlogList />} />
          <Route path='contact' element={<Contact />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
