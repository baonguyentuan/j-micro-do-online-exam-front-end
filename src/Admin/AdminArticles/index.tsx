import React, { useEffect } from 'react'
import { Button, Input, Popconfirm, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
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
import { setDrawerInfo } from '../../redux/reducers/drawer/drawerSlice';
import { setOptionSidebarAdmin } from '../../redux/reducers/menu/menuSlice';
import Constants from '../../constants/Constants';
import { useTranslation } from 'react-i18next';
const AdminArticles = () => {
    const { lstCategory, currentFilterCategory, pagination } = useSelector((state: RootState) => state.categorySlice)
    const { t } = useTranslation('admin')

    const dispatch: DispatchType = useDispatch()
    useEffect(() => {
        dispatch(getCategoryByConditionApi(defaultCategoryGet))
        dispatch(setOptionSidebarAdmin({ option: Constants.optionMenuAdmin.ARTICLES }))
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
            title:
                <div className='flex justify-between items-center'>
                    <div>Title</div>
                </div>,
            dataIndex: 'title',
            key: 'title',
            render: (title) => <p>{title}</p>,
        },
        {
            title:
                <div className='flex justify-between items-center'>
                    <div>Author</div>
                </div>,
            dataIndex: 'author',
            key: 'author',
            render: (author) => <p>{author}</p>,
        },
        {
            title:
                <div className='flex justify-between items-center'>
                    <div>Content</div>
                </div>,
            dataIndex: 'content',
            key: 'content',
            render: (content) => <p>{content}</p>,
        },
        {
            title: t('action'),
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button className='btn_edit' onClick={async () => {
                        await dispatch(getCategoryDetailApi(record.id))
                        await dispatch(setDrawerInfo({
                            typeContent: 'updateArticle',
                            sizeDrawer: Constants.sizeDrawer.SMALL
                        }))
                    }}><EditOutlined className='text-base -translate-y-1 ' /></Button>
                    <Popconfirm
                        title="Delete the article"
                        description="Are you sure to delete this article?"
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
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Article Management</h1>
            <div className='my-4 flex justify-between items-center'>
                <Button onClick={async () => {
                    await dispatch(getCurrentCategory({ categoryDetail: { ...defaultCategoryDetail } }))
                    await dispatch(setDrawerInfo({
                        typeContent: 'createArticle',
                        sizeDrawer: Constants.sizeDrawer.SMALL
                    }))
                }}>Add Article</Button>
                <Input
                    onChange={(event) => {
                        setTimeout(() => {
                            dispatch(getCategoryByConditionApi({ ...defaultCategoryGet, name: event.target.value }))
                        }, 1000)
                    }}
                    style={{ maxWidth: 400 }}
                    className='mx-4'
                />
            </div>
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={lstCategory}
                pagination={{
                    total: pagination?.totals,
                    current: pagination?.index,
                    onChange: (page) => {
                        let currentFilter = { ...currentFilterCategory, page_index: page }
                        dispatch(getCategoryByConditionApi(currentFilter))
                        dispatch(setCurrentFilter({ filterOption: currentFilter }))
                    }
                }} />
        </div>
    )
}

export default AdminArticles;