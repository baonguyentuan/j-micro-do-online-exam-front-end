/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import Constants from '../../constants/Constants';
import { closeDrawer } from '../../redux/reducers/drawer/drawerSlice';
import { createEndpointApi, getEndpointOderBy, updateEndpointApi } from '../../redux/reducers/endpoint/endpointSlice';
type Props = {
    formStatus: string
}
const FormEndpointModifier = ({ formStatus }: Props) => {
    const [form] = Form.useForm();
    const { inputEndpoint } = useSelector((state: RootState) => state.endpointSlice)
    const dispatch: DispatchType = useDispatch()
    const validateButtonEdit = () => {
        if (inputEndpoint.endPoint !== '') {
            return true
        } else {
            return false
        }
    }
    const validateButtonCreate = () => {
        if (inputEndpoint.endPoint !== '') {
            return true
        } else {
            return false
        }
    }
    const renderTitle = () => {
        if (formStatus === Constants.formStatus.EDIT) {
            return <h1 className='text-center text-2xl font-bold'>Edit Endpoint</h1>
        } else if (formStatus === Constants.formStatus.CREATE) {
            return <h1 className='text-center text-2xl font-bold'>Add Endpoint</h1>
        }
    }
    const renderButtonSubmit = () => {
        if (formStatus === Constants.formStatus.EDIT) {
            return <Button disabled={!validateButtonEdit()} className='btn__contest' onClick={() => {
                form.validateFields();
                dispatch(updateEndpointApi(inputEndpoint.id, inputEndpoint.endPoint))
                form.resetFields();
                dispatch(closeDrawer())
            }}>
                Update
            </Button>
        } else {
            return <Button disabled={!validateButtonCreate()} className='btn__contest'
                onClick={() => {
                    form.validateFields();
                    const orderBy = 1;
                    dispatch(createEndpointApi(inputEndpoint.endPoint));
                    dispatch(getEndpointOderBy(orderBy));
                    form.resetFields();
                    dispatch(closeDrawer())
                }}
            >
                Create
            </Button>
        }
    }
    useEffect(() => {
        if (formStatus === Constants.formStatus.EDIT) {
            form.setFieldValue('endPoint', inputEndpoint.endPoint)
        }
    }, [inputEndpoint]);

    return (
        <Form form={form} id='form_endpoint' labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderTitle()}
            </Form.Item>
            <Form.Item name="endPoint" label="Endpoint" rules={[{ required: true, message: 'Please enter value of endpoint' }]}>
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderButtonSubmit()}
            </Form.Item>
        </Form>
    )
}

export default FormEndpointModifier;
