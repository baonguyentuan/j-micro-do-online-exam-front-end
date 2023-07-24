import { createSlice } from "@reduxjs/toolkit";

export const GlobalAccountModalActionType = {
  OPEN: "OPEN_ACCOUNT_MODAL",
  CLOSE: "CLOSE_ACCOUNT_MODAL"
};

const GlobalLoadingActionType = {
  OPEN: "OPEN_LOADING",
  CLOSE: "CLOSE_LOADING"
};

const initialState = {
  globalAccountModalOpen: false,

  globalLoading: false
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    triggerGlobalAccountModal(state, action) {
      switch (action.payload.type) {
        case GlobalAccountModalActionType.OPEN:
          state.globalAccountModalOpen = true;
          break;
        case GlobalAccountModalActionType.CLOSE:
          state.globalAccountModalOpen = false;
          break;
        default:
          return state;
      }
    },
    triggerGlobalLoading(state, action) {
      switch (action.type) {
        case GlobalLoadingActionType.OPEN:
          state.globalLoading = true;
          break;
        case GlobalLoadingActionType.CLOSE:
          state.globalLoading = false;
          break;
        default:
          return state;
      }
    }
  }
});

export const { triggerGlobalAccountModal, triggerGlobalLoading } = globalSlice.actions;

export default globalSlice.reducer;