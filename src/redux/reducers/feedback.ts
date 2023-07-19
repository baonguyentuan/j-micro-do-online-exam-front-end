import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { thunkAction } from "../../utils/redux-helpers";
import clientService from "../../utils/client";
import ApiEndpoint from "../../constants/ApiEndpoint";
import { feedBackSliceInitState } from "../../_core/feedback";

const initialState = {} as feedBackSliceInitState;

export interface FeedBackUpdateRequest {
  id: number,
  data: any
}

const feedBackSlice = createSlice({
  name: "feedBackSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(getFeedbacksByExam.fulfilled, (state, action) => {
      state.loading = false;
      state.examRatingList = action.payload;
      console.log(action.payload);

      return state;
    });
    builder.addCase(getExamRating.fulfilled, (state, action) => {
      state.loading = false;
      state.examRating = action.payload.data;

      return state;
    });
    builder.addMatcher(
      isAnyOf(
        postCreateFeedback.fulfilled,
        editFeedBack.fulfilled,
        deleteFeedBack.fulfilled,
        getStatusIsUserDoFeedBack.fulfilled
      ), (state) => {
        state.loading = false;

        return state;
      });
    builder.addMatcher(
      isAnyOf(
        getFeedbacksByExam.pending,
        deleteFeedBack.pending,
        getExamRating.pending,
        postCreateFeedback.pending,
        getStatusIsUserDoFeedBack.pending,
        editFeedBack.pending), (state) => {
        state.loading = true;

        return state;
      });
    builder.addMatcher(
      isAnyOf(
        getFeedbacksByExam.rejected,
        deleteFeedBack.rejected,
        getExamRating.rejected,
        postCreateFeedback.rejected,
        getStatusIsUserDoFeedBack.rejected,
        editFeedBack.rejected
      ), (state) => {
        state.loading = false;

        return state;
      });
  })
});

export const getFeedbacksByExam = createAsyncThunk(
  "feedback/getFeedbackByExam",
  thunkAction(async (params: any) => {
    return clientService.get(ApiEndpoint.feedback.GET_FEEDBACK_BY_EXAM_NAME, { params });
  })
);

export const getExamRating = createAsyncThunk(
  "feedback/getExamRating",
  thunkAction(async (params: any) => {
    return clientService.get(ApiEndpoint.feedback.GET_EXAM_RATING, { params });
  })
);

export const postCreateFeedback = createAsyncThunk(
  "feedback/postCreateFeedback",
  thunkAction(async (payload: any) => {
    return clientService.post(ApiEndpoint.feedback.CREATE_EXAM_FEEDBACK, payload);
  })
);

export const getStatusIsUserDoFeedBack = createAsyncThunk(
  "feedback/getStatusIsUserDoFeedBack",
  thunkAction(async (params: any) => {
    return clientService.get(ApiEndpoint.feedback.GET_STATUS_USER_FEEDBACK, { params });
  })
);

export const editFeedBack = createAsyncThunk(
  "feedback/editFeedback",
  thunkAction(async (payload: FeedBackUpdateRequest) => {
    return clientService.put(`${ApiEndpoint.feedback.EDIT}?id=${payload.id}`, payload.data);
  })
);

export const deleteFeedBack = createAsyncThunk(
  "feedback/deleteFeedback",
  thunkAction(async (params: any) => {
    return clientService.delete(ApiEndpoint.feedback.DELETE, { params });
  })
);

export const {} = feedBackSlice.actions;

export default feedBackSlice.reducer;
