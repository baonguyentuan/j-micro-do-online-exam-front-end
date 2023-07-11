import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { createCategoryApi, getCurrentCategory, updateCategoryNameApi, updateCategoryThumbnailApi } from '../../redux/reducers/category/categorySlice';
import Constants from '../../constants/Constants';
import { closeDrawer } from '../../redux/reducers/drawer/drawerSlice';
import { useTranslation } from 'react-i18next';
type Props = {
    formStatus: string
}
const FormCategoryModifier = ({ formStatus }: Props) => {
    let { currentCategoryDetail } = useSelector((state: RootState) => state.categorySlice)
    const dispatch: DispatchType = useDispatch()
    let { t } = useTranslation('admin')
    let { id, createAt, name, thumbnail } = currentCategoryDetail
    let [file, setFile] = useState<File>()
    let [img, setImg] = useState<any>(thumbnail)
    let [isChangeName, setIsChangeName] = useState(false)
    const validateForm = () => {
        if (name !== '' || thumbnail !== Constants.defaultThumbnail || file) {
            return true
        } else {
            return false
        }
    }
    const renderImg = () => {
        if (file) {
            return <img className='mb-4 mx-auto' height={150} width={150} src={img} alt='img' />
        } else {
            return <img className='mb-4 mx-auto' height={150} width={150} src={thumbnail} alt='' />
        }
    }
    const renderCreateAt = () => {
        if (formStatus === Constants.formStatus.EDIT) {
            return <Form.Item label={t('create at')}>
                <Input value={dayjs(createAt).format('YYYY-MM-DD hh:mm:ss')} disabled />
            </Form.Item>
        } else if (formStatus === Constants.formStatus.CREATE) {
            return ''
        }
    }
    const renderTitle = () => {
        if (formStatus === Constants.formStatus.EDIT) {
            return <h1 className='text-center text-2xl font-bold'>{t('edit category')}</h1>
        } else if (formStatus === Constants.formStatus.CREATE) {
            return <h1 className='text-center text-2xl font-bold'>{t('add category')}</h1>
        }
    }
    const renderButtonSubmit = () => {
        if (formStatus === Constants.formStatus.EDIT) {
            return <Button disabled={!validateForm()} className='btn__contest' onClick={async () => {
                if (isChangeName) {
                    await dispatch(updateCategoryNameApi({
                        id,
                        name
                    }))
                }
                if (file) {
                    let formData = new FormData()
                    formData.append('categoryId', id.toString())
                    formData.append('image', file, file.name)
                    await dispatch(updateCategoryThumbnailApi(formData))
                }
                await dispatch(closeDrawer())
            }}>{t('update')}</Button>
        } else if (formStatus === Constants.formStatus.CREATE) {
            return <Button disabled={!validateForm()} className='btn__contest'
                onClick={async () => {
                    let formData = new FormData()
                    if (file) {
                        formData.append('categoryName', name)
                        formData.append('image', file, file.name)
                        await dispatch(createCategoryApi(formData))
                        setImg(Constants.defaultThumbnail)
                    }
                }}
            >{t('add')}</Button>
        }
    }
    return (
        <Form labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderTitle()}
            </Form.Item>
            <Form.Item label="Thumbnail">
                {renderImg()}
                <Input
                    multiple={false}
                    type='file'
                    accept='image/img, image/jpg, image/png, image/jpeg, image/gif'
                    onChange={async (event) => {
                        if (event.target.files) {
                            let file = event.target.files[0]
                            let reader = new FileReader()
                            reader.onload = (e) => {
                                if (e.target) {
                                    setImg(e.target?.result)
                                }
                            }
                            reader.readAsDataURL(file)
                            await setFile(file)
                        }
                    }} />
                <p className='text-xs text-red-500'>{thumbnail !== Constants.defaultThumbnail || file ? "" : t('thumbnail is required')}</p>
            </Form.Item>
            <Form.Item label="Name" >
                <Input value={name} onChange={async (event) => {
                    await dispatch(getCurrentCategory({ categoryDetail: { ...currentCategoryDetail, name: event.target.value } }))
                    await setIsChangeName(true)
                }} />
                <p className='text-xs text-red-500'>{name === '' ? t('name is required') : ''}</p>
            </Form.Item>
            {renderCreateAt()}
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderButtonSubmit()}
            </Form.Item>
        </Form>
    )
}

export default FormCategoryModifier