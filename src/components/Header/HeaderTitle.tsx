import React from 'react'
import { Select, Space, Button,Dropdown,Avatar } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
type Props = {}

export default function HeaderTitle({ }: Props) {
  const user = useSelector((state: RootState) => state.user)
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavLink to={'/account:id'}>Account</NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <NavLink to={'/premium'}>Type:Free</NavLink>
      ),
    },
    {
      key: '3',
      label: (
        <NavLink to={'/uploadexam'}>Upload exam</NavLink>
      ),
    },
    {
      key: '4',
      label: (
        <Button type="link">Log Out</Button>
      ),
    },
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className='bg-slate-100'>
      <div className=' flex justify-between items-center  size__component py-3'>
        <NavLink to={'/'}>Logo</NavLink>

        <div >
          <Space>
            <NavLink to={'/login'}>Log in </NavLink>
            {/* <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                <Avatar shape="square" size="small" icon={<UserOutlined />} />{user}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown> */}
            <Select
              defaultValue="vni"
              style={{ width: 70 }}
              onChange={handleChange}
              options={[
                { value: 'vni', label: 'VNI' },
                { value: 'eng', label: 'ENG' },
                { value: 'chi', label: 'CHI' }
              ]}
            />
          </Space>
        </div>
      </div>
    </div>

  )
}