import { Avatar, Button } from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';

type Props = {}

const HeaderNavbarMobile = (props: Props) => {
    const { userInfo } = useSelector((state: RootState) => state.userSlice)
    const { t } = useTranslation('header')
    let userRender = () => {
        if (userInfo) {
            return <div>
                <p className='flex items-center'>
                    <Avatar shape="square" size="small" icon={<UserOutlined />} />
                    <span className='text-base ml-2'>{userInfo.userName}</span>
                </p>
                <div className='pl-4'>
                    <NavLink className='block text-base py-1 ' to={'/account:id'}>{t('account')}</NavLink>
                    <NavLink className='block text-base py-1' to={'/premium'}><span>{t('premium')}: </span><span className='premium__type'>{userInfo?.userPremium.toLocaleUpperCase()}</span></NavLink>
                    <NavLink className='block text-base py-1' to={'/uploadexam'}>{t('upload exam')}</NavLink>
                    <Button type='link' className='w-full text-left pl-0 text-base py-1'>{t('logout')}</Button>
                </div>
            </div>

        } else {
            return <div>
<NavLink to={'/login'} className='block text-base py-1 font-semibold'>{t('signin')}</NavLink>
            <NavLink to={'/register'} className='block text-base py-1 font-semibold'>{t('signup')}</NavLink>
            </div>
        }

    }
    return (
        <div>
            {userRender()}
            <NavLink to={'/home'} className='block text-base py-1 font-semibold'>{t('home')}</NavLink>
            <NavLink to={'/trainingcourse'} className='block text-base py-1 font-semibold' >{t('trainingCourse')}</NavLink>
            <NavLink to={'/contact'} className='block text-base py-1 font-semibold'>{t('contact')}</NavLink>
            <NavLink to={'/blog'} className='block text-base py-1 font-semibold'>{t('blog')}</NavLink>
        </div>
    )
}

export default HeaderNavbarMobile