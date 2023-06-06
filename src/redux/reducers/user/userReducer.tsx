import { createSlice } from '@reduxjs/toolkit'
import { UserState } from '../../../_core/UserModel';

const initialState: UserState = {
    userInfo: {
        userId:1,
        userName:'tsukuyomi',
        avatar:'string',
        mail:'nguyentuanbao.1994@gmail.com',
        userPremium:"free"
    }
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {}
});

export const { } = userReducer.actions

export default userReducer.reducer