import { Button, Form, Input, Upload } from 'antd'
import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { getCurrentCategory } from '../../redux/reducers/category/categorySlice';
const FormCategoryModifier = () => {
    let { currentCategoryDetail } = useSelector((state: RootState) => state.categorySlice)
    const dispatch = useDispatch()
    let { createAt, name, thumbnail } = currentCategoryDetail
    console.log(currentCategoryDetail);
    // let [img,setImg]=useState('')
    const renderImg = () => {
        if (typeof thumbnail === 'string') {
            return <img height={150} width={150} src={thumbnail} alt='' />
        } else {
            // <img height={150} width={150} src={img} alt='' />
        }
    }
    const renderCreateAt = () => {
        if (createAt !== null) {
            return <Form.Item label='Create At'>
                <Input value={dayjs(createAt).format('YYYY-MM-DD hh:mm:ss')} disabled />
            </Form.Item>
        } else {
            return ''
        }
    }
    return (
        <Form labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Thumbnail">
                {renderImg()}
                <Input
                    multiple={false}
                    type='file'
                    accept='image/img, image/jpg, image/png, image/jpeg, image/gif'
                    onChange={async (event) => {
                        if (event.target.files) {
                            let file=event.target.files[0]
                            let reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = (e) => {
                                if(e.target?.result){
                                    // setImg(e.target?.result)
                                    console.log(typeof e.target.result);
                                    
                                }
                            }
                            await dispatch(getCurrentCategory({ categoryDetail: { ...currentCategoryDetail, thumbnail:file } }))
                        }
                    }} />
            </Form.Item>
            <Form.Item label="Name">
                <Input value={name} onChange={async (event) => {
                    await dispatch(getCurrentCategory({ categoryDetail: { ...currentCategoryDetail, name: event.target.value } }))
                }} />
            </Form.Item>
            {renderCreateAt()}
        </Form>
    )
}

export default FormCategoryModifier