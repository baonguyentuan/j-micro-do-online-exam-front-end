import { useEffect, useState } from 'react';
import { Button, Table, Input, Modal, Form, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addRole, updateRole } from '../../../redux/reducers/role/roleSlice';
import { EndpointDetailModel } from '../../../_core/EndpointModel';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../../redux/configStore';
import { EditOutlined } from '@ant-design/icons';
import { getEndpointOptionApi } from '../../../redux/reducers/endpoint/endpointSlice';

const Roles = ({ roles }: any) => {
    let dispatch: DispatchType = useDispatch()
    const [form] = Form.useForm();
    const endpointOption = useSelector((state: RootState) => state.endpointSlice?.options);
    console.log('endpointOption', endpointOption)
    const [state, setState] = useState({
        currentPage: 1,
        isModalVisible: false,
    })
    const [selectedRecord, setSelectedRecord] = useState<EndpointDetailModel>();

    const showModal = () => {
        form.resetFields();
        setState({ ...state, isModalVisible: true })
    };

    const handleCancel = () => {
        setState({ ...state, isModalVisible: false })
    };

    const handleChangePage = (page: number) => {
        setState({ ...state, currentPage: page });
    };

    const handleAddRole = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();
            console.log('values', values)
            await dispatch(addRole(roles.roleName, values.name));
            setState({ ...state, isModalVisible: false })
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateRole = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();
            await dispatch(updateRole(roles.roleName, values.name));
            setState({ ...state, isModalVisible: false })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(getEndpointOptionApi());
    }, []);

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
                <Button
                    onClick={() => {
                        setSelectedRecord(record);
                        showModal();
                    }}
                    style={{ marginRight: '8px', background: '#f5cc2a' }}
                    icon={<EditOutlined style={{ color: '#fff' }} />}
                />
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
                    current: state.currentPage,
                    total: roles?.data?.length,
                    pageSize: 10,
                    onChange: handleChangePage,
                }}
            />

            <Modal
                title={selectedRecord?.id ? 'Edit Role' : 'Add Role'}
                open={state.isModalVisible}
                onOk={selectedRecord?.id ? handleUpdateRole : handleAddRole}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="roleName" label="Role Name" rules={[{ required: true, message: 'Please enter the role name' }]}>
                        <Input placeholder="Enter role name" />
                    </Form.Item>
                    <Form.Item name="endPoint" label="Endpoint" rules={[{ required: true }]}>
                        <Select showSearch placeholder="Select endpoint" options={endpointOption} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Roles;
