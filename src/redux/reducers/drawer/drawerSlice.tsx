import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PropsDrawerModifierModel } from '../../../_core/DrawerModel';
import Constants from '../../../constants/Constants';

const initialState: PropsDrawerModifierModel = {
  isOpen: false,
  typeContent: Constants.typeDrawer.CREAT_CATEGORY,
  sizeDrawer: '30%'
}

const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    closeDrawer: (state: PropsDrawerModifierModel) => {
      state.isOpen = false
    },
    setDrawerInfo: (state: PropsDrawerModifierModel, action: PayloadAction<{ typeContent: string, sizeDrawer: string }>) => {
      state.isOpen = true
      state.typeContent = action.payload.typeContent
      state.sizeDrawer = action.payload.sizeDrawer
    }
  }
});

export const { closeDrawer, setDrawerInfo } = drawerSlice.actions

export default drawerSlice.reducer