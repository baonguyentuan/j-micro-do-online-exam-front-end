import React from "react";
import * as Yup from "yup";
import { Button } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import AppRoutes from "../../../constants/AppRoutes";
import { LoginFormValues } from "../../../_core/Login";
import { CloseCircleOutlined } from "@ant-design/icons";
import { AuthFormWrapper } from "../../../assets/styles/authStyles";
import { DispatchType } from "../../../redux/configStore";
import { getUserInfo } from "../../../redux/reducers/user/userSlice";
import { forceLogout, postLogin } from "../../../redux/reducers/auth";

const initialValues: LoginFormValues = {
  email: "",
  password: ""
};

export default function Login() {
  const { t } = useTranslation("login");
  const dispatch: DispatchType = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email(t("login.invalid_email_address")).required(t("login.required")),
    password: Yup.string().min(6, t("login.minimum_character")).required(t("login.required"))
  });


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(postLogin(values));
      if (postLogin.rejected.match(result)) {
        //TODO handle login error
        return;
      }

      const fetchUser = await dispatch(getUserInfo());

      if (getUserInfo.rejected.match(fetchUser)) {
        //TODO handler fetch user error
        dispatch(forceLogout());
        return;
      }
    }
  });

  return (
    <AuthFormWrapper className="min-h-screen flex justify-center bg-sky-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <EscapeAuthButton />
      <div className="container">
        <div className="container_form_login">
          <div>
            <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">{t("login.login")}</h2>
          </div>
          <form className="mt-8 space-y-9" onSubmit={formik.handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md -space-y-px">
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
                  {t("login.password")}<span style={{ color: "red" }}>*</span>
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
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-2/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t("login.signin")}
              </button>
              <a
                href={AppRoutes.public.register}
                className="w-2/3 flex justify-center py-2 px-4 border text-sm text-neutral-400 font-medium rounded-md mt-5 hover:bg-violet-100 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-100"
              >
                {t("login.i_have_an_account")}
              </a>
            </div>
          </form>
        </div>
      </div>
    </AuthFormWrapper>
  );
};

export const EscapeAuthButton = () => {
  return (
    <Button className="absolute border-0 top-5 right-8">
      <Link to={AppRoutes.public.home}><CloseCircleOutlined className="text-3xl" /></Link>
    </Button>
  );
};