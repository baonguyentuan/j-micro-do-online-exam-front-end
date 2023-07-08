import {Button, Popconfirm, Space, Table} from 'antd'
import React, {useEffect} from 'react'
import type {ColumnsType} from 'antd/es/table';
import {DispatchType, RootState} from '../../redux/configStore';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteCategoryApi,
  getCategoryByConditionApi,
  getCategoryDetailApi,
  getCurrentCategory,
  updateCategoryNameApi,
  updateCategoryThumbnailApi
} from '../../redux/reducers/category/categorySlice';
import {CategoryDetailModel, defaultCategoryDetail, defaultCategoryGet} from '../../_core/CategoryModel';
import dayjs from 'dayjs';
import FormCategoryModifier from '../../components/Form/FormCategoryModifier';
import {setDrawerInfo} from '../../redux/reducers/drawer/drawerSlice';

const AdminCategory = () => {
  let {lstCategory, currentCategoryDetail} = useSelector((state: RootState) => state.categorySlice)
  const dispatch: DispatchType = useDispatch()
  useEffect(() => {
    dispatch(getCategoryByConditionApi(defaultCategoryGet))
  }, [])
  const columns: ColumnsType<CategoryDetailModel> = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text, record, index) => {
        if (typeof record.thumbnail === 'string') {
          return <img width={50} height={50} src={record.thumbnail} alt={record.name}/>
        }
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Creat At',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text, record, index) => {
        return <p>{dayjs(text).format('YYYY-MM-DD hh:mm:ss')}</p>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={async () => {
            await dispatch(getCategoryDetailApi(record.id))

            await dispatch(setDrawerInfo({
              title: 'Edit Category',
              component: <FormCategoryModifier/>,
              submit: async () => {

                let nameFormData = new FormData()
                nameFormData.append('id', currentCategoryDetail.id.toString())
                nameFormData.append('name', currentCategoryDetail.name)
                console.log(nameFormData);
                await dispatch(updateCategoryNameApi(nameFormData))
                if (typeof currentCategoryDetail.thumbnail !== 'string') {
                  let thumbnailFormData = new FormData()
                  thumbnailFormData.append('categoryId', currentCategoryDetail.id.toString())
                  thumbnailFormData.append('image', currentCategoryDetail.thumbnail, currentCategoryDetail.thumbnail.name)
                  await dispatch(updateCategoryThumbnailApi(thumbnailFormData))
                }
              }
            }))
          }}>Edit</Button>
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            onConfirm={async () => {
              await dispatch(deleteCategoryApi(record.id))
            }}
            okType='danger'
            okText="Yes"
            cancelText="No">
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Category Management</h1>
      <div className='my-4 flex justify-between items-center'>
        <Button onClick={async () => {
          await dispatch(getCurrentCategory({categoryDetail: defaultCategoryDetail}))
          await dispatch(setDrawerInfo({
            title: 'Add Category',
            component: <FormCategoryModifier/>,
            submit: async () => {
              if (typeof currentCategoryDetail.thumbnail !== 'string') {
                let thumbnailFormData = new FormData()
                thumbnailFormData.append('categoryName', currentCategoryDetail.name)
                thumbnailFormData.append('image', currentCategoryDetail.thumbnail, currentCategoryDetail.thumbnail.name)
                await dispatch(updateCategoryThumbnailApi(thumbnailFormData))
              }
            }
          }))
        }}>Add category</Button>
        <p className='mx-4 font-bold text-blue-600 text-base'><span>Total: </span><span>{lstCategory.length}</span></p>
      </div>
      <Table className='border-2 border-blue-300' rowKey={'id'} columns={columns} dataSource={lstCategory}
             bordered={true}/>
    </div>
  )
}

export default AdminCategory