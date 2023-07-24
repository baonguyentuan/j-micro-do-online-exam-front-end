import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { createCategoryApi, getCurrentCategory, updateCategoryNameApi, updateCategoryThumbnailApi } from '../../redux/reducers/category/categorySlice';
import Constants from '../../constants/Constants';
import { closeDrawer } from '../../redux/reducers/drawer/drawerSlice';
import { useTranslation } from 'react-i18next';
import { log } from 'console';
type Props = {
    formStatus: string
}
const FormCategoryModifier = ({ formStatus }: Props) => {
    let { currentCategoryDetail } = useSelector((state: RootState) => state.categorySlice)
    const dispatch: DispatchType = useDispatch()
    let { t } = useTranslation('admin')
    let { id, createAt, name, thumbnail } = currentCategoryDetail
    let [nameEdit, setNameEdit] = useState<string>(name)
    let [fileValue, setFileValue] = useState<string>('')
    let [file, setFile] = useState<File | null>(null)
    let [img, setImg] = useState<any>(thumbnail)
    const validateButtonEdit = () => {
        if (nameEdit !== '' || thumbnail !== Constants.defaultThumbnail || file) {
            return true
        } else {
            return false
        }
    }
    const validateButtonCreate = () => {
        if (nameEdit !== '' && file) {
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
            return <Button disabled={!validateButtonEdit()} className='btn__contest' onClick={async () => {
                if (nameEdit !== name) {
                    await dispatch(updateCategoryNameApi({
                        id,
                        name: nameEdit
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
            return <Button disabled={!validateButtonCreate()} className='btn__contest'
                onClick={async () => {
                    let formData = new FormData()
                    if (file) {
                        formData.append('categoryName', nameEdit)
                        formData.append('image', file, file.name)
                        await dispatch(createCategoryApi(formData))
                        setImg(Constants.defaultThumbnail)
                    }
                }}
            >{t('add')}</Button>
        }
    }
    useEffect(() => {
        const resetImg = async () => {
            await setFile(null)
            await setImg(thumbnail)
            await setFileValue('')
            await setNameEdit(name)
        }
        resetImg()
    }, [currentCategoryDetail])
    return (
        <Form id='form_category' labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderTitle()}
            </Form.Item>
            <Form.Item label="Thumbnail">
                {renderImg()}
                <Input
                    value={fileValue}
                    multiple={false}
                    type='file'
                    accept='image/img, image/jpg, image/png, image/jpeg, image/gif'
                    onChange={async (event) => {
                        if (event.target.files) {
                            setFileValue(event.target.value)
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
                <Input value={nameEdit} onChange={async (event) => {
                    await setNameEdit(event.target.value)
                }} />
                <p className='text-xs text-red-500'>{nameEdit === '' ? t('name is required') : ''}</p>
            </Form.Item>
            {renderCreateAt()}
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderButtonSubmit()}
            </Form.Item>
        </Form>
    )
}

export default FormCategoryModifier