import React, { useState, useEffect } from 'react';
import { Avatar, Layout, Select, Space } from 'antd';
import SideBar from '../components/SideBar/SideBar';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../redux/configStore';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/css/admin/admin.css'
import { useTranslation } from 'react-i18next';
import { getUserInfo } from '../redux/reducers/user/userSlice';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';
import Constants from '../constants/Constants';
import AppRoutes from '../constants/AppRoutes';
const { Header, Content } = Layout;
const AdminLayout: React.FC = () => {
  let { userInfo } = useSelector((state: RootState) => state.userSlice)
  let navigate = useNavigate()
  const dispatch: DispatchType = useDispatch()
  const { t, i18n } = useTranslation('header')
  const handleChange = (value: string) => {
    i18n.changeLanguage(value)
  };
  useEffect(() => {

    if (getLocalStorage(Constants.localStorageKey.account) === "ADMIN" && getLocalStorage(Constants.localStorageKey.accessToken) !== null) {
      dispatch(getUserInfo())
      setLocalStorage(Constants.localStorageKey.status, true)
    } else {
      navigate(AppRoutes.public.home)
    }

  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className='flex justify-end'>
        <Space >
          <div className='flex items-center'>
            <Avatar className='border-2 border-white mr-4' size="large" icon={<UserOutlined />} />
            <span className='text-white'>{userInfo?.username}</span>
          </div>
          <Select
            defaultValue="vn"
            style={{ width: 70 }}
            onChange={handleChange}
            options={[
              { value: 'vn', label: 'VNI' },
              { value: 'en', label: 'ENG' },
            ]}
          />
        </Space>

      </Header>
      <Layout hasSider className="site-layout">
        <SideBar />
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
      </Layout>

    </Layout>
  );
};

export default AdminLayout;
