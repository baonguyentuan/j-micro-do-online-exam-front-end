import { createSlice } from '@reduxjs/toolkit'
import { setLoading } from '../loading/loadingSlice';
import { openNotificationWithIcon } from '../../../utils/operate';
import { ExamDetailFormModel } from '../../../_core/ExamModel';
import { DispatchType } from '../../configStore';
import { examService } from '../../../services/ExamService';

const initialState = {

}

const examSlice = createSlice({
  name: 'examSlice',
  initialState,
  reducers: {}
});

export const { } = examSlice.actions

export default examSlice.reducer
export const createExamApi = (examDetail: ExamDetailFormModel) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
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
    await dispatch(setLoading({ isLoading: false }))
  }
}