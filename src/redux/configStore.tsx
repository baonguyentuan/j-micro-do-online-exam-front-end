import notificationSlice from "./reducers/notification/notificationSlice";
import contestCommentSlice from "./reducers/comment/contestCommentSlice";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import adminUserSlice from "./reducers/adminUser/adminUserSlice";
import loadingSlice from "./reducers/loading/loadingSlice";
import userSlice from "./reducers/user/userSlice";
import chatSlice from "./reducers/chat/chatSlice";
import contestSlice from "./reducers/contest";
import blogSlice from "./reducers/blog/blogSlice";
import { default as examSlice } from "./reducers/exam";
import { default as feedBackSlice } from "./reducers/feedback";
import categorySlice from "./reducers/category/categorySlice";
import drawerSlice from "./reducers/drawer/drawerSlice";
import menuSlice from "./reducers/menu/menuSlice";
import roleSlice from "./reducers/role/roleSlice";
import endpointSlice from "./reducers/endpoint/endpointSlice";
import globalSlice from "./reducers/global-slice";
import authSlice from "./reducers/auth";

export const store = configureStore({
  reducer: {
    loadingSlice,
    chatSlice,
    authSlice,
    notificationSlice,
    contestSlice,
    examSlice,
    userSlice,
    blogSlice,
    feedBackSlice,
    adminUserSlice,
    contestCommentSlice,
    categorySlice,
    drawerSlice,
    menuSlice,
    roleSlice,
    endpointSlice,
    globalSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;