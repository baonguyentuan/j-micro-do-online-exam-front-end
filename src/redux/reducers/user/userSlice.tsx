import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { UserStateModel } from "../../../_core/UserModel";
import { thunkAction } from "../../../utils/redux-helpers";
import clientService from "../../../utils/client";
import ApiEndpoint from "../../../constants/ApiEndpoint";
import { setLocalStorage } from "../../../utils/local-storage";
import Constants from "../../../constants/Constants";
import { openNotificationWithIcon } from "../../../utils/operate";


const initialState: UserStateModel = {
  userInfo: null,
  lstUsers: [],
  pagination: {
    index: 1,
    pages: 1,
    totals: 1
  }
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      setLocalStorage(Constants.localStorageKey.username, action.payload.data.username)
      setLocalStorage(Constants.localStorageKey.userID, action.payload.data.id)
      setLocalStorage(Constants.localStorageKey.account, action.payload.data.roles[0])
      state.userInfo = action.payload.data
      return state;
    });
    builder.addCase(getLstUserApi.fulfilled, (state, action) => {
      state.lstUsers = action.payload.data;
      state.pagination = action.payload.pagination
    });
    builder.addCase(updateUserInfoApi.fulfilled, (state, action) => {
      openNotificationWithIcon("success", "Update info successful", "", 1);
    });
    builder.addCase(updateUserThumbnailApi.fulfilled, (state, action) => {
      openNotificationWithIcon("success", "Update thumbnail successful", "", 1);
    });
    builder.addMatcher(
      isAnyOf(getUserInfo.pending,
        getLstUserApi.pending,
        updateUserInfoApi.pending,
        updateUserThumbnailApi.pending),
      (state, action) => {

      });
    builder.addMatcher(
      isAnyOf(
        getUserInfo.rejected,
        updateUserInfoApi.rejected,
        updateUserThumbnailApi.rejected),
      (state, action) => {
        console.log(action);

      });
  })
});

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  thunkAction(() => {
    return clientService.get(ApiEndpoint.auth.GET_USER_INFO);
  })
);
export const getLstUserApi = createAsyncThunk(
  "user/getLstUser",
  thunkAction(async (params: any) => {
    return clientService.get(ApiEndpoint.auth.GET_USER, { params })
  })
);
export const updateUserInfoApi = createAsyncThunk(
  "user/updateUserInfo",
  thunkAction(async (data: any) => {
    return clientService.post(ApiEndpoint.auth.UPDATE_USER_INFO, data)
  })
);
export const updateUserThumbnailApi = createAsyncThunk(
  "user/updateUserThumbnail",
  thunkAction(async (thumbnail: FormData) => {
    return clientService.post(ApiEndpoint.auth.UPDATE_USER_THUMBNAIL, thumbnail)
  })
);
export default userSlice.reducer;
