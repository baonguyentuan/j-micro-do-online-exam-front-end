import { Button, Form, Input, Upload } from 'antd'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { createCategoryApi, getCurrentCategory, updateCategoryNameApi, updateCategoryThumbnailApi } from '../../redux/reducers/category/categorySlice';
import Constants from '../../constants/Constants';
import { CategoryDetailModel, defaultCategoryDetail } from '../../_core/CategoryModel';
import { closeDrawer } from '../../redux/reducers/drawer/drawerSlice';
import { useTranslation } from 'react-i18next';
type Props = {
    formStatus: string
}
const FormCategoryModifier = ({ formStatus }: Props) => {
    let { currentCategoryDetail } = useSelector((state: RootState) => state.categorySlice)
    const dispatch: DispatchType = useDispatch()
    let {t}=useTranslation('admin')
    let { id, createAt, name, thumbnail } = currentCategoryDetail
    let [formValues, setFormValues] = useState<CategoryDetailModel>({ id, createAt, name, thumbnail })
    let [img, setImg] = useState<any>(thumbnail)
    const validateForm = () => {
        if (formValues.name === '' || formValues.thumbnail === Constants.defaultThumbnail) {
            return false
        } else {
            return true
        }
    }
    const renderImg = () => {
        if (typeof formValues.thumbnail === 'string') {
            return <img className='mb-4 mx-auto' height={150} width={150} src={formValues.thumbnail} alt='' />
        } else {
            return <img className='mb-4 mx-auto' height={150} width={150} src={img} alt='img' />
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
                if (formValues.name !== name) {
                    await dispatch(updateCategoryNameApi({
                        id,
                        name: formValues.name
                    }))
                } else if (formValues.thumbnail !== thumbnail) {
                    let formData = new FormData()
                    if (typeof formValues.thumbnail === 'object') {
                        formData.append('categoryId', id.toString())
                        formData.append('image', formValues.thumbnail, formValues.thumbnail.name)
                    }
                    await dispatch(updateCategoryThumbnailApi(formData))
                }
                await dispatch(closeDrawer())
            }}>{t('update')}</Button>
        } else if (formStatus === Constants.formStatus.CREATE) {
            return <Button disabled={!validateForm()} className='btn__contest'
                onClick={async () => {
                    let formData = new FormData()
                    if (typeof formValues.thumbnail === 'object') {
                        formData.append('categoryName', formValues.name)
                        formData.append('image', formValues.thumbnail, formValues.thumbnail.name)
                        await dispatch(createCategoryApi(formData))
                        await setFormValues(defaultCategoryDetail)
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
                            await setFormValues({ ...formValues, thumbnail: file })
                        }
                    }} />
                <p className='text-xs text-red-500'>{formValues.thumbnail === Constants.defaultThumbnail ? t('thumbnail is required') : ''}</p>
            </Form.Item>
            <Form.Item label="Name" >
                <Input value={formValues.name} onChange={async (event) => {
                    await setFormValues({ ...formValues, name: event.target.value })
                }} />
                <p className='text-xs text-red-500'>{formValues.name === '' ? t('name is required') : ''}</p>
            </Form.Item>
            {renderCreateAt()}
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderButtonSubmit()}
            </Form.Item>
        </Form>
    )
}

export default FormCategoryModifier