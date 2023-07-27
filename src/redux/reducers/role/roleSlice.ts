import { createSlice } from '@reduxjs/toolkit';
import { DispatchType } from '../../configStore';
import { setLoading } from "../loading/loadingSlice";
import { rolesService } from '../../../services/RoleService';

const initialState = {
    data: [{
        id: 1,
        roleName: '',
        createdAt: '',
    }],
    inputRole: {
        id: 1,
        roleName: '',
        selectedEndpoint: '',
      },
};

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        getRoles: (state, action) => {
            state.data = action.payload;
        },
        addRoleSuccess: (state, action) => {
            state.data.push(action.payload);
        },
        updateRoleSuccess: (state, action) => {
            const { id, updatedRole } = action.payload;
            state.data = state.data.map(role => {
                if (role.id === id) {
                    return { ...role, ...updatedRole };
                }
                return role;
            });
        },
        handleInputRole: (state, action) => {
            state.inputRole = action.payload;
          },
    },
});

export const { getRoles, addRoleSuccess, updateRoleSuccess, handleInputRole } = rolesSlice.actions;

export default rolesSlice.reducer;

export const getRolesApi = () => {
    return async (dispatch: DispatchType) => {
        dispatch(setLoading({ isLoading: true }));
        try {
            const result = await rolesService.getRoles();
            dispatch(getRoles(result.data));
        } catch (err) {
            console.log(err);
        }
        dispatch(setLoading({ isLoading: false }));
    };
};
export const getRoleOderBy = (order_by: {}) => {
    return async (dispatch: DispatchType) => {
      dispatch(setLoading({ isLoading: true }))
      try {
        const result = await rolesService.getRolesOrderBy(order_by)
        dispatch(getRoles(result.data));
      } catch (err) {
        console.log(err);
      }
      await dispatch(setLoading({ isLoading: false }))
    }
  }
export const addRole = (name: string, endPoint: string) => {
    return async (dispatch: DispatchType) => {
        dispatch(setLoading({ isLoading: true }));
        try {
            const result = await rolesService.createRole(name, endPoint);
            dispatch(addRoleSuccess(result.data));
            await dispatch(getRolesApi());
        } catch (err) {
            console.log(err);
        }
        dispatch(setLoading({ isLoading: false }));
    };
};

export const updateRole = (name: string, endPoint: string) => {
    return async (dispatch: DispatchType) => {
        dispatch(setLoading({ isLoading: true }));
        try {
            await rolesService.editRole(name, endPoint);
            dispatch(updateRoleSuccess({ name, endPoint }));
        } catch (err) {
            console.log(err);
        }
        dispatch(setLoading({ isLoading: false }));
    };
};