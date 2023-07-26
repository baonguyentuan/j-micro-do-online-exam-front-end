import { createSlice } from '@reduxjs/toolkit';
import { DispatchType } from '../../configStore';
import { setLoading } from "../loading/loadingSlice";
import { rolesService } from '../../../services/RoleService';
import Constants from '../../../constants/Constants';

const initialState = {
    lstRole: [],
    pagination: {
        index: 1,
        pages: 1,
        totals: 1
    },
    currentRole: {
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
            state.lstRole = action.payload.data;
            state.pagination=action.payload.pagination
        },
        addRoleSuccess: (state, action) => {
            // state.data.push(action.payload);
        },
        updateRoleSuccess: (state, action) => {
            // const { id, updatedRole } = action.payload;
            // state.data = state.data.map(role => {
            //     if (role.id === id) {
            //         return { ...role, ...updatedRole };
            //     }
            //     return role;
            // });
        },
    },
});

export const { getRoles, addRoleSuccess, updateRoleSuccess } = rolesSlice.actions;

export default rolesSlice.reducer;

export const getRolesApi = (param:object) => {
    return async (dispatch: DispatchType) => {
        dispatch(setLoading({ isLoading: true }));
        try {
            const result = await rolesService.getRoles(param);
            dispatch(getRoles(result.data));
        } catch (err) {
            console.log(err);
        }
        dispatch(setLoading({ isLoading: false }));
    };
};

export const addRole = (name: string, endPoint: string) => {
    return async (dispatch: DispatchType) => {
        dispatch(setLoading({ isLoading: true }));
        try {
            const result = await rolesService.createRole(name, endPoint);
            dispatch(addRoleSuccess(result.data));
            await dispatch(getRolesApi({
                name: Constants.EmptyString,
                from_date: Constants.EmptyString,
                to_date: Constants.EmptyString,
                page_index: 1,
                page_size: 10,
                order_by: -1
            }));
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
