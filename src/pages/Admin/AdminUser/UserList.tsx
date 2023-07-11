import React, { useEffect, useState } from 'react';
import { IUser } from '../../../_core/AdminUser';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PopupEditUser from './ModelEditUser';
import PopupDeleteUser from './ModalDeleteUser';
import { Button, Input, Pagination } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
    users: IUser[],
}

function UserList({ users }: Props) {
    const {t}=useTranslation('adminUser');
    const [editingUser, setEditingUser] = useState<IUser | null>(null);
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
    const [updateUser, setUpdateUser] = useState<IUser[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalUsers = users.length;
    const [displayedUsers, setDisplayedUsers] = useState<IUser[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = users.filter((user) =>
            user.username.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setDisplayedUsers(updateUser.slice(startIndex, endIndex));
    }, [currentPage, pageSize, updateUser]);

    useEffect(() => {
        setUpdateUser(users);
    }, [users]);

    const handleOpenEditPopup = (user: IUser) => {
        setEditingUser(user);
    };

    const handleCloseEditPopup = () => {
        setEditingUser(null);
    };

    const handleOpenDeletePopup = (userId: number) => {
        setDeletingUserId(userId);
    };

    const handleCloseDeletePopup = () => {
        setDeletingUserId(null);
    };

    const handleSaveUser = (updatedUser: IUser) => {
        const updatedUsers = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
        setEditingUser(null);
        // Cập nhật danh sách users mới vào state
        setUpdateUser(updatedUsers);
    };

    const handleClickView = (userId: number) => {
        console.log(`View user with id ${userId}`);
    };

    return (
        <div className="px-4 py-8">
            <div className="flex justify-end items-center mb-4">
                <Input
                    placeholder={t('search_username')}
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: 200 }}
                />
            </div>

            <table className="w-full table-fixed shadow-lg rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/12 px-4 py-2 text-center">{t('id')}</th>
                        <th className="w-1/12 px-4 py-2">{t('avatar')}</th>
                        <th className="w-3/12 px-4 py-2 text-center">{t('username')}</th>
                        <th className="w-2/12 px-4 py-2">{t('email')}</th>
                        <th className="w-1/12 px-4 py-2 text-center">{t('account_type')}</th>
                        <th className="w-2/12 px-4 py-2 text-center">{t('created_at')}</th>
                        <th className="w-2/12 px-4 py-2">{t('action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {(searchTerm ? filteredUsers : displayedUsers).map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2 text-center">{user.id}</td>
                            <td className="px-4 py-2">
                                <img src={user.avata} alt={`${user.username} Avatar`} className="h-15 w-15 rounded-full mx-auto" />
                            </td>
                            <td className="px-4 py-2 text-center">{user.username}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2 text-center">{user.accountType}</td>
                            <td className="px-4 py-2 text-center">{user.created_at}</td>
                            <td className="px-4 py-2 flex justify-center items-center space-x-4 mt-2.5">
                                <Button icon={<EyeOutlined />} className="flex items-center justify-center width-50 height-50 bg-green-500 rounded-md text-white" onClick={() => handleClickView(user.id)} />
                                <Button icon={<EditOutlined />} className="flex items-center justify-center width-50 height-50 bg-yellow-400 rounded-md text-blue-600" onClick={() => handleOpenEditPopup(user)} />
                                <Button icon={<DeleteOutlined />} className="flex items-center justify-center width-50 height-50 bg-red-600 rounded-md text-black" onClick={() => handleOpenDeletePopup(user.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-5'>
                <Pagination
                    total={totalUsers}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={pageSize}
                    defaultCurrent={currentPage}
                    onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                    }}
                />
            </div>

            <PopupEditUser editingUser={editingUser} onClose={handleCloseEditPopup} onSave={handleSaveUser} />
            <PopupDeleteUser deletingUserId={deletingUserId} onClose={handleCloseDeletePopup} />
        </div>
    );
};

export default UserList;
