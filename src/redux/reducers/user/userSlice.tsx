import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserInfoModel, UserStateModel } from '../../../_core/UserModel';
import { DispatchType } from '../../configStore';
import { authService } from '../../../services/AuthService';
import { STATUS_CODE } from '../../../utils/config';
import { setLoading } from '../loading/loadingSlice';
import { getExamType } from '../exam/examSlice';



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
            const result = await authService.getUserInfo()
            if (result.status === STATUS_CODE.SUCCESS) {
                let useInfoGet:UserInfoModel=result.data.data
                await dispatch(getUserInfo({ userInfo:useInfoGet }))
                let examType = useInfoGet.roles.find(roleItem => roleItem === "ADMIN") ? 'FREE' : 'PRIVATE'
                await dispatch(getExamType({examType}))
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
        dispatch(setLoading({ isLoading: false }))
    }
}