import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { RegisterFormValues } from "../../../_core/Login";
import { useTranslation } from "react-i18next";
// import { registerUser } from "../../redux/user/userSlice"
import { AuthFormWrapper } from "../../../assets/styles/authStyles";
import { EscapeAuthButton } from "./Login";
import AppRoutes from "../../../constants/AppRoutes";

const initialValues: RegisterFormValues = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export default function Register() {
  const dispatch = useDispatch();
  const { t } = useTranslation("login");
  const validationSchema = Yup.object({
    userName: Yup.string().min(6, t("register.minimum_character")).required(t("register.required")),
    email: Yup.string().email(t("register.invalid_email_address")).required(t("register.required")),
    password: Yup.string().min(6, t("register.minimum_character")).required(t("register.required")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("register.passwords_must_match"))
      .required(t("register.required"))
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Registered:", values);
    }
  });

  return (
    <AuthFormWrapper
      className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <EscapeAuthButton />
      <div className="container">
        <div className="container_form_login">
          <div>
            <h2
              className="mt-6 text-center text-3xl font-semibold text-gray-900">{t("register.free_registration")}</h2>
          </div>
          <form className="mt-8 space-y-9" onSubmit={formik.handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="mb-3 rounded-md -space-y-px">
              <div className="relative">
                <p className="text-base text-slate-400 mb-1">
                  Email<span style={{ color: "red" }}>*</span>
                </p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="border border-gray-200 p-2 rounded w-full"
                />
                {formik.errors.email && <p className="error-helper text-xs text-red-700">{formik.errors.email}</p>}
              </div>
              <div className="relative">
                <p className="text-base text-slate-400 mb-1 mt-6">
                  {t("register.password")}<span style={{ color: "red" }}>*</span>
                </p>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="border border-gray-200 p-2 rounded w-full"
                />
                {formik.errors.password &&
                  <p className="error-helper text-xs text-red-700">{formik.errors.password}</p>}
              </div>
              <div className="relative">
                <p className="text-base text-slate-400 mb-1 mt-6">
                  {t("register.re_password")}<span style={{ color: "red" }}>*</span>
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
                  <p className="error-helper text-xs text-red-700">{formik.errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-2/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t("register.signup")}
              </button>
              <a
                href={AppRoutes.public.login}
                className="w-2/3 flex justify-center py-2 px-4 border text-sm text-neutral-400 font-medium rounded-md mt-5 hover:bg-violet-100 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-100"
              >
                {t("register.i_have_an_account")}
              </a>
            </div>
          </form>
        </div>
      </div>
    </AuthFormWrapper>
  );
};




