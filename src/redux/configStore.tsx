import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import chatSlice from "./reducers/chat/chatSlice";
import notificationSlice from "./reducers/notification/notificationSlice";
import contestSlice from "./reducers/contest/contestSlice";
import userSlice from "./reducers/user/userSlice";
import loadingSlice from "./reducers/loading/loadingSlice";
import contestCommentSlice from "./reducers/comment/contestCommentSlice";
import blogSlice from './reducers/blog/blogSlice';
import adminUserSlice from './reducers/adminUser/adminUserSlice';
import examSlice from "./reducers/examSlice/examSlice";
import categorySlice from "./reducers/category/categorySlice";
export const store = configureStore({
    reducer: {
        loadingSlice,
        chatSlice,
        notificationSlice,
        contestSlice,
        examSlice,
        userSlice,
        blogSlice,
        adminUserSlice,
        contestCommentSlice,
        categorySlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch