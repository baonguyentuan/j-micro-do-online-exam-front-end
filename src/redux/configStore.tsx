import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import chatSlice from "./reducers/chat/chatSlice";
import notificationSlice from "./reducers/notification/notificationReducer";
import courseSlice from "./reducers/course/courseSlice";
import userSlice from "./reducers/user/userReducer";
import loadingSlice from "./reducers/loading/loadingSlice";
import userReducer from './reducers/userTest/userSlice';
import authReducer from './auth/authSlice';
import blogReducer from './reducers/blog/blogSlice';
export const store=configureStore({
    reducer:{
        loadingSlice,
        chatSlice,
        notificationSlice,
        courseSlice,
        userSlice,
        user: userReducer,
        auth: authReducer,
        blog: blogReducer,
    }
})

export type RootState=ReturnType<typeof store.getState>
export type DispatchType=typeof store.dispatch