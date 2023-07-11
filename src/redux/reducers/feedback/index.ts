import { createSlice } from "@reduxjs/toolkit";
import { DispatchType } from "../../configStore";
import { setLoading } from "../loading/loadingSlice";
import { openNotificationWithIcon } from "../../../utils/operate";
import { feedBackService } from "../../../services/FeedBackService";
import { FeedBackExamCommand, FeedBackSearchParams, feedBackSliceInitState } from "../../../_core/feedback";

const initialState = {} as feedBackSliceInitState;

const feedBackSlice = createSlice({
  name: "feedBackSlice",
  initialState: initialState,
  reducers: {
    feedbacksByExamReceive(state, action) {
      state.examRatingList = action.payload;
    },
    feedBackStatisticReceive(state, action) {
      state.examRating = action.payload;
    }
  }
});

export const { feedbacksByExamReceive, feedBackStatisticReceive } = feedBackSlice.actions;

export default feedBackSlice.reducer;

export const getFeedBackByExam = (params: FeedBackSearchParams) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await feedBackService.getFeedBackByExamName(params);
      dispatch(feedbacksByExamReceive(result.data));
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Fetch exam feedback failed", "", 1);
    }
  };
};

export const calculateExamRating = (name: object) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await feedBackService.getExamRating(name);
      dispatch(feedBackStatisticReceive(result.data.data));
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Get feedback rating failed", "", 1);
    }
  };
};

export const createFeedBack = (feedBack: FeedBackExamCommand) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await feedBackService.createFeedBack(feedBack);
      console.log(result);
      openNotificationWithIcon("error", "Create feedback successfully", "", 1);
    } catch (err) {
      openNotificationWithIcon("error", "Create feedback failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const checkUserFeedBack = (params: object) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await feedBackService.getStatusUserFeedBack(params);
      console.log(result);
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Edit feedback failed", "", 1);
    }
  };
};

export const deleteFeedBack = (id: number) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await feedBackService.deleteFeedBack(id);
      console.log(result);
      openNotificationWithIcon("success", "Delete feedback successfully", "", 1);
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Delete feedback failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const editFeedBack = (feedBack: FeedBackExamCommand, params: object) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({ isLoading: true }));
    try {
      const result = await feedBackService.editFeedBack(feedBack, params);
      console.log(result);
      openNotificationWithIcon("success", "Edit feedback successfully", "", 1);
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Edit feedback failed", "", 1);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};
