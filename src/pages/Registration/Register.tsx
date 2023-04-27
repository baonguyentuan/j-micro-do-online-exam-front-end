import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authSlice';
// import { registerUser } from "../../redux/user/userSlice"
import './styles.css'

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: RegisterFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(login());
      console.log('Registered:', values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="container_form_login">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Free Registration</h2>
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
                  Password<span style={{ color: 'red' }}>*</span>
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
              <div>
                <p className="text-base text-slate-400 mb-1 mt-6">
                  Re-peat Password<span style={{ color: 'red' }}>*</span>
                </p>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className="border border-gray-200 p-2 rounded w-full"
                />
                {formik.errors.confirmPassword && (
                  <p className="text-xs text-red-700">{formik.errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="container_button">
              <button
                type="submit"
                className="w-2/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
              <a
                href="/login"
                className="w-2/3 flex justify-center py-2 px-4 border text-sm text-neutral-400 font-medium rounded-md mt-5 hover:bg-violet-100 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-100"
              >
                I already have an account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
