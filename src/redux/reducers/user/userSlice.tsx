import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { UserStateModel } from "../../../_core/UserModel";
import { thunkAction } from "../../../utils/redux-helpers";
import clientService from "../../../utils/client";
import ApiEndpoint from "../../../constants/ApiEndpoint";
import { setLocalStorage } from "../../../utils/local-storage";
import Constants from "../../../constants/Constants";


const initialState: UserStateModel = {
  userInfo: null
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      setLocalStorage(Constants.localStorageKey.username,action.payload.data.username)
      setLocalStorage(Constants.localStorageKey.userID,action.payload.data.id)
      setLocalStorage(Constants.localStorageKey.account,action.payload.data.roles[0])

      return state;
    });
    builder.addMatcher(
      isAnyOf(getUserInfo.pending),
      (state, action) => {

      });
    builder.addMatcher(
      isAnyOf(getUserInfo.rejected),
      (state, action) => {

      });
  })
});

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  thunkAction(() => {
    return clientService.get(ApiEndpoint.auth.GET_USER_INFO);
  })
);

export default userSlice.reducer;
