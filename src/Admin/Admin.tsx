import React, { useState } from 'react';
import { Layout, Space, Typography } from 'antd';
import SideBar from '../components/SideBar/SideBar';
import AdminUser from './AdminUser/AdminUser';
import AdminCategory from './AdminCategory';
import { PropsDrawerModifierModel } from '../_core/DrawerModel';
import DrawerModifier from '../components/Drawer/DrawerModifier';
import Role from './AdminRole';
import AdminEndpoint from './AdminEndpoint';

const { Content } = Layout;

const Admin: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('user-management');
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar onSelectOption={handleSelectOption} />
      <Layout className="site-layout">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{
            width: "100%",
            height: "7vh",
            background: '#031529',
            padding: 24,
          }}>
            <Typography.Title
              level={4}
              style={{
                color: 'white',
                width: '100%',
                textAlign: 'right'
              }}
            >
              Welcome to the admin page
            </Typography.Title>
          </div>
        </Space>
        <Content style={{ margin: '16px' }}>
          {selectedOption === 'user-management' && <AdminUser />}
          {selectedOption === 'category' && <AdminCategory />}
          {selectedOption === 'role' && <Role />}
          {selectedOption === 'endpoint' && <AdminEndpoint />}
        </Content>
      </Layout>
      <DrawerModifier />
    </Layout>
  );
};

export default Admin;
