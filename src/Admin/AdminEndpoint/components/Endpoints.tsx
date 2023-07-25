import { useState } from 'react';
import { Button, Table, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getEndpointByName, handleInputEndpoint } from '../../../redux/reducers/endpoint/endpointSlice';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../../redux/configStore';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalDeleteEndpoint from './ModalDeleteEndpoint';
import { setDrawerInfo } from '../../../redux/reducers/drawer/drawerSlice';
import Constants from '../../../constants/Constants';

const Endpoints = ({ endpoints }: any) => {
    let dispatch = useDispatch<DispatchType>()
    const [state, setState] = useState({
        currentPage: 1,
        isModalVisible: false,
    })
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<any>(null);
    const handleChangePage = (page: number) => {
        setState({ ...state, currentPage: page });
    };

    const handleOpenDeletePopup = (id: number) => {
        setDeletingId(id);
    };

    const handleCloseDeletePopup = () => {
        setDeletingId(null);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        dispatch(getEndpointByName(term));
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
                            dispatch(setDrawerInfo({
                                typeContent: 'updateEndpoint',
                                sizeDrawer: Constants.sizeDrawer.SMALL
                            }))
                            dispatch(handleInputEndpoint(record))
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
                <Button
                    onClick={async () => {
                        await dispatch(setDrawerInfo({
                            typeContent: 'createEndpoint',
                            sizeDrawer: Constants.sizeDrawer.SMALL
                        }))
                    }}
                    style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}
                >
                    <PlusOutlined />
                    Add Endpoint
                </Button>
                <Input
                    placeholder="Search Role"
                    value={searchTerm}
                    onChange={handleSearch}
                />
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
            <ModalDeleteEndpoint deletingId={deletingId} onClose={handleCloseDeletePopup} />
        </div>
    );
};

export default Endpoints;
