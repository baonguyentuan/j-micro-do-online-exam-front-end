import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { Button, Input, Space, Table, Tag, DatePicker } from 'antd';
import Constants from '../../constants/Constants';
import { useTranslation } from 'react-i18next';
import { UserInfoModel } from '../../_core/UserModel';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { getLstUserApi } from '../../redux/reducers/user/userSlice';
const { RangePicker } = DatePicker;
function AdminUser() {
  const { lstUsers, pagination } = useSelector((state: RootState) => state.userSlice)
  console.log(lstUsers);

  let [nameFilter, setNameFilter] = useState<boolean>(true)
  let [createAtFilter, setCreateAtFilter] = useState<boolean>(true)
  const dispatch: DispatchType = useDispatch()
  let [searchParams, setSearchParams] = useState({
    username: Constants.EmptyString,
    from_date: Constants.EmptyString,
    to_date: Constants.EmptyString,
    page_index: 1,
    page_size: 10,
    order_by: -1
  })
  let { t } = useTranslation('user')
  const columns: ColumnsType<UserInfoModel> = [
    {
      title: t('image'),
      dataIndex: 'image',
      key: 'image',
      render: (text, record, index) => {
        return <img width={50} height={50} src={record.image} />
      }
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <div className='flex justify-between items-center'>
        <div>{t('username')}</div>
        <div>
          <Button type='link' className={`${nameFilter ? 'hidden' : ''}`} onClick={async () => {
            await setNameFilter(!nameFilter)
            setSearchParams({ ...searchParams, order_by: 7, page_index: 1 })
          }}><CaretUpOutlined className='text-base -translate-y-1 ' /></Button>
          <Button type='link' className={`${!nameFilter ? 'hidden' : ''}`} onClick={async () => {
            await setNameFilter(!nameFilter)
            setSearchParams({ ...searchParams, order_by: 8, page_index: 1 })
          }}><CaretDownOutlined className='text-base -translate-y-1 ' /></Button>
        </div>
      </div>,
      dataIndex: 'username',
      key: 'username',
      render: (text) => <p>{text}</p>,
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('address'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t('birthday'),
      dataIndex: 'birthday',
      key: 'birthday',
      render: (text, record, index) => {
        return <p>{text === null ? '' : dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</p>
      }
    },
    {
      title: <div className='flex justify-between items-center'>
        <div>{t('created_at')}</div>
        <div>
          <Button type='link' className={`${createAtFilter ? 'hidden' : ''}`} onClick={async () => {
            await setCreateAtFilter(!createAtFilter)
            setSearchParams({ ...searchParams, order_by: 3, page_index: 1 })
          }}><CaretUpOutlined className='text-base -translate-y-1 ' /></Button>
          <Button type='link' className={`${!createAtFilter ? 'hidden' : ''}`} onClick={async () => {
            await setCreateAtFilter(!createAtFilter)
            setSearchParams({ ...searchParams, order_by: 4, page_index: 1 })
          }}><CaretDownOutlined className='text-base -translate-y-1 ' /></Button>
        </div>
      </div>,
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text, record, index) => {
        return <p>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</p>
      }
    },
    {
      title: t('roles'),
      key: 'roles',
      render: (text, record, index) => {
        return <Space>{record.roles.map((roleItem, index) => {
          return <Tag key={index} color='magenta'>{roleItem}</Tag>
        })}</Space>
      },
    },
  ];
  useEffect(() => {
    dispatch(getLstUserApi(searchParams))
  }, [searchParams])
  return (
    <div>
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">{t('user Management')}</h1>
      <div className='my-4 flex justify-between items-center'>
        <Input
          placeholder={t('search')}
          size='large'
          onChange={(event) => {
            setTimeout(() => {
              setSearchParams({ ...searchParams, username: event.target.value, page_index: 1 })
            }, 1000)
          }} style={{ maxWidth: 400 }} className='mp-4' />
        {/* <RangePicker
          allowClear
          showTime={{ format: 'HH:mm:ss' }}
          format="YYYY-MM-DD HH:mm:ss"
          onOk={(time) => {
            if (time?.findIndex(timeItem => timeItem === null) === -1) {
              setSearchParams({ ...searchParams, from_date: dayjs(time[0]).format("YYYY-MM-DD HH:mm:ss"), to_date: dayjs(time[1]).format("YYYY-MM-DD HH:mm:ss"), page_index: 1 })
            }
          }}
        /> */}
        <p className='mx-4 font-bold text-blue-600 text-base'><span>{t('total')}: </span><span>{pagination.totals}</span></p>
      </div>
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={lstUsers}
        pagination={{
          total: pagination.totals,
          current: pagination.index,
          onChange: (page) => {
            setSearchParams({ ...searchParams, page_index: page })
          }
        }}
      />
    </div>
  );
};

export default AdminUser;

