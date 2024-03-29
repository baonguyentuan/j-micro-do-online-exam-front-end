import React, { useEffect, useState } from 'react'
import { Button, Input, Popconfirm, Space, Table } from 'antd'
import { CaretUpOutlined, CaretDownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCategoryApi,
  getCategoryByConditionApi,
  getCategoryDetailApi,
  getCurrentCategory,
  setCurrentFilter,
} from '../../redux/reducers/category/categorySlice';
import { CategoryDetailModel, defaultCategoryDetail, defaultCategoryGet } from '../../_core/CategoryModel';
import dayjs from 'dayjs';
import { setDrawerInfo } from '../../redux/reducers/drawer/drawerSlice';
import { setOptionSidebarAdmin } from '../../redux/reducers/menu/menuSlice';
import Constants from '../../constants/Constants';
import { useTranslation } from 'react-i18next';
const AdminCategory = () => {
  let { lstCategory, currentFilterCategory, pagination } = useSelector((state: RootState) => state.categorySlice)
  let [nameFilter, setNameFilter] = useState(true)
  let [createAtFilter, setCreateAtFilter] = useState(true)
  let { t } = useTranslation('admin')

  const dispatch: DispatchType = useDispatch()
  useEffect(() => {
    dispatch(getCategoryByConditionApi(defaultCategoryGet))
    dispatch(setOptionSidebarAdmin({ option: Constants.optionMenuAdmin.CATEGORY }))
  }, [])
  const columns: ColumnsType<CategoryDetailModel> = [
    {
      title: t('thumbnail'),
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text, record, index) => {
        if (typeof record.thumbnail === 'string') {
          return <img width={50} height={50} src={record.thumbnail} alt={record.name} />
        }
      }
    },
    {
      title: <div className='flex justify-between items-center'>
        <div>{t('name')}</div>
        <div>
          <Button type='link' className={`${nameFilter ? 'hidden' : ''}`} onClick={async () => {
            await setNameFilter(!nameFilter)
            await dispatch(getCategoryByConditionApi({ ...currentFilterCategory, order_by: 7 }))
          }}><CaretUpOutlined className='text-base -translate-y-1 ' /></Button>
          <Button type='link' className={`${!nameFilter ? 'hidden' : ''}`} onClick={async () => {
            await setNameFilter(!nameFilter)
            await dispatch(getCategoryByConditionApi({ ...currentFilterCategory, order_by: 8 }))
          }}><CaretDownOutlined className='text-base -translate-y-1 ' /></Button>
        </div>
      </div>,
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: <div className='flex justify-between items-center'>
        <div>{t('create at')}</div>
        <div>
          <Button type='link' className={`${createAtFilter ? 'hidden' : ''}`} onClick={async () => {
            await setCreateAtFilter(!createAtFilter)
            await dispatch(getCategoryByConditionApi({ ...currentFilterCategory, order_by: 5 }))
          }}><CaretUpOutlined className='text-base -translate-y-1 ' /></Button>
          <Button type='link' className={`${!createAtFilter ? 'hidden' : ''}`} onClick={async () => {
            await setCreateAtFilter(!createAtFilter)
            await dispatch(getCategoryByConditionApi({ ...currentFilterCategory, order_by: 6 }))
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
      title: t('action'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button className='btn_edit' onClick={async () => {
            await dispatch(getCategoryDetailApi(record.id))
            await dispatch(setDrawerInfo({
              typeContent: 'updateCategory',
              sizeDrawer: Constants.sizeDrawer.SMALL
            }))
          }}><EditOutlined className='text-base -translate-y-1 ' /></Button>
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            onConfirm={async () => {
              await dispatch(deleteCategoryApi(record.id))
            }}
            okType='danger'
            okText="Yes"
            cancelText="No">
            <Button className='btn_delete'><DeleteOutlined className='text-base -translate-y-1 ' /></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">{t('category management')}</h1>
      <div className='my-4 flex justify-between items-center'>
        <Button onClick={async () => {
          await dispatch(getCurrentCategory({ categoryDetail: { ...defaultCategoryDetail } }))
          await dispatch(setDrawerInfo({
            typeContent: 'createCategory', sizeDrawer: Constants.sizeDrawer.SMALL
          }))
        }}>{t('add category')}</Button>
        <Input
          placeholder={t('search')}
          size='large'
          onChange={(event) => {
            setTimeout(() => {
              dispatch(getCategoryByConditionApi({ ...defaultCategoryGet, name: event.target.value }))
            }, 1000)
          }} style={{ maxWidth: 400 }} className='mx-4' />
        <p className='mx-4 font-bold text-blue-600 text-base'><span>{t('total')}: </span><span>{pagination?.totals}</span></p>
      </div>
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={lstCategory}
        pagination={{
          total: pagination.totals,
          current: pagination.index,
          onChange: (page) => {
            let currentFilter = { ...currentFilterCategory, page_index: page }
            dispatch(getCategoryByConditionApi(currentFilter))
            dispatch(setCurrentFilter({ filterOption: currentFilter }))
          }
        }} />
    </div>
  )
}

export default AdminCategory