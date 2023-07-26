import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MenuStateModel } from '../../../_core/MenuModel';
import Constants from '../../../constants/Constants';

const initialState: MenuStateModel = {
  optionSidebarAdmin: Constants.optionMenuAdmin.USER,
  defaultTabAccountKey: 'information',
}

const menuSlice = createSlice({
  name: 'menuSlice',
  initialState,
  reducers: {
    setOptionSidebarAdmin: (state: MenuStateModel, action: PayloadAction<{ option: string }>) => {
      state.optionSidebarAdmin = action.payload.option
    },
    setDefaultTabAccountKey: (state: MenuStateModel, action: PayloadAction<{ key: string }>) => {
      state.defaultTabAccountKey = action.payload.key
    },
  }
});

export const { setOptionSidebarAdmin, setDefaultTabAccountKey } = menuSlice.actions

export default menuSlice.reducer