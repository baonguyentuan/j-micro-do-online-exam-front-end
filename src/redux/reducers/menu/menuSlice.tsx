import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MenuStateModel } from '../../../_core/MenuModel';
import Constants from '../../../constants/Constants';

const initialState: MenuStateModel = {
  optionSidebarAdmin: Constants.optionMenuAdmin.USER
}

const menuSlice = createSlice({
  name: 'menuSlice',
  initialState,
  reducers: {
    setOptionSidebarAdmin: (state: MenuStateModel, action: PayloadAction<{ option: string }>) => {
      state.optionSidebarAdmin = action.payload.option
    }
  }
});

export const { setOptionSidebarAdmin } = menuSlice.actions

export default menuSlice.reducer