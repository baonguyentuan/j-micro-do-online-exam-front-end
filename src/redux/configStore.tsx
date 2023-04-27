import { configureStore } from "@reduxjs/toolkit";
// import { type } from "os";
import userReducer from './user/userSlice';
import authReducer from './auth/authSlice';
export const store=configureStore({
    reducer:{
        // user:(state='test')=>{
        //     return state
        // },
        user: userReducer,
        auth: authReducer,
    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;