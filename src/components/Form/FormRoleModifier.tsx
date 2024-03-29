/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import Constants from '../../constants/Constants';
import { closeDrawer } from '../../redux/reducers/drawer/drawerSlice';
import { useTranslation } from 'react-i18next';
import { addRole } from '../../redux/reducers/role/roleSlice';
type Props = {
    formStatus: string
}
const FormRoleModifier = ({ formStatus }: Props) => {
    const data = useSelector((state: RootState) => state.endpointSlice?.options);
    const { inputRole } = useSelector((state: RootState) => state.roleSlice)
    const dispatch: DispatchType = useDispatch()
    const { t } = useTranslation('admin')
    const [nameEdit, setNameEdit] = useState<string>(inputRole?.roleName)

    const validateButtonEdit = () => {
        if (nameEdit !== '') {
            return true
        } else {
            return false
        }
    }
    const validateButtonCreate = () => {
        if (nameEdit !== '') {
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
            return <Button disabled={!validateButtonEdit()} className='btn__contest' onClick={async () => {
                if (nameEdit !== inputRole?.roleName) {
                    // await dispatch(updateRole(roles.roleName, values.name));
                }
                await dispatch(closeDrawer())
            }}>Update</Button>
        } else if (formStatus === Constants.formStatus.CREATE) {
            return <Button disabled={!validateButtonCreate()} className='btn__contest'
                onClick={async () => {
                    await dispatch(addRole(inputRole?.roleName, data[0]?.name));
                    await dispatch(closeDrawer())
                }}
            >Add</Button>
        }
    }

    return (
        <Form id='form_role' labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderTitle()}
            </Form.Item>
            <Form.Item label="Role Name" rules={[{ required: true, message: 'Please enter the role name' }]}>
                <Input placeholder="Enter role name" />
            </Form.Item>
            <Form.Item label="Endpoint" rules={[{ required: true }]}>
                <Select showSearch placeholder="Select endpoint" options={data} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderButtonSubmit()}
            </Form.Item>
        </Form>
    )
}

export default FormRoleModifier