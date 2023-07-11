import React,{useEffect} from 'react';
import UserList from './UserList';
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../../redux/configStore';
import { useDispatch } from 'react-redux';
import { setOptionSidebarAdmin } from '../../../redux/reducers/menu/menuSlice';
import Constants from '../../../constants/Constants';
import { Button } from 'antd';
import { getCategoryByConditionApi } from '../../../redux/reducers/category/categorySlice';
import { defaultCategoryGet } from '../../../_core/CategoryModel';

function AdminUser () {
  const { adminUser } = useSelector((state: RootState) => state.adminUserSlice)
  const dispatch:DispatchType=useDispatch()
  useEffect(()=>{
    dispatch(setOptionSidebarAdmin({option:Constants.optionMenuAdmin.USER}))
  },[])
  return (
    <>
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">User Management</h1>
      <UserList users={adminUser} />
    </>
  );
};

export default AdminUser;
