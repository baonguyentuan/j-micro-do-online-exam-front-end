import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setLoading } from '../loading/loadingSlice';
import { openNotificationWithIcon } from '../../../utils/operate';
import { ExamDetailFormModel, ExamOptionModel, ExamSearchParams, examSliceInitState } from '../../../_core/exam';
import { DispatchType } from '../../configStore';
import { examService } from '../../../services/ExamService';
import Constants from "../../../constants/Constants";
const initialState = {
  hotExamsByCategory: {},
  lstOptionExam: [{}],
  examModifyDetail: {}
} as examSliceInitState

const examSlice = createSlice({
  name: 'examSlice',
  initialState,
  reducers: {
    getOptionExam: (state: examSliceInitState, action: PayloadAction<{ lstOptionExam: ExamOptionModel[] }>) => {
      state.lstOptionExam = action.payload.lstOptionExam
    },
    getExamModifyDetail: (state: examSliceInitState, action: PayloadAction<{ examDetail: ExamDetailFormModel }>) => {
      state.examModifyDetail = action.payload.examDetail
    },
    hotExamsReceived(state, action) {
      state.hotExamsByCategory = action.payload
    },
    examsCategoryReceived(state, action) {
      state.examsByCategory = action.payload
    },
    examDurationOptionsReceived(state, action) {
      state.examDurationOptions = action.payload
    },
    examOrderByOptionsReceived(state, action) {
      state.examOrderByOptions = action.payload
    },
    examGetDetailReceived(state, action) {
      state.examGetDetail = action.payload;
    },
    examFetchDetailReceived(state, action) {
      state.examFetchDetail = action.payload
    },
    examsRandomReceived(state, action) {
      state.randomExams = action.payload
    }
  }
});

export const {
  getOptionExam,
  getExamModifyDetail,
  hotExamsReceived,
  examsRandomReceived,
  examsCategoryReceived,
  examGetDetailReceived,
  examFetchDetailReceived,
  examOrderByOptionsReceived,
  examDurationOptionsReceived,
} = examSlice.actions

export default examSlice.reducer

export const createExamApi = (examDetail: FormData) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.creatExam(examDetail)
      if (result.status === Constants.httpStatusCode.SUCCESS) {
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

export const getExamsByCategoryApi = () => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.getExamByCategory();
      dispatch(hotExamsReceived(result.data.data));
    } catch (err) {
      openNotificationWithIcon('error', 'Get exams by category failed', '', 1)
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}

export const getExamsApi = (params: ExamSearchParams) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.getExams(params);
      dispatch(examsCategoryReceived(result.data))
    } catch (err) {
      console.log(err)
      openNotificationWithIcon('error', 'Get exams failed', '', 1)
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}

export const getExamDurationOptions = () => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.getExamDurationOptions();
      dispatch(examDurationOptionsReceived(result.data.data));
    } catch (err) {
      console.log(err)
      openNotificationWithIcon('error', 'Get exam duration options failed', '', 1)
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}

export const getExamOrderByOptions = () => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.getExamOrderByOptions();
      dispatch(examOrderByOptionsReceived(result.data.data))
    } catch (err) {
      console.log(err)
      openNotificationWithIcon('error', 'Get exam order by options failed', '', 1)
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}

export const getExamDetail = (name: object) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.getExamDetail(name);
      dispatch(examGetDetailReceived(result.data.data))
    } catch (err) {
      openNotificationWithIcon('error', 'Get exam detail failed', '', 1)
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}

export const fetchExamDetail = (name: string) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.fetchExamDetail(name);
      dispatch(examFetchDetailReceived(result.data))
      console.log(result);
    } catch (err) {
      openNotificationWithIcon('error', 'Fetch exam detail failed', '', 1)
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}

export const getExamsRandom = (name: object) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.getRandomExams(name);
      dispatch(examsRandomReceived(result.data.data))
    } catch (err) {
      openNotificationWithIcon('error', 'Get random exams failed', '', 1)
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}

export const getExamOptionApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await examService.getExamOption()
      if (result.status === Constants.httpStatusCode.SUCCESS) {
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
      if (result.status === Constants.httpStatusCode.SUCCESS) {
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

export const getExamModifyDetailApi = (examID: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await examService.getExamModifyDetail({id:examID})
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        console.log(result.data.data);
        
        dispatch(getExamModifyDetail(result.data.data))
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }
}