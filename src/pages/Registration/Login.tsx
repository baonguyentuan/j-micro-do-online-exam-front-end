import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFail } from "../../redux/reducers/userTest/userSlice";
import { LoginFormValues } from '../../_core/Login';
import { useTranslation } from 'react-i18next';
import '../../assets/css/login/login.css';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};
export default function Login() {
  const { t } = useTranslation('login')
  const validationSchema = Yup.object({
    email: Yup.string().email(t('login.invalid_email_address')).required(t('login.required')),
    password: Yup.string().min(6, t('login.minimum_character')).required(t('login.required')),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (values.email === 'admin@gmail.com' && values.password === 'adminadmin') {
        dispatch(loginSuccess({ username: values.email, password: values.password, role: 'admin', accountType: '' }));
        navigate('/admin_user');
      } else if (values.email && values.password) {
        dispatch(loginSuccess({ username: values.email, password: values.password, role: 'user', accountType: 'Free' }));
        navigate('/');
      }
      else {
        console.log('Đăng nhập thất bại');
        dispatch(loginFail());
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="container_form_login">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t('login.login')}</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md -space-y-px">
              <div>
                <p className="text-base text-slate-400 mb-1">
                  Email<span style={{ color: 'red' }}>*</span>
                </p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="border border-gray-200 p-2 rounded w-full"
                />
                {formik.errors.email && <p className="text-xs text-red-700">{formik.errors.email}</p>}
              </div>
              <div>
                <p className="text-base text-slate-400 mb-1 mt-6">
                  {t('login.password')}<span style={{ color: 'red' }}>*</span>
                </p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="border border-gray-200 p-2 rounded w-full"
                />
                {formik.errors.password && <p className="text-xs text-red-700">{formik.errors.password}</p>}
              </div>
            </div>

            <div className="container_button">
              <button
                type="submit"
                className="w-2/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('login.signin')}
              </button>
              <button className="w-2/3 bg-white-600 text-black px-4 py-2 mt-5 border rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-100 focus:ring-opacity-75">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" className="inline-block w-4 h-4 mr-2" />
                {t('login.sign_in_with_google')}
              </button>

              <a
                href="/register"
                className="w-2/3 flex justify-center py-2 px-4 border text-sm text-neutral-400 font-medium rounded-md mt-5 hover:bg-violet-100 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-100"
              >
                {t('login.i_have_an_account')}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
