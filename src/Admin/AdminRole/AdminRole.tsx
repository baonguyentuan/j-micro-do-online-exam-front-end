import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constants from '../../constants/Constants';
import { DispatchType, RootState } from '../../redux/configStore';
import { setOptionSidebarAdmin } from '../../redux/reducers/menu/menuSlice';
import { getRolesApi } from '../../redux/reducers/role/roleSlice';
import Roles from './components/Roles';

function AdminRole() {
    const roles = useSelector((state: RootState) => state.roleSlice.data);
    let dispatch: DispatchType = useDispatch()
    useEffect(() => {
        dispatch(getRolesApi());
        dispatch(setOptionSidebarAdmin({ option: Constants.optionMenuAdmin.AUTH.ROLE }))
    }, []);

    return (
        <div>
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Roles Management</h1>
            <Roles roles={roles} />
        </div>
    );
}
export default AdminRole;
