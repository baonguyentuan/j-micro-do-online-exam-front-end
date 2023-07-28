import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { InitialContestState } from "../../_core/contest";
import { thunkAction } from "../../utils/redux-helpers";
import clientService from "../../utils/client";
import ApiEndpoint from "../../constants/ApiEndpoint";
import { openNotificationWithIcon } from "../../utils/operate";


const initialState = {
  loading: false,

  contests:{},

  contestInfo: {},

  contestInfoDetail:{}
} as InitialContestState;

const contestSlice = createSlice({
  name: "contestSlice",
  initialState,
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(getContestByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.contestInfo = action.payload.data;
      
      return state;
    });
    builder.addCase(getContestByOwner.fulfilled,(state,action)=>{
      state.loading = false;
      
      return state;
    });
    builder.addCase(getContestDetail.fulfilled,(state,action)=>{
      state.loading = false;
      
      return state;
    });
    builder.addCase(postCreateContest.fulfilled,(state,action)=>{
      state.loading = false;
      openNotificationWithIcon("success", "Create contest successful", "", 1)
      return state;
    });
    builder.addMatcher(
      isAnyOf(
        postCreateContest.fulfilled,
        deleteContest.fulfilled),(state,action)=>{
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
    return clientService.get(ApiEndpoint.contest.GET, { params });
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
  thunkAction(async (payload: any) => {
    return clientService.post(ApiEndpoint.contest.CREATE, payload);
  })
);

export const deleteContest = createAsyncThunk(
  "contest/deleteContest",
  thunkAction(async (params) => {
    return clientService.delete(ApiEndpoint.contest.DELETE, { params });
  })
);

export const {} = contestSlice.actions;

export default contestSlice.reducer;




