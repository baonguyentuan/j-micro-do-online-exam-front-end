import React, { useState } from 'react';
import { Layout, Space, Typography } from 'antd';
import SideBar from '../../components/SideBar/SideBar';
import AdminUser from '../AdminUser/AdminUser';
import Role from '../Role';

const { Content } = Layout;

type Option = {
  key: string;
  component: React.ReactNode;
};

const Admin: React.FC = () => {
  const options: Option[] = [
    { key: 'role', component: <Role /> },
    { key: 'user-management', component: <AdminUser /> }
  ];

  const [selectedOption, setSelectedOption] = useState<string>(options[0].key);

  const handleSelectOption = (optionKey: string) => {
    setSelectedOption(optionKey);
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
          {options.map((option) =>
            selectedOption === option.key && (
              <div key={option.key}>{option.component}</div>
            )
          )}
        </Content>

      </Layout>
    </Layout>
  );
};

export default Admin;
