import { createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../../configStore';
import { endpointService } from '../../../services/EndpointService';

const initialState = {

}

const endpointSlice = createSlice({
  name: 'endpointSlice',
  initialState,
  reducers: {}
});

export const {} = endpointSlice.actions

export default endpointSlice.reducer