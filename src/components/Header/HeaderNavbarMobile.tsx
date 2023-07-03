import {Button, Dropdown, MenuProps} from 'antd'
import React from 'react'
import {MoreOutlined, UserOutlined} from '@ant-design/icons';
import {useTranslation} from 'react-i18next'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/configStore';

type Props = {}

const HeaderNavbarMobile = (props: Props) => {
    const {userInfo} = useSelector((state: RootState) => state.userSlice)
    const {t} = useTranslation('header')

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (<NavLink className='block text-base py-1 ' to={'/account:id'}>{t('account')}</NavLink>),
        },
        {
            key: '2',
            label: (<NavLink className='block text-base py-1' to={'/premium'}><span>{t('premium')}: </span><span
                className='premium__type'>{userInfo?.userPremium.toLocaleUpperCase()}</span></NavLink>),
        },
        {
            key: '3',
            label: (<NavLink className='block text-base py-1' to={'/uploadexam'}>{t('upload exam')}</NavLink>),
        }, {
            key: '4',
            label: (<Button type='link' className='w-full text-left pl-0 text-base py-1'>{t('logout')}</Button>),
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
                        <Dropdown menu={{items}} placement="top">
                            <Button className='flex items-center py-5 w-full bg-sky-100'>
                                <div className='flex items-center'><UserOutlined/>
                                    <div className='text-base ml-2 font-bold'>{userInfo.userName}</div>
                                </div>
                                <div className='ml-auto'><MoreOutlined/></div>
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