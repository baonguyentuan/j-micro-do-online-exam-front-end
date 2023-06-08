import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from '../../../_core/Login';

const initialState: UserState = {
  username: "",
  password: "",
  rePassword: "",
  isLogin: false,
  role: "",
  accountType: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state: UserState, action: PayloadAction<{username: string, password: string, role: string, accountType: string}>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.isLogin = true;
      state.role = action.payload.role;
      state.accountType = action.payload.accountType;
      localStorage.setItem("user", JSON.stringify(state));
    },
    loginFail: (state: UserState) => {
      state.isLogin = false;
    },
    logoutUser: (state: UserState) => {
      state.username = "";
      state.password = "";
      state.rePassword = "";
      state.isLogin = false;
      state.role = "";
      localStorage.removeItem("user");
      state.isLogin = false;
    },
    registerUser: (state: UserState, action: PayloadAction<{username: string, password: string, rePassword: string, isLogin: boolean}>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.rePassword = action.payload.rePassword;
      if (state.password === state.rePassword) {
          state.isLogin = true;
          state.role = "user";
      } else {
        state.isLogin = false;
        state.role = "";
      }
    },
  },
});

export const { loginFail, loginSuccess, logoutUser, registerUser } = userSlice.actions;
export default userSlice.reducer;