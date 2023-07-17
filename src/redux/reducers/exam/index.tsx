import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { setLoading } from "../loading/loadingSlice";
import { openNotificationWithIcon } from "../../../utils/operate";
import {
  ExamDetailFormModel,
  ExamOptionModel,
  ExamResultType,
  ExamSearchParams,
  examSliceInitState,
  QuestionResult,
  QuestionType
} from "../../../_core/exam";
import { DispatchType } from "../../configStore";
import { examService } from "../../../services/ExamService";
import Constants from "../../../constants/Constants";
import { closeDrawer } from '../drawer/drawerSlice';
import AppConfigs from '../../../config/AppConfigs';
const initialState = {
  hotExamsByCategory: {},
  lstOptionExam: [{}],
  checkExamResult:{},
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
      state.fullExamDetail = action.payload.examDetail
    },
    hotExamsReceived(state, action) {
      state.hotExamsByCategory = action.payload;
    },
    examsCategoryReceived(state, action) {
      state.examsByCategory = action.payload;
    },
    examDurationOptionsReceived(state, action) {
      state.examDurationOptions = action.payload;
    },
    examOrderByOptionsReceived(state, action) {
      state.examOrderByOptions = action.payload;
    },
    examGetDetailReceived(state, action) {
      state.examGetDetail = action.payload;
    },
    examFetchDetailReceived(state, action) {
      state.examFetchDetail = action.payload;
    },
    examsRandomReceived(state, action) {
      state.randomExams = action.payload;
    },
    checkExamStatus(state) {
      let flagCheck = "";
      let count = 0;
      if (state.examStartTime + state.examFetchDetail.duration*60000){
        flagCheck = "STILL_HAVE_TIME"
      }
      
      for (let i = 0; i < state.examResult.answers.length; i++) {
        if (state.examResult.answers[i].answerSelected.length === 0) {
          count++;
        }
      }
      
      if (count ===  state.examResult.answers.length){
        flagCheck = "ALL_QUESTION_NOT_ANSWER"
      }else if(count > 0){
        flagCheck = "HAVE_QUESTION_NOT_ANSWER"
      }
  
      switch (flagCheck){
        case "HAVE_QUESTION_NOT_ANSWER":
          state.checkExamResult.flag = false
          state.checkExamResult.message = "Some question aren't fill answer! Are you sure to continue submit";
          break;
        case "ALL_QUESTION_NOT_ANSWER":
          state.checkExamResult.flag = true
          state.checkExamResult.message = "All questions aren't fill answer! Can not submit the exam.";
          break;
        case "STILL_HAVE_TIME":
          state.checkExamResult.flag = false
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
       let data = newQuestionsExam.map(ques =>{
         return {...ques,checked: -1}
       });
      state.examFetchDetail.questionsExam = data
      
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
      
      switch (action.payload.type) {
        case "MULTI":
          if (action.payload.checked) {
            newAnswers[questionGetIndex].answerSelected.push(answerGetIndex);
          } else {
            findAnswerIndex !== -1 && newAnswers[questionGetIndex].answerSelected.splice(findAnswerIndex, 1);
          }

          state.examResult.answers = newAnswers;
          break;
        case "SINGLE":
          if (state.examResult.answers[action.payload.questionIndex].answerSelected.length === 0) {
            newAnswers[action.payload.questionIndex].answerSelected.push(action.payload.answerIndex);
          } else {
            newAnswers[action.payload.questionIndex].answerSelected[0] = action.payload.answerIndex;
          }
          let newExamFetchDetail = [...state.examFetchDetail.questionsExam]
          let questionChange = newExamFetchDetail[questionGetIndex]
          questionChange.checked = action.payload.answerIndex
          state.examFetchDetail.questionsExam = newExamFetchDetail

          state.examResult.answers = newAnswers;
          break;
        default:
          return state;
      }
    }
    
  }
});

export const {
  getOptionExam,
  getFullExamDetail,
  hotExamsReceived,
  examsRandomReceived,
  examsCategoryReceived,
  examGetDetailReceived,
  examFetchDetailReceived,
  examOrderByOptionsReceived,
  examDurationOptionsReceived,
  chooseExamAnswer,
  createAnswersStore,
  checkExamStatus,
} = examSlice.actions;

export default examSlice.reducer;

export const createExamApi = (examDetail: FormData) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.creatExam(examDetail);
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        dispatch(closeDrawer())
        dispatch(getFullExamDetail({
          examDetail: {
            id: -1,
            title: '',
            categoryId: null,
            examType: "PRIVATE",
            description: '',
            duration: AppConfigs.exam.MIN_DURATION_EXAM,
            question: [
            ],
            file: null
          }
        }))
        dispatch(getExamsApi({
          name: '',
          category_ids: Constants.EmptyString,
          durations: Constants.EmptyString,
          from_date: Constants.EmptyString,
          to_date: Constants.EmptyString,
          page_index: 1,
          page_size: 10,
          order_by: -1
        }))
        openNotificationWithIcon('success', 'Create exam successful', '', 1)
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

export const getExamsByCategoryApi = () => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.getExamByCategory();
      dispatch(hotExamsReceived(result.data.data));
    } catch (err) {
      openNotificationWithIcon("error", "Get exams by category failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const getExamsApi = (params: ExamSearchParams) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.getExams(params);
      dispatch(examsCategoryReceived(result.data));
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Get exams failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const getExamDurationOptions = () => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.getExamDurationOptions();
      dispatch(examDurationOptionsReceived(result.data.data));
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Get exam duration options failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const getExamOrderByOptions = () => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.getExamOrderByOptions();
      dispatch(examOrderByOptionsReceived(result.data.data));
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Get exam order by options failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const getExamDetail = (name: object) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.getExamDetail(name);
      dispatch(examGetDetailReceived(result.data.data));
    } catch (err) {
      openNotificationWithIcon("error", "Get exam detail failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const fetchExamDetail = (name: object) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.fetchExamDetail(name);
      dispatch(examFetchDetailReceived(result.data.data));
      dispatch(createAnswersStore());
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Fetch exam detail failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const getExamsRandom = (name: object) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await examService.getRandomExams(name);
      dispatch(examsRandomReceived(result.data.data));
    } catch (err) {
      openNotificationWithIcon("error", "Get random exams failed", "", 1);
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
        dispatch(getExamsApi({
          name: '',
          category_ids: Constants.EmptyString,
          durations: Constants.EmptyString,
          from_date: Constants.EmptyString,
          to_date: Constants.EmptyString,
          page_index: 1,
          page_size: 10,
          order_by: -1
        }))
        dispatch(getExamOptionApi())
        openNotificationWithIcon('success', 'Delete exam successful', '', 1)
      } else {
        console.log(result);
        openNotificationWithIcon("error", "Delete exam failed", "", 1);
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Delete exam failed", "", 1);
    }
  }
}

export const getFullExamDetailApi = (examID: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await examService.getFullExamDetail({ id: examID })
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        let { id, title, categoryID, description, duration, questions } = result.data.data
        dispatch(getFullExamDetail({
          examDetail: {
            id,
            title,
            categoryId: categoryID,
            examType:'',
            description,
            duration,
            question: questions,
            file: ''
          }
        }))
      } else {
        console.log(result);
        openNotificationWithIcon('error', 'Get exam detail failed', '', 1)
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Get exam detail failed', '', 1)
    }
  }
}

export const editExamApi = (examDetail: object) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.editExam(examDetail)
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        dispatch(closeDrawer())
        dispatch(getExamsApi({
          name: '',
          category_ids: Constants.EmptyString,
          durations: Constants.EmptyString,
          from_date: Constants.EmptyString,
          to_date: Constants.EmptyString,
          page_index: 1,
          page_size: 10,
          order_by: -1
        }))

        openNotificationWithIcon('success', 'Edit exam successful', '', 1)
      } else {
        console.log(result);
        openNotificationWithIcon('error', 'Edit exam failed', '', 1)
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Edit exam failed', '', 1)
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}

export const updateThumbnailExamApi = (thumbnail: FormData) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }))
    try {
      const result = await examService.updateThumbnailExam(thumbnail)
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        dispatch(getExamsApi({
          name: '',
          category_ids: Constants.EmptyString,
          durations: Constants.EmptyString,
          from_date: Constants.EmptyString,
          to_date: Constants.EmptyString,
          page_index: 1,
          page_size: 10,
          order_by: -1
        }))
        dispatch(closeDrawer())
        openNotificationWithIcon('success', 'Edit exam successful', '', 1)
      } else {
        console.log(result);
        openNotificationWithIcon('error', 'Edit exam failed', '', 1)
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Edit exam failed', '', 1)
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}


export const submitExam = (data: ExamResultType) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const pureAnswers = data.answers.reduce((result: any, ans: QuestionResult) => {
        const { id, answerSelected } = ans;
        result.push({ id, answers: answerSelected });
        return result;
      }, []);

      const result = await examService.submitExamData({...data,answers:pureAnswers});

      openNotificationWithIcon("success", "Submit exam successfully", "", 1);
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Submit exam fail", "", 1);
    }
    //await dispatch(setLoading({ isLoading: false }));
  };
};
