import React from 'react';
import { Avatar, Layout, Menu } from 'antd';
import { UserOutlined, AreaChartOutlined, TeamOutlined, LogoutOutlined, AppstoreAddOutlined, ApiFilled, GoldenFilled } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

interface SideBarProps {
  onSelectOption: (option: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onSelectOption }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const handleClick = (event: any) => {
    const option = event.key;
    onSelectOption(option);
  };

  return (
    <Sider>
      <div style={{ display: 'flex', alignItems: 'center', height: '64px', padding: '16px' }}>
        <Avatar style={{ marginRight: '10px' }} size="large" icon={<UserOutlined />} />
        <span style={{ color: '#fff', marginTop: '10px' }}>{user?.username}</span>
      </div>
      <Menu theme="dark" mode="inline" onClick={handleClick}>
        <Menu.Item key="report" icon={<AreaChartOutlined />}>Analytics</Menu.Item>
        <Menu.Item key="user-management" icon={<TeamOutlined />}>User Management</Menu.Item>
        <Menu.Item key="category" icon={<AppstoreAddOutlined />}>Category</Menu.Item>
        <Menu.Item key="role" icon={<GoldenFilled />}>Role</Menu.Item>
        <Menu.Item key="endpoint" icon={<ApiFilled />}>Endpoint</Menu.Item>
        <Menu.Item key="exam" icon={<AppstoreAddOutlined />}>Exam</Menu.Item>
        <Menu.Item key="contest" icon={<AppstoreAddOutlined />}>Contest</Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <NavLink to={'/login'}>Logout</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
