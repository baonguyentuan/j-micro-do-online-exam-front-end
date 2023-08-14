import { PayloadAction, createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ContestInfoModel, InitialContestState } from "../../_core/contest";
import { thunkAction } from "../../utils/redux-helpers";
import clientService from "../../utils/client";
import ApiEndpoint from "../../constants/ApiEndpoint";
import { openNotificationWithIcon } from "../../utils/operate";
import AppConfigs from "../../config/AppConfigs";
import { history } from "../..";
import AppRoutes from "../../constants/AppRoutes";
import { setDefaultTabAccountKey } from "./menu/menuSlice";

const initialState = {
  loading: false,
  contests: {},
  contestInfo: {},
  contestInfoDetail: {
    name: '',
    examName: '',
    endAt: '',
    startAt: '',
    ownerName: '',
    description: '',
    participants: [{}]
  },
  lstContest: [{}],
  pagination: {
    index: 1,
    pages: 1,
    totals: 0
  }
} as InitialContestState;

const contestSlice = createSlice({
  name: "contestSlice",
  initialState,
  reducers: {
  },
  extraReducers: (builder => {
    builder.addCase(getContestByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.contestInfo = action.payload.data;

      return state;
    });
    builder.addCase(getContestByOwner.fulfilled, (state, action) => {
      state.loading = false;
      state.lstContest = action.payload.data
      state.pagination = action.payload.pagination
      return state;
    });
    builder.addCase(getContestDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.contestInfoDetail = action.payload.data
      return state;
    });
    builder.addCase(postCreateContest.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);

      return state;
    });
    builder.addCase(deleteContest.fulfilled, (state, action) => {
      state.loading = false;
      openNotificationWithIcon("success", "Delete contest successful", "", 1)

      return state;
    });
    builder.addMatcher(
      isAnyOf(
        postCreateContest.fulfilled,
        deleteContest.fulfilled), (state, action) => {
          state.loading = false;

          return state;
        });
    builder.addMatcher(
      isAnyOf(
        getContestByUser.pending,
        getContestByOwner.pending,
        getContestDetail.pending,
        postCreateContest.pending,
        deleteContest.pending), (state, action) => {
          state.loading = true;

          return state;
        });
    builder.addMatcher(
      isAnyOf(
        getContestByUser.rejected,
        getContestByOwner.rejected,
        getContestDetail.rejected,
        postCreateContest.rejected,
        deleteContest.rejected), (state, action) => {
          state.loading = false;
          console.log(action)

          return state;
        });
  })
});

export const getContestByOwner = createAsyncThunk(
  "contest/getContestByOwner",
  thunkAction(async (params: any) => {
    return await clientService.get(ApiEndpoint.contest.GET, { params });
  })
);

export const getContestByUser = createAsyncThunk(
  "contest/getContestByUser",
  thunkAction(async () => {
    return clientService.get(ApiEndpoint.contest.GET_CONTEST_FOR_USER);
  })
);

export const getContestDetail = createAsyncThunk(
  "contest/getContestDetail",
  thunkAction(async (params: any) => {
    return clientService.get(ApiEndpoint.contest.GET_CONTEST_BY_ID, { params });
  })
);

export const postCreateContest = createAsyncThunk(
  "contest/postCreateContest",
  thunkAction(async (payload: any, { dispatch }) => {
    try {
      await clientService.post(ApiEndpoint.contest.CREATE, payload);
      openNotificationWithIcon("success", "Create contest successful", "", 1)
      let result = await dispatch(getContestByOwner({
        name: '',
        from_date: '',
        to_date: '',
        page_size: AppConfigs.pagination.DEFAULT_PAGE_SIZE,
        page_index: AppConfigs.pagination.DEFAULT_PAGE_INDEX,
        order_by: -1
      }))
      await dispatch(setDefaultTabAccountKey({ key: 'contest' }))
      await history.push(AppRoutes.private.user.account)
      return result
    } catch (error) {
      openNotificationWithIcon("error", "Create contest failed", "", 1);
    }

  })
);

export const deleteContest = createAsyncThunk(
  "contest/deleteContest",
  thunkAction(async (idContest: number, { dispatch }) => {
    try {
      await clientService.delete(`${ApiEndpoint.contest.DELETE}/${idContest}`);
      const result = await dispatch(getContestByOwner({
        name: '',
        from_date: '',
        to_date: '',
        page_size: AppConfigs.pagination.DEFAULT_PAGE_SIZE,
        page_index: AppConfigs.pagination.DEFAULT_PAGE_INDEX,
        order_by: -1
      }))
      openNotificationWithIcon("success", "Delete contest successful", "", 1)
      return result
    } catch (error) {
      openNotificationWithIcon("error", "Delete contest failed", "", 1);
      
    }

  })
);

export const {  } = contestSlice.actions;

export default contestSlice.reducer;




