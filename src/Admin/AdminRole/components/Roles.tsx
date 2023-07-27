/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Button, Table, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getRoleOderBy, handleInputRole } from '../../../redux/reducers/role/roleSlice';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../../redux/configStore';
import { EditOutlined } from '@ant-design/icons';
import { setDrawerInfo } from '../../../redux/reducers/drawer/drawerSlice';
import { getEndpointOptionApi } from '../../../redux/reducers/endpoint/endpointSlice';
import Constants from '../../../constants/Constants';

const Roles = ({ roles }: any) => {
    let dispatch: DispatchType = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [state, setState] = useState({
        currentPage: 1,
        isModalVisible: false,
    })

    const handleChangePage = (page: number) => {
        setState({ ...state, currentPage: page });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        dispatch(getRoleOderBy({
            name: term,
            from_date: '',
            to_date: '',
            page_size: 10,
            order_by: -1,
        }))
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
                <Button
                    onClick={async () => {
                        await dispatch(setDrawerInfo({
                            typeContent: 'updateRole',
                            sizeDrawer: Constants.sizeDrawer.SMALL
                        }))
                        dispatch(handleInputRole(record))
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
                <Button
                    onClick={() => {
                        dispatch(setDrawerInfo({
                            typeContent: 'createRole',
                            sizeDrawer: Constants.sizeDrawer.SMALL
                        }))
                        dispatch(getEndpointOptionApi())
                    }}
                    style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}
                >
                    <PlusOutlined />
                    Add Role
                </Button>
                <Input.Search
                    placeholder="Search Role"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <Table
                dataSource={roles.data || []}
                columns={columns}
                pagination={{
                    position: ['bottomCenter'],
                    current: state.currentPage,
                    total: roles?.pagination?.totals,
                    pageSize: 10,
                    onChange: handleChangePage,
                }}
            />
        </div>
    );
};

export default Roles;
