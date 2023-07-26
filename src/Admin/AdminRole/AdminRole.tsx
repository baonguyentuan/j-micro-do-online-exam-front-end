import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { Button, Input, Table } from 'antd';
import { setDrawerInfo } from '../../redux/reducers/drawer/drawerSlice';
import Constants from '../../constants/Constants';
import { setOptionSidebarAdmin } from '../../redux/reducers/menu/menuSlice';
import { EditOutlined, PlusOutlined,CaretDownOutlined,CaretUpOutlined } from '@ant-design/icons'
import { getEndpointOptionApi } from '../../redux/reducers/endpoint/endpointSlice';
import { useTranslation } from 'react-i18next';
import { getRolesApi } from '../../redux/reducers/role/roleSlice';
import dayjs from "dayjs";
function AdminRole() {
    const { lstRole, pagination } = useSelector((state: RootState) => state.roleSlice);
    let dispatch: DispatchType = useDispatch()
    let [nameFilter, setNameFilter] = useState<boolean>(true);
    let [createAtFilter, setCreateAtFilter] = useState<boolean>(true);
    let [searchParams, setSearchParams] = useState({
        name: Constants.EmptyString,
        from_date: Constants.EmptyString,
        to_date: Constants.EmptyString,
        page_index: 1,
        page_size: 10,
        order_by: -1
    })
    let { t } = useTranslation('admin')
    const columns = [
        {
            title: <div className="flex justify-between items-center">
            <div>Role</div>
            <div>
              <Button type="link" className={`${createAtFilter ? "hidden" : ""}`} onClick={async () => {
                await setCreateAtFilter(!createAtFilter);
                setSearchParams({ ...searchParams, order_by: 5, page_index: 1 });
              }}><CaretUpOutlined className="text-base -translate-y-1 " /></Button>
              <Button type="link" className={`${!createAtFilter ? "hidden" : ""}`} onClick={async () => {
                await setCreateAtFilter(!createAtFilter);
                setSearchParams({ ...searchParams, order_by: 6, page_index: 1 });
              }}><CaretDownOutlined className="text-base -translate-y-1 " /></Button>
            </div>
          </div>,
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: <div className="flex justify-between items-center">
            <div>Create At</div>
            <div>
              <Button type="link" className={`${createAtFilter ? "hidden" : ""}`} onClick={async () => {
                await setCreateAtFilter(!createAtFilter);
                setSearchParams({ ...searchParams, order_by: 3, page_index: 1 });
              }}><CaretUpOutlined className="text-base -translate-y-1 " /></Button>
              <Button type="link" className={`${!createAtFilter ? "hidden" : ""}`} onClick={async () => {
                await setCreateAtFilter(!createAtFilter);
                setSearchParams({ ...searchParams, order_by: 4, page_index: 1 });
              }}><CaretDownOutlined className="text-base -translate-y-1 " /></Button>
            </div>
          </div>,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text:any,record:any,index:any) => {
                return <p>{dayjs(text).format("YYYY-MM-DD hh:mm:ss")}</p>;
              }
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
                        // dispatch(handleInputRole(record))
                    }}
                    className="btn_edit"
                    icon={<EditOutlined className="text-base -translate-y-1 " />}
                />
            ),
        },
    ];
    useEffect(() => {
        dispatch(getRolesApi(searchParams));
        dispatch(setOptionSidebarAdmin({ option: Constants.optionMenuAdmin.AUTH.ROLE }))
    }, [searchParams]);

    return (
        <div>
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Roles Management</h1>
            <div className='role'>
                <div className='my-4 flex justify-between items-center'>
                    <Button
                        onClick={async () => {
                            await dispatch(setDrawerInfo({
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
                    <Input style={{ maxWidth: 400 }} className='mp-4' placeholder="Search Role" onChange={(event) => {
                        setSearchParams({ ...searchParams, name: event.target.value, page_index: 1 })
                    }} />
                    <p className='mx-4 font-bold text-blue-600 text-base'><span>{t('total')}: </span><span>{pagination.totals}</span></p>
                </div>
                <Table
                    dataSource={lstRole}
                    columns={columns}
                    pagination={{
                        position: ['bottomCenter'],
                        current: pagination.index,
                        total: pagination.totals,
                        pageSize: searchParams.page_size,
                        onChange: (page) => {
                            setSearchParams({ ...searchParams, page_index: page })
                        },
                    }}
                />
            </div>
        </div>
    );
}


export default AdminRole;
