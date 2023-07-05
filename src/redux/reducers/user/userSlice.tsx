import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserInfoModel, UserStateModel } from '../../../_core/UserModel';
import { DispatchType } from '../../configStore';
import { userService } from '../../../services/UserService';
import { STATUS_CODE } from '../../../utils/config';
import { setLoading } from '../loading/loadingSlice';



const initialState: UserStateModel = {
    userInfo: null
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        getUserInfo: (state: UserStateModel, action: PayloadAction<{ userInfo: UserInfoModel }>) => {
            state.userInfo = action.payload.userInfo
        }
    }
});

export const { getUserInfo } = userSlice.actions

export default userSlice.reducer
export const getUserInfoApi = () => {
    return async (dispatch: DispatchType) => {
        dispatch(setLoading({ isLoading: true }))
        try {
            const result = await userService.getUserInfo()
            if (result.status === STATUS_CODE.SUCCESS) { 
                console.log(result.data.data);
                 
                dispatch(getUserInfo({ userInfo: result.data.data }))
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
        dispatch(setLoading({ isLoading: false }))
    }
}