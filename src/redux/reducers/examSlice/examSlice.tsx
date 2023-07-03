import {createSlice} from '@reduxjs/toolkit'
import {setLoading} from '../loading/loadingSlice';
import {openNotificationWithIcon} from '../../../utils/operate';
import {ExamCardInfoModel, ExamDetailFormModel} from '../../../_core/ExamModel';
import {DispatchType} from '../../configStore';
import {ExamSearchParams, examService} from '../../../services/ExamService';

type ExamCategory = {
    [id: string]: ExamCardInfoModel[]
}

interface examInitState {
    hotExamsByCategory: ExamCategory
    examsByCategory: ExamCardInfoModel[]
}

const initialState = {
    hotExamsByCategory: {}
} as examInitState

const examSlice = createSlice({
    name: 'examSlice',
    initialState,
    reducers: {
        hotExamsReceived(state, action) {
            state.hotExamsByCategory = action.payload
        },
        examsCategoryReceived(state,action){
            state.examsByCategory= action.payload
        }
    }
});

export const {hotExamsReceived,examsCategoryReceived} = examSlice.actions

export default examSlice.reducer
export const createExamApi = (examDetail: ExamDetailFormModel) => {
    return async (dispatch: DispatchType) => {
        await dispatch(setLoading({isLoading: true}))
        try {
            console.log(examDetail);

            // const result = await examService.creatExam(examDetail)
            //   if (result.status === STATUS_CODE.SUCCESS) {
            //     openNotificationWithIcon('success', 'Create exam successful', '', 1)
            //   } else {
            //     console.log(result);
            //     openNotificationWithIcon('error', 'Create exam failed', '', 1)
            //   }
        } catch (err) {
            console.log(err);
            openNotificationWithIcon('error', 'Create exam failed', '', 1)
        }
        await dispatch(setLoading({isLoading: false}))
    }
}

export const getExamsByCategoryApi = () => {
    return async (dispatch: DispatchType) => {
        await dispatch(setLoading({ isLoading: true }))
        try {
            const result = await examService.getExamByCategory();
            console.log(result.data.data)
            dispatch(hotExamsReceived(result.data.data));
        } catch (err) {
            openNotificationWithIcon('error', 'Get exams by category failed', '', 1)

        }
        await dispatch(setLoading({isLoading: false}))
    }
}

export const getExamsApi = (params: ExamSearchParams) =>{
    return async (dispatch: DispatchType) =>{
        await dispatch(setLoading({ isLoading: true }))
        try{
            const result = await examService.getExams(params);
            dispatch(examsCategoryReceived(result.data.data))
            console.log(result)
        }catch (err){
            console.log(err)
        }
        await dispatch(setLoading({isLoading: false}))
    }
}