import {createSlice} from '@reduxjs/toolkit'
import {DispatchType} from '../../configStore';
import {endpointService} from '../../../services/EndpointService';
import {setLoading} from "../loading/loadingSlice";

const initialState = {}

const endpointSlice = createSlice({
  name: 'endpointSlice',
  initialState,
  reducers: {}
});

export const {} = endpointSlice.actions

export default endpointSlice.reducer
export const getEndpointOptionApi = () => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({isLoading: true}))
    try {
      const result = await endpointService.getEndpointOption()
      console.log(result.data);

    } catch (err) {
      console.log(err);
    }
    await dispatch(setLoading({isLoading: false}))
  }
}
