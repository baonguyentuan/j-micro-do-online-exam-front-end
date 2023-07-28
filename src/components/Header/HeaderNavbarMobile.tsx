import { Button, Dropdown, MenuProps } from 'antd'
import React from 'react'
import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { postLogout } from '../../redux/reducers/auth';
import { getLocalStorage } from '../../utils/local-storage';
import Constants from '../../constants/Constants';
import AppRoutes from '../../constants/AppRoutes';

type Props = {}

const HeaderNavbarMobile = (props: Props) => {
    const { userInfo } = useSelector((state: RootState) => state.userSlice)
    const dispatch: DispatchType = useDispatch();
    const { t } = useTranslation('header')
    const handleLogout = () => {
        dispatch(postLogout({ clientID: getLocalStorage(Constants.localStorageKey.userID) }))
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (<NavLink className='block text-base py-1 ' to={AppRoutes.private.user.account}>{t('account')}</NavLink>),
        },
        {
            key: '2',
            label: (<NavLink className='block text-base py-1' to={'/premium'}><span>{t('premium')}: </span><span
                className='premium__type'>{userInfo?.roles?.find(roleItem => roleItem === 'USER_PREMIUM' || roleItem === "ADMIN") ? "PREMIUM" : "FREE"}</span></NavLink>),
        },
        {
            key: '3',
            label: (<NavLink className='block text-base py-1' to={AppRoutes.private.user.create_exam}>{t('upload exam')}</NavLink>),
        }, {
            key: '4',
            label: (<Button type='link' className='w-full text-left pl-0 text-base py-1' onClick={handleLogout}>{t('logout')}</Button>),
        },
    ];
    return (
        <div className='flex flex-col h-full'>
            <div className='flex flex-col gap-3'>
                <NavLink to={'/home'} className='block text-xl py-1 font-semibold'>{t('home')}</NavLink>
                <NavLink to={'/trainingcourse'}
                    className='block text-xl py-1 font-semibold'>{t('trainingCourse')}</NavLink>
                <NavLink to={'/contact'} className='block text-xl py-1 font-semibold'>{t('contact')}</NavLink>
                <NavLink to={'/blog'} className='block text-xl py-1 font-semibold'>{t('blog')}</NavLink>
            </div>
            <div className='mt-auto'>
                {
                    userInfo ? <div>
                        <Dropdown menu={{ items }} placement="top">
                            <Button className='flex items-center py-5 w-full bg-sky-100'>
                                <div className='flex items-center'><UserOutlined />
                                    <div className='text-base ml-2 font-bold'>{userInfo.username}</div>
                                </div>
                                <div className='ml-auto'><MoreOutlined /></div>
                            </Button>
                        </Dropdown>
                    </div> : (<div>
                        <NavLink to={'/login'} className='block text-xl py-1 font-semibold'>{t('signin')}</NavLink>
                        <NavLink to={'/register'} className='block text-xl py-1 font-semibold'>{t('signup')}</NavLink>
                    </div>)
                }
            </div>
        </div>
    )
}

export default HeaderNavbarMobile