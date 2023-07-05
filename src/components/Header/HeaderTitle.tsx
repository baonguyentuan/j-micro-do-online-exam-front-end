import React, { useEffect, useState } from 'react'
import { Select, Space, Button, Dropdown, Avatar, Badge, Popover, Drawer } from 'antd';
import { DownOutlined, UserOutlined, BellOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/configStore';
import { useTranslation } from 'react-i18next'
import { setNotifyBadge, setNotifyReaded } from '../../redux/reducers/notification/notificationSlice';
import HeaderNavbarMobile from './HeaderNavbarMobile';
type Props = {}

export default function HeaderTitle({ }: Props) {
  let [openMenu, setOpenMenu] = useState(false)
  const { haveNewNotify, arrNotify } = useSelector((state: RootState) => state.notificationSlice)
  const { userInfo } = useSelector((state: RootState) => state.userSlice)
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation('header')
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavLink to={'/account:id'}>{t('account')}</NavLink>
      ),
    },
    {
      key: '2',
      label: (
        <NavLink to={'/premium'}><span>{t('premium')}: </span><span className='premium__type'>{userInfo?.roles?.find(roleItem => roleItem === 'USER_PREMIUM' || roleItem === "ADMIN") ? "PREMIUM" : "FREE"}</span></NavLink>
      ),
    },
    {
      key: '3',
      label: (
        <NavLink to={'/uploadexam'}>{t('upload exam')}</NavLink>
      ),
    },
    {
      key: '4',
      label: (
        <NavLink to={'/login'}>{t('logout')}</NavLink>
      ),
    },
  ];
  let userRender = () => {
    if (userInfo) {
      return <Space>
        <span className='notification'>
          <Popover placement="bottom"
            title={
              <h1 className='p-2 border-b-2 m-0 '>Thông báo mới nhận</h1>
            }
            content={
              <div className='notification__list'>
                <ul className='border-b-2 p-0 m-0'>
                  {arrNotify.map((notifyItem, index) => {
                    return <li key={notifyItem.id} className={`notify__item ${notifyItem.readStatus ? '' : 'unreaded'}`} onClick={() => {
                      dispatch(setNotifyReaded({ notify: notifyItem }))
                    }}>{notifyItem.message}</li>
                  })}
                </ul>
                <NavLink className='block text-center p-2' to={'/home'}>Xem tất cả</NavLink>
              </div>
            } trigger="hover">
            <span className='p-2' onMouseEnter={() => {
              setTimeout(() => {
                dispatch(setNotifyBadge({ status: false }))
              }, 1500)
            }
            }>
              <Badge dot={haveNewNotify} size='default'>
                <BellOutlined className='text-xl -translate-y-1' />
              </Badge>
            </span>
          </Popover>
        </span>
        <Dropdown className='lg:block hidden' menu={{ items }} placement="bottom">
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar shape="square" size="small" icon={<UserOutlined />} /><span>{userInfo.username}</span>
              <DownOutlined className='-translate-y-1' />
            </Space>
          </a>
        </Dropdown>
      </Space>

    } else {
      return <NavLink to={'/login'}>{t('signin')}</NavLink>
    }

  }
  const handleChange = (value: string) => {
    i18n.changeLanguage(value)
  };
  window.addEventListener("beforeunload", function (e) {
    console.log(e);

  })
  useEffect(() => {
    let checkNewNotify = arrNotify.findIndex(noti => noti.readStatus === false)
    if (checkNewNotify !== -1) {
      dispatch(setNotifyBadge({ status: true }))
    } else {
      dispatch(setNotifyBadge({ status: false }))

    }
  }, [])
  return (
    <div className='bg-slate-100'>
      <div className=' flex justify-between items-center  size__component py-3'>
        <Button className='inline-block lg:hidden' onClick={() => {
          setOpenMenu(true)
        }}><MenuOutlined className='-translate-y-1' /></Button>
        <NavLink to={'/'}>Logo</NavLink>
        <div >
          <Space>
            {userRender()}
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
        </div>
      </div>
      <Drawer
        className='max-w-sm'
        title={<div className='flex justify-between items-center'>
          <NavLink to={'/'}>Logo</NavLink>
          <Button className='h-auto py-1 px-2' onClick={() => {
            setOpenMenu(false)
          }}><CloseOutlined className='-translate-y-1 text-xl' /></Button>
        </div>}
        placement="left"
        closable={false}
        onClose={() => {
          setOpenMenu(false)
        }} open={openMenu}>
        <div>
          <HeaderNavbarMobile />
        </div>
      </Drawer>
    </div>

  )
}