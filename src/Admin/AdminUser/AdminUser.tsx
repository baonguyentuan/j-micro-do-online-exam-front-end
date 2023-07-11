import React from 'react';
import UserList from './UserList';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';

function AdminUser() {
  const { adminUser } = useSelector((state: RootState) => state.adminUserSlice)
  return (
    <>
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">User Management</h1>
      <UserList users={adminUser} />
    </>
  );
};

export default AdminUser;
