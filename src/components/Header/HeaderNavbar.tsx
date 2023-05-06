import React from 'react'
import { Button } from 'antd';
import '../../assets/css/header/header.css'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
type Props = {}

export default function HeaderNavbar({ }: Props) {
    const {t}=useTranslation('header')
    return (
        <div>
            <div className=' flex items-center  size__component py-3 '>
                <NavLink to={'/home'} className='btn__navbar btn__navbar__active'>{t('home')}</NavLink>
                <NavLink to={'/trainingcourse'} className='btn__navbar' >{t('trainingCourse')}</NavLink>
                <NavLink to={'/contact'} className='btn__navbar'>{t('contact')}</NavLink>
                <NavLink to={'/blog'} className='btn__navbar'>{t('blog')}</NavLink>
            </div>
        </div>
    )
}