import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { setLoading } from '../loading/loadingSlice';
import { openNotificationWithIcon } from '../../../utils/operate';
import { ExamDetailFormModel, ExamOptionModel, ExamStateModel } from '../../../_core/ExamModel';
import { DispatchType } from '../../configStore';
import { examService } from '../../../services/ExamService';
import { STATUS_CODE } from '../../../utils/config';

const initialState: ExamStateModel = {
  // examModify:
  lstOptionExam: [],
  examType:'PRIVATE'
}

const examSlice = createSlice({
  name: 'examSlice',
  initialState,
  reducers: {
    getOptionExam: (state: ExamStateModel, action: PayloadAction<{ lstOptionExam: ExamOptionModel[] }>) => {
      state.lstOptionExam = action.payload.lstOptionExam
    },
    getExamType:(state: ExamStateModel, action: PayloadAction<{ examType: string}>)=>{
        state.examType=action.payload.examType
    }
  }
});

export const { getOptionExam,getExamType } = examSlice.actions

export default examSlice.reducer
export const createExamApi = (examDetail: FormData) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.creatExam(examDetail)
      if (result.status === STATUS_CODE.SUCCESS) {
        openNotificationWithIcon('success', 'Create exam successful', '', 1)
      } else {
        console.log(result);
        openNotificationWithIcon('error', 'Create exam failed', '', 1)
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Create exam failed', '', 1)
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}
export const getExamOptionApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await examService.getExamOption()
      if (result.status === STATUS_CODE.SUCCESS) {
        dispatch(getOptionExam({ lstOptionExam: result.data.data }))
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export const deleteExamApi = (examID: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await examService.deleteExam(examID)
      if (result.status === STATUS_CODE.SUCCESS) {
        dispatch(getExamOptionApi())
        openNotificationWithIcon('success', 'Delete exam successful', '', 1)
      } else {
        console.log(result);
        openNotificationWithIcon('error', 'Delete exam failed', '', 1)
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Delete exam failed', '', 1)
    }
  }
}