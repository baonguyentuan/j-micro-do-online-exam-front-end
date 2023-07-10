import React, { useState } from 'react';
import { Button, Table, Input, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createEndpointApi, getEndpointOderBy } from '../../../redux/reducers/endpoint/endpointSlice';
import { EndpointDetailModel } from '../../../_core/EndpointModel';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../../redux/configStore';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalDeleteEndpoint from './ModalDeleteEndpoint';

const Endpoints = ({ endpoints }: any) => {
    let dispatch = useDispatch<DispatchType>()
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedRecord, setSelectedRecord] = useState<EndpointDetailModel>();
    const [deletingId, setDeletingId] = useState<any>(null);
    const showModal = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleCreateEndpoint = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();
            const { endpointPath } = values;
            const orderBy = 1;
            dispatch(createEndpointApi(endpointPath));
            dispatch(getEndpointOderBy(orderBy));
            setIsModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenDeletePopup = (id: number) => {
        setDeletingId(id);
    };

    const handleCloseDeletePopup = () => {
        setDeletingId(null);
    };

    const columns = [
        {
            title: 'Endpoint',
            dataIndex: 'endPoint',
            key: 'endPoint',
            render: (text: string) => (
                <div style={{ borderRadius: '10px', border: '1px solid #fff', padding: '0px 8px', background: '#9fd8f3', width: 'fit-content' }}>
                    {text}
                </div>
            ),
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
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
                <div className='flex'>
                    <Button
                        onClick={() => {
                            setSelectedRecord(record);
                            showModal();
                        }}
                        style={{ marginRight: '8px', background: '#f5cc2a' }}
                        icon={<EditOutlined style={{ color: '#fff' }} />}
                    />
                    <Button
                        onClick={() => handleOpenDeletePopup(record.id)}
                        style={{ background: '#d82c0d' }}
                        icon={<DeleteOutlined style={{ color: '#fff' }} />}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className='role'>
            <div style={{ display: 'flex', marginBottom: '16px' }}>
                <Input.Search placeholder="Search Role" />
                <Button type="default" style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }} onClick={showModal}>
                    <PlusOutlined />
                    Add Endpoint
                </Button>
            </div>
            <Table
                dataSource={endpoints?.data || []}
                columns={columns}
                pagination={{
                    position: ['bottomCenter'],
                    current: currentPage,
                    total: endpoints?.data?.length,
                    pageSize: 10,
                    onChange: handleChangePage,
                }}
            />

            <Modal
                title={selectedRecord?.id ? 'Edit Endpoint' : 'Add Endpoint'}
                open={isModalVisible}
                onOk={handleCreateEndpoint}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="endpointPath" label="Endpoint" rules={[{ required: true, message: 'Please enter value of endpoint' }]}>
                        <Input
                            placeholder="Enter endpoint"
                            value={selectedRecord?.id ? selectedRecord?.endPointPath : ''}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <ModalDeleteEndpoint deletingId={deletingId} onClose={handleCloseDeletePopup} />
        </div>
    );
};

export default Endpoints;
