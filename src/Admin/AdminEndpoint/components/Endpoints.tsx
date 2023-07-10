import { useState } from 'react';
import { Button, Table, Input, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createEndpointApi, getEndpointOderBy, updateEndpointApi } from '../../../redux/reducers/endpoint/endpointSlice';
import { EndpointDetailModel } from '../../../_core/EndpointModel';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../../redux/configStore';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalDeleteEndpoint from './ModalDeleteEndpoint';

const Endpoints = ({ endpoints }: any) => {
    let dispatch = useDispatch<DispatchType>()
    const [form] = Form.useForm();
    const [state, setState] = useState({
        currentPage: 1,
        isModalVisible: false,
    })
    const [selectedRecord, setSelectedRecord] = useState<EndpointDetailModel>();
    const [deletingId, setDeletingId] = useState<any>(null);
    const showModal = () => {
        setState({ ...state, isModalVisible: true })
    };

    const handleCancel = () => {
        setState({ ...state, isModalVisible: false })
    };

    const handleChangePage = (page: number) => {
        setState({ ...state, currentPage: page });
    };

    const handleCreateEndpoint = async () => {
        await form.validateFields();
        const values = form.getFieldsValue();
        const { endpointPath } = values;
        const orderBy = 1;
        dispatch(createEndpointApi(endpointPath));
        dispatch(getEndpointOderBy(orderBy));
        setState({ ...state, isModalVisible: false })
    };
    const handleUpdateEndpoint = async () => {
        await form.validateFields();
        const values = form.getFieldsValue();
        if (selectedRecord) {
            dispatch(updateEndpointApi(selectedRecord.id, values.endpointPath));
        }
        setState({ ...state, isModalVisible: false })
        form.resetFields();
        setSelectedRecord(undefined);
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
                    current: state.currentPage,
                    total: endpoints?.data?.length,
                    pageSize: 10,
                    onChange: handleChangePage,
                }}
            />

            <Modal
                title={selectedRecord?.id ? 'Edit Endpoint' : 'Add Endpoint'}
                open={state.isModalVisible}
                onOk={selectedRecord?.id ? handleUpdateEndpoint : handleCreateEndpoint}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="endpointPath" label="Endpoint" rules={[{ required: true, message: 'Please enter value of endpoint' }]}>
                        <Input placeholder="Enter endpoint" />
                    </Form.Item>
                </Form>
            </Modal>
            <ModalDeleteEndpoint deletingId={deletingId} onClose={handleCloseDeletePopup} />
        </div>
    );
};

export default Endpoints;
