import React, { useState } from 'react';
import { Button, Table, Input, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addRole, updateRole } from '../../../redux/reducers/roles/roles';
import { EndpointDetailModel } from '../../../_core/EndpointModel';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../../redux/configStore';

const Roles = ({ roles }: any) => {
    let dispatch: DispatchType = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedRecord, setSelectedRecord] = useState<EndpointDetailModel>();

    const showModal = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddRole = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();
            const { roleName } = values;
            await dispatch(addRole(roleName));
            setIsModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateRole = () => {
        form.validateFields().then((values) => {
            const { roleName } = values;
            const updatedRole = { roleName };
            // dispatch(updateRole(selectedRecord.id));
            setIsModalVisible(false);
        });
    };

    const columns = [
        {
            title: 'Role Name',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: any) => (
                <Button onClick={() => {
                    setSelectedRecord(record);
                    showModal();
                }}>Edit</Button>
            ),
        },
    ];

    return (
        <div className='role'>
            <div style={{ display: 'flex', marginBottom: '16px' }}>
                <Input.Search placeholder="Search Role" />
                <Button type="default" style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }} onClick={showModal}>
                    <PlusOutlined />
                    Add Role
                </Button>
            </div>
            <Table
                dataSource={roles.data || []}
                columns={columns}
                pagination={{
                    position: ['bottomCenter'],
                }}
            />

            <Modal
                title={selectedRecord ? 'Edit Role' : 'Add Role'}
                open={isModalVisible}
                onOk={handleAddRole}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="roleName" label="Role Name" rules={[{ required: true, message: 'Please enter the role name' }]}>
                        <Input placeholder="Enter role name" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Roles;
