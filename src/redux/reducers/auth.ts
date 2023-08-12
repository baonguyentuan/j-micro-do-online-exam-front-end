import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { thunkAction } from "../../utils/redux-helpers";
import clientService from "../../utils/client";
import ApiEndpoint from "../../constants/ApiEndpoint";
import { getLocalStorage, setLocalStorage } from "../../utils/local-storage";
import Constants from "../../constants/Constants";
import { history } from "../..";
import AppRoutes from "../../constants/AppRoutes";
import { getUserInfo } from "./user/userSlice";


const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loading: false
  },
  reducers: {
    forceLogout() {
      localStorage.removeItem(Constants.localStorageKey.accessToken);
    }
  },
  extraReducers: (builder => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.loading = false;

      return state;
    });
    builder.addCase(postLogout.fulfilled, (state, action) => {
      localStorage.clear()
      history.push(AppRoutes.public.login)
      state.loading = false;

      return state;
    });
    builder.addCase(postRegisterUser.fulfilled, (state, action) => {
      state.loading = false;
      history.push(AppRoutes.public.login)
      return state;
    });
    builder.addCase(postLoginWithExamAccount.fulfilled, (state, action) => {
      state.loading = false;

      return state;
    })
    builder.addMatcher(
      isAnyOf(
        postRegisterUser.pending,
        postLogin.pending,
        postLogout.pending,
        postLoginWithExamAccount.pending), (state, action) => {
          state.loading = true;

          return state;
        });
    builder.addMatcher(
      isAnyOf(
        postLogin.rejected,
        postLogout.rejected,
        postRegisterUser.rejected,
        postLoginWithExamAccount.rejected), (state, action) => {
          state.loading = false;
          console.log(action);

          return state;
        });
  })
});

export const postLogin = createAsyncThunk(
  "auth/Login",
  thunkAction(async (payload: any, { dispatch }) => {
    let resultLogin = await clientService.post(ApiEndpoint.auth.LOGIN, payload);
    setLocalStorage(Constants.localStorageKey.accessToken, resultLogin.data[Constants.localStorageKey.accessToken]);
    await dispatch(getUserInfo())
    if (getLocalStorage(Constants.localStorageKey.account) === "ADMIN" && getLocalStorage(Constants.localStorageKey.accessToken) !== null) {
      history.push(AppRoutes.private.admin.admin)
    } else {
      history.push(AppRoutes.public.home)
    }
    return resultLogin
  })
);

export const postLoginWithExamAccount = createAsyncThunk(
  'auth/LoginWithExamAccount',
  thunkAction(async (payload: any) => {
    return clientService.post(ApiEndpoint.auth.LOGIN_WITH_EXAM_ACCOUNT, payload)
  })
)

export const postLogout = createAsyncThunk(
  "auth/Logout",
  thunkAction((params: any) => {
    return clientService.post(ApiEndpoint.auth.LOGOUT, {}, { params });
  })
);

export const postRegisterUser = createAsyncThunk(
  "auth/RegisterUser",
  thunkAction((payload: any) => {
    return clientService.post(ApiEndpoint.auth.REGISTER, payload);
  })
);

export const { forceLogout } = authSlice.actions;

export default authSlice.reducer;
