/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Input, Popconfirm, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawerInfo } from '../../redux/reducers/drawer/drawerSlice';
import { setOptionSidebarAdmin } from '../../redux/reducers/menu/menuSlice';
import Constants from '../../constants/Constants';
import { useTranslation } from 'react-i18next';
import { getListArticlesAPI } from '../../redux/reducers/blog/blogSlice';
import AppConfigs from '../../config/AppConfigs';
import { BlogInfoModel } from '../../_core/Blog';
const AdminArticles = () => {
    const { blogs, pagination } = useSelector((state: RootState) => state.blogSlice)
    let [searchParam, setSearchParam] = useState({
        title: '',
        author: '',
        from_date: '',
        to_date: '',
        page_size: AppConfigs.pagination.DEFAULT_PAGE_SIZE,
        page_index: AppConfigs.pagination.DEFAULT_PAGE_INDEX,
        order_by: -1
    })
    const { t } = useTranslation('admin')

    const dispatch: DispatchType = useDispatch()
    useEffect(() => {
        dispatch(setOptionSidebarAdmin({ option: Constants.optionMenuAdmin.ARTICLES }))
        dispatch(getListArticlesAPI(searchParam))
    }, [searchParam])
    const columns: ColumnsType<BlogInfoModel> = [
        {
            title: t('thumbnail'),
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text, record, index) => {
                if (typeof record.image === 'string') {
                    return <img width={50} height={50} src={record.image} alt={record.title} />
                }
            }
        },
        {
            title: <div className='flex justify-between items-center'>
                <div>Title</div>
            </div>,
            dataIndex: 'title',
            key: 'title',
            render: (text) => <p>{text}</p>,
        },
        {
            title: <div className='flex justify-between items-center'>
                <div>Author</div>
            </div>,
            dataIndex: 'author',
            key: 'author',
            render: (text) => <p>{text}</p>,
        },
        {
            title: <div className='flex justify-between items-center'>
                <div>Content</div>
            </div>,
            dataIndex: 'content',
            key: 'content',
            render: (text) => <p>{text}</p>,
        },
        {
            title: t('action'),
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button className='btn_edit' onClick={async () => {
                        await dispatch(setDrawerInfo({
                            typeContent: Constants.typeDrawer.EDIT_ARTICLE,
                            sizeDrawer: Constants.sizeDrawer.NORMAL
                        }))
                    }}><EditOutlined className='text-base -translate-y-1 ' /></Button>
                    <Popconfirm
                        title="Delete the article"
                        description="Are you sure to delete this article?"
                        onConfirm={async () => {

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
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Article Management</h1>
            <div className='my-4 flex justify-between items-center'>
                <Button onClick={async () => {
                    await dispatch(setDrawerInfo({
                        typeContent: Constants.typeDrawer.CREATE_ARTICLE,
                        sizeDrawer: Constants.sizeDrawer.SMALL
                    }))
                }}>Add Article</Button>
                <Input
                    placeholder={t('search')}
                    size='large'
                    onChange={(event) => {
                        setTimeout(() => {

                        }, 1000)
                    }}
                    style={{ maxWidth: 400 }}
                    className='mx-4'
                />
            </div>
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={blogs}
                pagination={{
                    total: pagination.totals,
                    current: pagination.index,
                    onChange: async (page) => {
                        setSearchParam({ ...searchParam, page_index: page })
                        dispatch(getListArticlesAPI(searchParam))
                    }
                }} />
        </div>
    )
}

export default AdminArticles;
