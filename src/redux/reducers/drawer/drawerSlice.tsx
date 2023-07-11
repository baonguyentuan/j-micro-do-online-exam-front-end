import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PropsDrawerModifierModel } from '../../../_core/DrawerModel';
import { ReactElement } from 'react';

const initialState: PropsDrawerModifierModel = {
  isOpen: false,
  typeContent: 'createCategory'
}

const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    closeDrawer: (state: PropsDrawerModifierModel) => {
      state.isOpen = false
    },
    setDrawerInfo: (state: PropsDrawerModifierModel, action: PayloadAction<{ typeContent: string, }>) => {
      state.isOpen = true
      state.typeContent = action.payload.typeContent
    }
  }
});

export const {closeDrawer, setDrawerInfo } = drawerSlice.actions

export default drawerSlice.reducer