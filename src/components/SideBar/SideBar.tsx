import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { AreaChartOutlined, TeamOutlined, LogoutOutlined, AppstoreOutlined, FileOutlined, BookOutlined, ApiFilled, GoldenFilled } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import Constants from '../../constants/Constants';
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import AppRoutes from '../../constants/AppRoutes';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducers/userTest/userSlice';
import { postLogout } from '../../redux/reducers/auth';
import { getLocalStorage } from '../../utils/local-storage';


const { Sider } = Layout;


const SideBar: React.FC = () => {
  let { optionSidebarAdmin } = useSelector((state: RootState) => state.menuSlice)
  const dispatch:DispatchType=useDispatch()
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider theme='dark' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu selectedKeys={[optionSidebarAdmin]} theme="dark" mode="inline" >
        <Menu.Item key="report" icon={<AreaChartOutlined />}>Analytics</Menu.Item>
        <Menu.Item key={Constants.optionMenuAdmin.USER} icon={<TeamOutlined />}>
          <NavLink to={AppRoutes.private.admin.user}>User Management</NavLink></Menu.Item>
        <Menu.Item key={Constants.optionMenuAdmin.CATEGORY} icon={<AppstoreOutlined />}>
          <NavLink to={AppRoutes.private.admin.category}>Category</NavLink></Menu.Item>
        <Menu.SubMenu key="auth-submenu" title="Auth" icon={<GoldenFilled />}>
          <Menu.Item key={Constants.optionMenuAdmin.AUTH.ROLE}><NavLink to={AppRoutes.private.admin.role}>Role</NavLink></Menu.Item>
          <Menu.Item key={Constants.optionMenuAdmin.AUTH.ENDPOINT}><NavLink to={AppRoutes.private.admin.endpoint}>Endpoint</NavLink></Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key={Constants.optionMenuAdmin.ARTICLES} icon={<FileOutlined />}><NavLink to={AppRoutes.private.admin.article}>Articles</NavLink></Menu.Item>
        <Menu.Item key={Constants.optionMenuAdmin.EXAM} icon={<FileOutlined />}><NavLink to={AppRoutes.private.admin.exam}>Exam</NavLink></Menu.Item>
        <Menu.Item key={Constants.optionMenuAdmin.CONTEST} icon={<BookOutlined />}><NavLink to={AppRoutes.private.admin.contest}>Contest</NavLink></Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <p onClick={()=>{
            dispatch(postLogout({ clientID: getLocalStorage(Constants.localStorageKey.userID) }))
          }}>Logout</p>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
