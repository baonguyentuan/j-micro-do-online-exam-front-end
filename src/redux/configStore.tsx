import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./reducers/chat/chatSlice";
import notificationSlice from "./reducers/notification/notificationSlice";
import contestSlice from "./reducers/contest/contestSlice";
import userSlice from "./reducers/user/userSlice";
import loadingSlice from "./reducers/loading/loadingSlice";
import contestCommentSlice from "./reducers/comment/contestCommentSlice";
import blogSlice from "./reducers/blog/blogSlice";
import adminUserSlice from "./reducers/adminUser/adminUserSlice";
import { default as examSlice } from "./reducers/exam";
import { default as feedBackSlice } from "./reducers/feedback";
import categorySlice from "./reducers/category/categorySlice";
import drawerSlice from "./reducers/drawer/drawerSlice";
import menuSlice from "./reducers/menu/menuSlice";
import roleSlice from "./reducers/role/roleSlice";
import endpointSlice from "./reducers/endpoint/endpointSlice";

export const store = configureStore({
  reducer: {
    loadingSlice,
    chatSlice,
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
  }
});

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch