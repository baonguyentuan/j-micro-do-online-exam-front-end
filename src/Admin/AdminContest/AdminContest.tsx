import { Button, Input, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { UserAdminContainer } from "../../assets/styles/userAdminStyles";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../../constants/AppRoutes";
import AppConfigs from "../../config/AppConfigs";
import { DispatchType, RootState } from "../../redux/configStore";
import { useDispatch } from "react-redux";
import { deleteContest, getContestByOwner, getContestDetail } from "../../redux/reducers/contest";
import { useSelector } from "react-redux";
import { CaretDownOutlined, CaretUpOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { ContestInfoModel } from "../../_core/contest";
import Constants from "../../constants/Constants";
import dayjs from "dayjs";
import { setDrawerInfo } from "../../redux/reducers/drawer/drawerSlice";
import { useTranslation } from "react-i18next";
import { setOptionSidebarAdmin } from "../../redux/reducers/menu/menuSlice";
type Props = {}

const AdminContest = (props: Props) => {
    let navigate = useNavigate();
    let { lstContest, pagination } = useSelector((state: RootState) => state.contestSlice)
    const dispatch: DispatchType = useDispatch()
    let [searchParam, setSearchParam] = useState({
        name: '',
        from_date: '',
        to_date: '',
        page_size: AppConfigs.pagination.DEFAULT_PAGE_SIZE,
        page_index: AppConfigs.pagination.DEFAULT_PAGE_INDEX,
        order_by: -1
    })
    let [nameFilter, setNameFilter] = useState<boolean>(true);
    let [createAtFilter, setCreateAtFilter] = useState<boolean>(true);
    let { t } = useTranslation("contest");

    const columns = [
        {
            title: <div className="flex justify-between items-center">
                <div>{t('detail.Contest name')}</div>
                <div>
                    <Button type="link" className={`${nameFilter ? "hidden" : ""}`} onClick={async () => {
                        await setNameFilter(!nameFilter);
                        setSearchParam({ ...searchParam, order_by: 9, page_index: 1 });
                    }}><CaretUpOutlined className="text-base -translate-y-1 " /></Button>
                    <Button type="link" className={`${!nameFilter ? "hidden" : ""}`} onClick={async () => {
                        await setNameFilter(!nameFilter);
                        setSearchParam({ ...searchParam, order_by: 10, page_index: 1 });
                    }}><CaretDownOutlined className="text-base -translate-y-1 " /></Button>
                </div>
            </div>,
            dataIndex: "name",
            key: "name",
            render: (text: string) => <a>{text}</a>
        },
        {
            title: t('detail.Exam name'),
            dataIndex: "examName",
            key: "examName",
            render: (text: string) => <a>{text}</a>
        },
        {
            title: t('detail.Owner'),
            dataIndex: "ownerName",
            key: "ownerName",
            render: (text: string) => <a>{text}</a>
        },
        {
            title: t('detail.start at'),
            dataIndex: "startAt",
            key: "startAt",
            render: (text: string) => {
                return <p>{dayjs(text).format(Constants.formatFullDate)}</p>;
            }
        },
        {
            title: t('detail.end at'),
            dataIndex: "endAt",
            key: "endAt",
            render: (text: string) => {
                return <p>{dayjs(text).format(Constants.formatFullDate)}</p>;
            }
        },
        {
            title: t('exam.Action'),
            key: "action",
            render: (text: string, record: ContestInfoModel, index: number) => (
                <Space size="middle">
                    <Button className="btn_view" onClick={async () => {
                        await dispatch(getContestDetail({ id: record.id }))
                        await dispatch(setDrawerInfo({ typeContent: Constants.typeDrawer.VIEW_CONTEST, sizeDrawer: Constants.sizeDrawer.NORMAL }))
                    }}><EyeOutlined className="text-base -translate-y-1 " /></Button>
                </Space>
            )
        }
    ];
    useEffect(() => {
        dispatch(getContestByOwner(searchParam))
        dispatch(setOptionSidebarAdmin({ option: Constants.optionMenuAdmin.CONTEST }));
    }, [searchParam])
    return (
        <div>
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">{t('contest.Contest management')}</h1>
            <div className="mt-4 mb-8 flex justify-between items-center">
                <Input
                    placeholder={t('detail.search')}
                    size="large"
                    onChange={(event) => {
                        setTimeout(() => {
                            setSearchParam({ ...searchParam, name: event.target.value, page_index: 1 });
                        }, 1000);
                    }} style={{ maxWidth: 400 }} className="mr-4" />
                <p className="mx-4 font-medium text-base"><span>{t('detail.total')}: </span><span>{pagination.totals}</span></p>
            </div>
            <div>
                <Table
                    rowKey={"id"}
                    columns={columns}
                    dataSource={lstContest}
                    pagination={{
                        total: pagination.totals,
                        current: pagination.index,
                        onChange: (page) => {
                            setSearchParam({ ...searchParam, page_index: page });
                        }
                    }} />
            </div>
        </div>
    );
};

export default AdminContest;