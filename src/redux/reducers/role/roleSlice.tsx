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
    },
});

export const { getRoles, addRoleSuccess, updateRoleSuccess } = rolesSlice.actions;

export default rolesSlice.reducer;

export const getRolesApi = () => {
    return async (dispatch: DispatchType) => {
        await dispatch(setLoading({ isLoading: true }));
        try {
            const result = await rolesService.getRoles();
            dispatch(getRoles(result.data));
        } catch (err) {
            console.log(err);
        }
        await dispatch(setLoading({ isLoading: false }));
    };
};

export const addRole = (roleName: string) => {
    return async (dispatch: DispatchType) => {
        await dispatch(setLoading({ isLoading: true }));
        try {
            const result = await rolesService.createRole(roleName);
            dispatch(addRoleSuccess(result.data));
            await dispatch(getRolesApi());
        } catch (err) {
            console.log(err);
        }
        await dispatch(setLoading({ isLoading: false }));
    };
};

export const updateRole = (roleDetail: { id: number; }) => {
    return async (dispatch: DispatchType) => {
        await dispatch(setLoading({ isLoading: true }));
        try {
            const result = await rolesService.editRole(roleDetail.id);
            dispatch(updateRoleSuccess({ id: roleDetail.id, updatedRole: result.data }));
        } catch (err) {
            console.log(err);
        }
        await dispatch(setLoading({ isLoading: false }));
    };
};
