import React,{useEffect} from 'react'
import { Select, Space, Button, Dropdown, Avatar, Badge, Popover } from 'antd';
import { DownOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/configStore';
import { useTranslation } from 'react-i18next'
import { setNotifyBadge, setNotifyReaded } from '../../redux/reducers/notification/notificationReducer';
type Props = {}

export default function HeaderTitle({ }: Props) {
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
        <NavLink to={'/premium'}><span>{t('premium')}: </span><span className='premium__type'>{userInfo?.userPremium.toLocaleUpperCase()}</span></NavLink>
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
        <Button type="link">{t('logout')}</Button>
      ),
    },
  ];
  let userRender = () => {
    if (userInfo) {
      return <Space>
        <span className='notification'>
          <Popover placement="bottomRight"
            title={
              <h1 className='p-2 border-b-2 m-0'>Thông báo mới nhận</h1>
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
                <BellOutlined className='text-xl -translate-y-1'  />
              </Badge>
            </span>
          </Popover>
        </span>
        <Dropdown menu={{ items }} placement="bottom">
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />{userInfo.userName}
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
  useEffect(()=>{
    let checkNewNotify=arrNotify.findIndex(noti=>noti.readStatus===false)
    if(checkNewNotify!==-1){
      dispatch(setNotifyBadge({status:true}))
    }else{
      dispatch(setNotifyBadge({status:false}))

    }
  },[])
  return (
    <div className='bg-slate-100'>
      <div className=' flex justify-between items-center  size__component py-3'>
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
    </div>

  )
}