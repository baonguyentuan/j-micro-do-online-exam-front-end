import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setLoading } from '../loading/loadingSlice';
import { openNotificationWithIcon } from '../../../utils/operate';
import {
  ExamOptionModel,
  ExamSearchParams,
  examSliceInitState,
  QuestionResult,
  QuestionType
} from "../../../_core/exam";
import { DispatchType } from '../../configStore';
import { examService } from '../../../services/ExamService';
import Constants from "../../../constants/Constants";

const initialState = {
  hotExamsByCategory: {},
  examType: 'PRIVATE',
  lstOptionExam: [{}],
} as examSliceInitState

const examSlice = createSlice({
  name: 'examSlice',
  initialState,
  reducers: {
    getOptionExam: (state: examSliceInitState, action: PayloadAction<{ lstOptionExam: ExamOptionModel[] }>) => {
      state.lstOptionExam = action.payload.lstOptionExam
    },
    getExamType: (state: examSliceInitState, action: PayloadAction<{ examType: string }>) => {
      state.examType = action.payload.examType
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
    },
    chooseExamAnswer(state,action: PayloadAction<{ questionIndex: number, answerIndex: number, type: QuestionType, checked: boolean }>){
      let examResult : QuestionResult[];
      state.examResult !== undefined ? examResult = [...state.examResult] : examResult = [];
      
      switch (action.payload.type){
        case "MULTI":
          console.log("run multi");
          break;
        case "SINGLE":
          
          
          console.log("run single");
          break;
        default:
          return state;
      }
    }
  }
});

export const {
  getExamType,
  getOptionExam,
  hotExamsReceived,
  examsRandomReceived,
  examsCategoryReceived,
  examGetDetailReceived,
  examFetchDetailReceived,
  examOrderByOptionsReceived,
  examDurationOptionsReceived,
  chooseExamAnswer
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

export const fetchExamDetail = (name: object) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.fetchExamDetail(name);
      dispatch(examFetchDetailReceived(result.data.data))
      console.log(result.data.data);
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