import { configureStore } from "@reduxjs/toolkit";
// import { type } from "os";
import userReducer from './user/userSlice';
export const store=configureStore({
    reducer:{
        // user:(state='test')=>{
        //     return state
        // },
        user: userReducer,
    }
})

export type RootState=ReturnType<typeof store.getState>