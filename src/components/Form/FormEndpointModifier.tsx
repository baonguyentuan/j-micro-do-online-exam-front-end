/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
    // const [form] = Form.useForm();
    // const { inputEndpoint } = useSelector((state: RootState) => state.endpointSlice)
    // const dispatch: DispatchType = useDispatch()
    // const [nameEdit, setNameEdit] = useState<string>(inputEndpoint?.endpointPath)
    // const validateButtonEdit = () => {
    //     if (nameEdit !== '') {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    // const validateButtonCreate = () => {
    //     if (nameEdit !== '') {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    // const renderTitle = () => {
    //     if (formStatus === Constants.formStatus.EDIT) {
    //         return <h1 className='text-center text-2xl font-bold'>Edit Endpoint</h1>
    //     } else if (formStatus === Constants.formStatus.CREATE) {
    //         return <h1 className='text-center text-2xl font-bold'>Add Endpoint</h1>
    //     }
    // }
    // const renderButtonSubmit = () => {
    //     if (formStatus === Constants.formStatus.EDIT) {
    //         return <Button disabled={!validateButtonEdit()} className='btn__contest' onClick={async () => {
    //             if (nameEdit !== inputEndpoint?.endpointPath) {
    //                 await form.validateFields();
    //                 dispatch(updateEndpointApi(inputEndpoint?.id, nameEdit));
    //                 form.resetFields();
    //             }
    //             await dispatch(closeDrawer())
    //         }}>
    //             Update
    //         </Button>
    //     } else if (formStatus === Constants.formStatus.CREATE) {
    //         return <Button disabled={!validateButtonCreate()} className='btn__contest'
    //             onClick={async () => {
    //                 await form.validateFields();
    //                 const orderBy = 1;
    //                 dispatch(createEndpointApi(nameEdit));
    //                 dispatch(getEndpointOderBy(orderBy));
    //                 await dispatch(closeDrawer())
    //             }}
    //         >
    //             Create
    //         </Button>
    //     }
    // }
    // useEffect(() => {
    //     setNameEdit(nameEdit);
    // }, [inputEndpoint]);

    return (
        <Form id='form_endpoint' labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            {/* <Form.Item wrapperCol={{ span: 24 }}>
                {renderTitle()}
            </Form.Item>
            <Form.Item name="endPoint" label="Endpoint" rules={[{ required: true, message: 'Please enter value of endpoint' }]}>
                <Input
                    value={nameEdit}
                    onChange={async (event) => {
                        await setNameEdit(event.target.value)
                    }} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
                {renderButtonSubmit()}
            </Form.Item> */}
        </Form>
    )
}

export default FormEndpointModifier;