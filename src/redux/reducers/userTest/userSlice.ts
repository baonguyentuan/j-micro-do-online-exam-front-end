import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from '../../../_core/Login';

const initialState: UserState = {
  username: "compliance@example.com",
  password: "",
  rePassword: "",
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state: UserState, action: PayloadAction<{username: string, password: string, isLogin: boolean}>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.isLogin = true;
    },
    registerUser: (state: UserState, action: PayloadAction<{username: string, password: string, rePassword: string, isLogin: boolean}>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.rePassword = action.payload.rePassword;
      if (state.password === state.rePassword) {
          state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
  },
});

export const { loginUser, registerUser } = userSlice.actions;
export default userSlice.reducer;