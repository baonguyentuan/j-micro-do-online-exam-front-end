import React from 'react'
import {useTranslation} from 'react-i18next';
import {Button, Form, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {NavLink} from 'react-router-dom';
import '../../assets/css/header/header.css'
import AppRoutes from "../../constants/AppRoutes";

const { Search } = Input;
type Props = {}

export default function HeaderNavbar({ }: Props) {
    const { t } = useTranslation('header')
    const onSearch = (value: string) => console.log(value);
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <div>
            <div className=' flex items-center size__component mt-5 my-10 py-3'>
                <div className=' hidden lg:inline-block' >
                    <NavLink to={AppRoutes.public.home} className='btn__navbar btn__navbar__active'>{t('home')}</NavLink>
                    <NavLink to={AppRoutes.public.courses} className='btn__navbar' >{t('trainingCourse')}</NavLink>
                    <NavLink to={AppRoutes.public.contact} className='btn__navbar'>{t('contact')}</NavLink>
                    <NavLink to={AppRoutes.public.blog} className='btn__navbar'>{t('blog')}</NavLink>
                </div>

                <Form className='m-0 lg:m-auto flex-1'>
                    <Search
                        placeholder={t('input contest id or contest name')}
                        allowClear
                        enterButton={<Button><SearchOutlined className='-translate-y-1' /></Button>}
                        size="large"
                        onSearch={onSearch}
                    />
                </Form>
            </div>
        </div>

    )
}