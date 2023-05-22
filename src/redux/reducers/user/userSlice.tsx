import { createSlice } from '@reduxjs/toolkit'
import { UserState } from '../../../_core/UserModel';



const initialState: UserState = {
    userInfo: {
        userId: 1,
        userName: 'tsukuyomi',
        avatar: 'string',
        mail: 'nguyentuanbao.1994@gmail.com',
        userPremium: "premium"
    }
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {}
});

export const { } = userSlice.actions

export default userSlice.reducer