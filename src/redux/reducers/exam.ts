import { createAsyncThunk, createSlice, current, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { setLoading } from "./loading/loadingSlice";
import { openNotificationWithIcon } from "../../utils/operate";
import {
  ExamDetailFormModel,
  ExamOptionModel,
  examSliceInitState,
  QuestionResult,
  QuestionType
} from "../../_core/exam";
import { DispatchType } from "../configStore";
import { examService } from "../../services/ExamService";
import Constants from "../../constants/Constants";
import { closeDrawer } from "./drawer/drawerSlice";
import AppConfigs from "../../config/AppConfigs";
import { thunkAction } from "../../utils/redux-helpers";
import clientService from "../../utils/client";
import ApiEndpoint from "../../constants/ApiEndpoint";
import menuSlice, { setDefaultTabAccountKey } from "./menu/menuSlice";
import categorySlice from "./category/categorySlice";
import { getLocalStorage } from "../../utils/local-storage";
import { history } from "../..";
import AppRoutes from "../../constants/AppRoutes";

const initialState = {
  hotExamsByCategory: {},
  lstOptionExam: [{}],
  checkExamResult: {},
  loading: false,
  fullExamDetail: {}
} as examSliceInitState;

const examSlice = createSlice({
  name: "examSlice",
  initialState,
  reducers: {
    getOptionExam: (state: examSliceInitState, action: PayloadAction<{ lstOptionExam: ExamOptionModel[] }>) => {
      state.lstOptionExam = action.payload.lstOptionExam;
    },
    getFullExamDetail: (state: examSliceInitState, action: PayloadAction<{ examDetail: ExamDetailFormModel }>) => {
      state.fullExamDetail = action.payload.examDetail;
    },
    checkExamStatus(state) {
      let flagCheck = "";
      let count = 0;
      if (state.examStartTime + state.examFetchDetail.duration * 60000) {
        flagCheck = "STILL_HAVE_TIME";
      }

      for (let i = 0; i < state.examResult.answers.length; i++) {
        if (state.examResult.answers[i].answerSelected.length === 0) {
          count++;
        }
      }

      if (count === state.examResult.answers.length) {
        flagCheck = "ALL_QUESTION_NOT_ANSWER";
      } else if (count > 0) {
        flagCheck = "HAVE_QUESTION_NOT_ANSWER";
      }

      switch (flagCheck) {
        case "HAVE_QUESTION_NOT_ANSWER":
          state.checkExamResult.flag = false;
          state.checkExamResult.message = "Some question aren't fill answer! Are you sure to continue submit";
          break;
        case "ALL_QUESTION_NOT_ANSWER":
          state.checkExamResult.flag = true;
          state.checkExamResult.message = "All questions aren't fill answer! Can not submit the exam.";
          break;
        case "STILL_HAVE_TIME":
          state.checkExamResult.flag = false;
          state.checkExamResult.message = "You still have time! Are you sure to submit the exam.";
          break;
        default:
          return state;
      }
    },
    createAnswersStore(state) {
      if (state.examFetchDetail === undefined) {
        return state;
      }
      let examResult: QuestionResult[] = [];
      current(state.examFetchDetail).questionsExam.forEach((question, index) => {
        examResult.push({ id: question.id, questionIndex: index, answerSelected: [] });
      });

      let newQuestionsExam = [...state.examFetchDetail.questionsExam];
      state.examFetchDetail.questionsExam = newQuestionsExam.map(ques => {
        return { ...ques, checked: -1 };
      });

      //create init answer store
      state.examResult = {
        id: state.examFetchDetail.id,
        answers: examResult
      };
      //save time exam start
      state.examStartTime = Date.now();
    },
    chooseExamAnswer(state, action: PayloadAction<{ questionIndex: number, answerIndex: number, type: QuestionType, checked: boolean }>) {
      let newAnswers = [...state.examResult.answers];
      let answerGetIndex = action.payload.answerIndex;
      let questionGetIndex = action.payload.questionIndex;
      let findAnswerIndex = state.examResult.answers[questionGetIndex].answerSelected
        .findIndex(answer => answer === answerGetIndex);

      let newExamFetchDetail = [...state.examFetchDetail.questionsExam];
      switch (action.payload.type) {
        case "MULTI":
          let questionMultiChange = newExamFetchDetail[questionGetIndex];
          if (action.payload.checked) {
            newAnswers[questionGetIndex].answerSelected.push(answerGetIndex);

          } else {
            findAnswerIndex !== -1 && newAnswers[questionGetIndex].answerSelected.splice(findAnswerIndex, 1);
          }
          questionMultiChange.multi_checked = newAnswers[questionGetIndex].answerSelected;
          state.examFetchDetail.questionsExam = newExamFetchDetail;
          state.examResult.answers = newAnswers;
          break;
        case "SINGLE":
          if (state.examResult.answers[action.payload.questionIndex].answerSelected.length === 0) {
            newAnswers[action.payload.questionIndex].answerSelected.push(action.payload.answerIndex);
          } else {
            newAnswers[action.payload.questionIndex].answerSelected[0] = action.payload.answerIndex;
          }
          let questionSingleChange = newExamFetchDetail[questionGetIndex];
          questionSingleChange.checked = action.payload.answerIndex;
          state.examFetchDetail.questionsExam = newExamFetchDetail;

          state.examResult.answers = newAnswers;
          break;
        default:
          return state;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getListExam.fulfilled, (state, action) => {
      state.loading = false;
      state.examsByCategory = action.payload;

      return state;
    });
    builder.addCase(getListExamByCategory.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);
      state.hotExamsByCategory = action.payload.data;

      return state;
    });
    builder.addCase(getExamDurationOptions.fulfilled, (state, action) => {
      state.examDurationOptions = action.payload.data;

      return state;
    });
    builder.addCase(getExamOrderByOptions.fulfilled, (state, action) => {
      state.loading = false;
      state.examOrderByOptions = action.payload.data;

      return state;
    });
    builder.addCase(getExamDetailShow.fulfilled, (state, action) => {
      state.loading = false;
      state.examGetDetail = action.payload.data;

      return state;
    });
    builder.addCase(getExamDetailDo.fulfilled, (state, action) => {
      state.loading = false;
      state.examFetchDetail = action.payload.data;

      return state;
    });
    builder.addCase(getExamsRandom.fulfilled, (state, action) => {
      state.loading = false;
      state.randomExams = action.payload.data;

      return state;
    });
    builder.addMatcher(
      isAnyOf(
        postCreateExam.fulfilled,
        postSubmitExam.fulfilled,
        deleteExam.fulfilled), (state) => {
          state.loading = false;

          return state;
        });
    builder.addMatcher(
      isAnyOf(
        getListExam.pending,
        getListExamByCategory.pending,
        getExamOrderByOptions.pending,
        getExamDurationOptions.pending,
        getExamsRandom.pending,
        postCreateExam.pending,
        postSubmitExam.pending,
        deleteExam.pending), (state) => {
          state.loading = true;

          return state;
        });
    builder.addMatcher(
      isAnyOf(
        getListExam.rejected,
        getListExamByCategory.rejected,
        getExamOrderByOptions.rejected,
        getExamDurationOptions.rejected,
        getExamsRandom.rejected,
        postCreateExam.rejected,
        postSubmitExam.rejected,
        deleteExam.rejected), (state) => {
          state.loading = false;

          return state;
        });
  }
});

export const {
  getOptionExam,
  getFullExamDetail,
  chooseExamAnswer,
  checkExamStatus,
  createAnswersStore
} = examSlice.actions;

export const postCreateExam = createAsyncThunk(
  "exam/createExam",
  thunkAction(async (payload: any) => {
    return clientService.post(ApiEndpoint.exam.CREATE, payload);
  })
);

export const getListExam = createAsyncThunk(
  "exam/getListExam",
  thunkAction(async (params: any) => {
    return clientService.get(ApiEndpoint.exam.GET, { params });
  })
);

export const getListExamByCategory = createAsyncThunk(
  "exam/getListExamByCategory",
  thunkAction(async () => {
    return clientService.get(ApiEndpoint.exam.GET_HOT_EXAMS_CATEGORY);
  })
);

export const getExamDurationOptions = createAsyncThunk(
  "exam/getListExamDurationOptions",
  thunkAction(async () => {
    return clientService.get(ApiEndpoint.exam.GET_DURATIONS);
  })
);

export const getExamOrderByOptions = createAsyncThunk(
  "exam/getListExamOrderByOptions",
  thunkAction(async () => {
    return clientService.get(ApiEndpoint.exam.GET_ORDER_BY);
  })
);

export const getExamDetailShow = createAsyncThunk(
  "exam/getExamDetailShow",
  thunkAction(async (params: any) => {
    return clientService.get(ApiEndpoint.exam.GET_DETAIL, { params });
  })
);

export const getExamDetailDo = createAsyncThunk(
  "exam/getExamDetailDo",
  thunkAction(async (params: any) => {
    return clientService.get(ApiEndpoint.exam.FETCH_DETAIL, { params });
  })
);

export const getExamsRandom = createAsyncThunk(
  "exam/getExamsRandom",
  thunkAction(async (params: any) => {
    return clientService.get(ApiEndpoint.exam.GET_RANDOM, { params });
  })
);

export const postSubmitExam = createAsyncThunk(
  "exam/postSubmitExam",
  thunkAction(async (payload: any) => {
    return clientService.post(ApiEndpoint.exam.SUBMIT_EXAM, payload);
  })
);

export const deleteExam = createAsyncThunk(
  "exam/deleteExam",
  thunkAction(async (params: any) => {
    return clientService.delete(`${ApiEndpoint.exam.DELETE}?id=${params}`);
  })
);


export const createExamApi = (examDetail: FormData) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.creatExam(examDetail);
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        dispatch(getFullExamDetail({
          examDetail: {
            id: -1,
            title: "",
            categoryId: null,
            examType: "PRIVATE",
            description: "",
            duration: AppConfigs.exam.MIN_DURATION_EXAM,
            question: [],
            file: null
          }
        }));
        dispatch(getListExam({
          name: "",
          category_ids: Constants.EmptyString,
          durations: Constants.EmptyString,
          from_date: Constants.EmptyString,
          to_date: Constants.EmptyString,
          page_index: 1,
          page_size: 10,
          order_by: -1
        }));
        openNotificationWithIcon("success", "Create exam successful", "", 1);
        if (getLocalStorage(Constants.localStorageKey.status)) {
          dispatch(closeDrawer())
        } else {
          dispatch(setDefaultTabAccountKey({ key: 'exam' }))
          history.push(AppRoutes.private.user.account)
        }
      } else {
        console.log(result);
        openNotificationWithIcon("error", "Create exam failed", "", 1);
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Create exam failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const getExamOptionApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await examService.getExamOption();
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        dispatch(getOptionExam({ lstOptionExam: result.data.data }));
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteExamApi = (examID: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await examService.deleteExam(examID);
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        dispatch(getListExam({
          name: "",
          category_ids: Constants.EmptyString,
          durations: Constants.EmptyString,
          from_date: Constants.EmptyString,
          to_date: Constants.EmptyString,
          page_index: 1,
          page_size: 10,
          order_by: -1
        }));
        dispatch(getExamOptionApi());
        openNotificationWithIcon("success", "Delete exam successful", "", 1);
      } else {
        console.log(result);
        openNotificationWithIcon("error", "Delete exam failed", "", 1);
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Delete exam failed", "", 1);
    }
  };
};

export const getFullExamDetailApi = (examID: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await examService.getFullExamDetail({ id: examID });
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        let { id, title, categoryID, description, duration, questions } = result.data.data;
        dispatch(getFullExamDetail({
          examDetail: {
            id,
            title,
            categoryId: categoryID,
            examType: "",
            description,
            duration,
            question: questions,
            file: ""
          }
        }));
      } else {
        console.log(result);
        openNotificationWithIcon("error", "Get exam detail failed", "", 1);
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Get exam detail failed", "", 1);
    }
  };
};

export const editExamApi = (examDetail: object) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.editExam(examDetail);
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        dispatch(closeDrawer());
        dispatch(getListExam({
          name: "",
          category_ids: Constants.EmptyString,
          durations: Constants.EmptyString,
          from_date: Constants.EmptyString,
          to_date: Constants.EmptyString,
          page_index: 1,
          page_size: 10,
          order_by: -1
        }));

        openNotificationWithIcon("success", "Edit exam successful", "", 1);
      } else {
        console.log(result);
        openNotificationWithIcon("error", "Edit exam failed", "", 1);
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Edit exam failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const updateThumbnailExamApi = (thumbnail: FormData) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.updateThumbnailExam(thumbnail);
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        dispatch(getListExam({
          name: "",
          category_ids: Constants.EmptyString,
          durations: Constants.EmptyString,
          from_date: Constants.EmptyString,
          to_date: Constants.EmptyString,
          page_index: 1,
          page_size: 10,
          order_by: -1
        }));
        dispatch(closeDrawer());
        openNotificationWithIcon("success", "Edit exam successful", "", 1);
      } else {
        console.log(result);
        openNotificationWithIcon("error", "Edit exam failed", "", 1);
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Edit exam failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export default examSlice.reducer;