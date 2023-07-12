import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { AreaChartOutlined, TeamOutlined, LogoutOutlined, AppstoreOutlined, FileOutlined, BookOutlined, ApiFilled, GoldenFilled  } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import Constants from '../../constants/Constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';


const { Sider } = Layout;


const SideBar: React.FC = () => {
  let {optionSidebarAdmin}=useSelector((state:RootState)=>state.menuSlice)
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider theme='dark' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu selectedKeys={[optionSidebarAdmin]}  theme="dark" mode="inline" >
        <Menu.Item key="report" icon={<AreaChartOutlined />}>Analytics</Menu.Item>
        <Menu.Item key={Constants.optionMenuAdmin.USER} icon={<TeamOutlined />}>
          <NavLink to={'/admin/admin_user'}>User Management</NavLink></Menu.Item>
        <Menu.Item key={Constants.optionMenuAdmin.CATEGORY} icon={<AppstoreOutlined />}>
          <NavLink to={'/admin/admin_category'}>Category</NavLink></Menu.Item>
        <Menu.Item key={Constants.optionMenuAdmin.ROLE} icon={<GoldenFilled />}>
          <NavLink to={'/admin/admin_role'}>Role</NavLink>
        </Menu.Item>
        <Menu.Item key={Constants.optionMenuAdmin.ENDPOINT} icon={<ApiFilled />}><NavLink to={'/admin/admin_endpoint'}>Endpoint</NavLink></Menu.Item>
        <Menu.Item key={Constants.optionMenuAdmin.EXAM} icon={<FileOutlined />}><NavLink to={'/admin/admin_exam'}>Exam</NavLink></Menu.Item>
        <Menu.Item key={Constants.optionMenuAdmin.CONTEST} icon={<BookOutlined />}><NavLink to={'/admin/admin_contest'}>Contest</NavLink></Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <NavLink to={'/login'}>Logout</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
