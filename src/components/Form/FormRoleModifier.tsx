/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import Constants from '../../constants/Constants';
import { closeDrawer } from '../../redux/reducers/drawer/drawerSlice';
import { addRole, updateRole } from '../../redux/reducers/role/roleSlice';
type Props = {
    formStatus: string
}
const FormRoleModifier = ({ formStatus }: Props) => {
    const [form] = Form.useForm();
    const data = useSelector((state: RootState) => state.endpointSlice?.options);
    const { inputRole } = useSelector((state: RootState) => state.roleSlice)
    const dispatch: DispatchType = useDispatch()

    const validateButtonEdit = () => {
        if (inputRole?.roleName !== '') {
            return true
        } else {
            return false
        }
    }
    const validateButtonCreate = () => {
        if (inputRole?.roleName !== '') {
            return true
        } else {
            return false
        }
    }
    const renderTitle = () => {
        if (formStatus === Constants.formStatus.EDIT) {
            return <h1 className='text-center text-2xl font-bold'>Edit Role</h1>
        } else if (formStatus === Constants.formStatus.CREATE) {
            return <h1 className='text-center text-2xl font-bold'>Add Role</h1>
        }
    }
    const renderButtonSubmit = () => {
        if (formStatus === Constants.formStatus.EDIT) {
            return <Button disabled={!validateButtonEdit()} className='btn__contest' onClick={() => {
                form.validateFields();
                dispatch(updateRole(inputRole.roleName, inputRole.selectedEndpoint))
                form.resetFields();
                dispatch(closeDrawer())
            }}>
                Update
            </Button>
        } else {
            return <Button disabled={!validateButtonCreate()} className='btn__contest'
                onClick={() => {
                    dispatch(addRole(inputRole?.roleName, data[0]?.name));
                    form.resetFields();
                    dispatch(closeDrawer())
                }}
            >
                Add
            </Button>
        }
    }

    useEffect(() => {
        if (formStatus === Constants.formStatus.EDIT) {
            form.setFieldValue('role', inputRole.roleName)
            form.setFieldValue('select_endpoint', inputRole.selectedEndpoint)
        }
    }, [inputRole]);

    return (
        <Form form={form} id='form_role' labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderTitle()}
            </Form.Item>
            <Form.Item name='role' label="Role Name" rules={[{ required: true, message: 'Please enter the role name' }]}>
                <Input placeholder="Enter role name" />
            </Form.Item>
            <Form.Item name='select_endpoint' label="Endpoint" rules={[{ required: true, message: 'Please enter the endpoint name' }]}>
                <Select showSearch placeholder="Select endpoint" options={data} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderButtonSubmit()}
            </Form.Item>
        </Form>
    )
}

export default FormRoleModifier;