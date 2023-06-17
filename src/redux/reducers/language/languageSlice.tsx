import { createSlice } from '@reduxjs/toolkit'
import { LanguageState } from '../../../_core/LanguageModel';


const initialState:LanguageState = {
    language:'eng'
}

const languageReducer = createSlice({
  name: 'languageReducer',
  initialState,
  reducers: {}
});

export const {} = languageReducer.actions

export default languageReducer.reducer