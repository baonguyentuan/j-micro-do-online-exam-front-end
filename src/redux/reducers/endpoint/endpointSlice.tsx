import { createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../../configStore';
import { endpointService } from '../../../services/EndpointService';
import { setLoading } from "../loading/loadingSlice";

const initialState = {
  data: [{
    id: 1,
    endPoint: '',
    createdBy: '',
    createdAt: '',
    updatedBy: '',
    updatedAt: '',
  }],
  order_by: 1,
}

const endpointSlice = createSlice({
  name: 'endpointSlice',
  initialState,
  reducers: {
    getEndpoints: (state, action) => {
      state.data = action.payload;
      state.order_by = action.payload.order_by;
    },
    createEndpoint: (state, action) => {
      state.data.push(action.payload);
    },
    deleteEndpoint: (state, action) => {
      const { id } = action.payload;
      state.data = state.data.filter(endpoint => endpoint?.id !== id);
    },
  }
});

export const { getEndpoints, createEndpoint, deleteEndpoint } = endpointSlice.actions

export default endpointSlice.reducer
export const getEndpointApi = () => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading({ isLoading: true }))
    try {
      const result = await endpointService.getEndpoints()
      dispatch(getEndpoints(result.data));
    } catch (err) {
      console.log(err);
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}
export const getEndpointOderBy = (order_by: number) => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading({ isLoading: true }))
    try {
      const result = await endpointService.getEndpointsOrderBy(order_by)
      dispatch(getEndpoints(result.data));
    } catch (err) {
      console.log(err);
    }
    await dispatch(setLoading({ isLoading: false }))
  }
}
export const createEndpointApi = (endPointPath: string) => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading({ isLoading: true }));
    try {

      await endpointService.createEndpoint({ endPointPath });
      const result = await endpointService.getEndpoints();
      dispatch(getEndpoints(result.data));
    } catch (err) {
      console.log(err);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};

export const deleteEndpointApi = (id: number) => {
  return async (dispatch: DispatchType) => {
    dispatch(setLoading({ isLoading: true }));
    try {
      await endpointService.deleteEndpoint(id);
      const result = await endpointService.getEndpoints();
      dispatch(getEndpoints(result.data));
    } catch (err) {
      console.log(err);
    }
    await dispatch(setLoading({ isLoading: false }));
  };
};
