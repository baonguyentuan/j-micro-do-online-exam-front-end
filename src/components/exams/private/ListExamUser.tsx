import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExamOptionModel } from "../../../_core/exam";
import AppRoutes from "../../../constants/AppRoutes";
import Constants from "../../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popconfirm, Space, Table } from "antd";
import { DispatchType, RootState } from "../../../redux/configStore";
import { setDrawerInfo } from "../../../redux/reducers/drawer/drawerSlice";
import { UserAdminContainer } from "../../../assets/styles/userAdminStyles";
import { deleteExamApi, getExamDetailShow, getExamOptionApi, getFullExamDetailApi } from "../../../redux/reducers/exam";

const ListExamUser = () => {
  let { lstOptionExam } = useSelector((state: RootState) => state.examSlice);
  let navigate = useNavigate();
  let dispatch: DispatchType = useDispatch();
  const getDetail = async (id: number, name: string, typeDrawer: string) => {
    dispatch(getExamDetailShow({ name: name }));
    await dispatch(getFullExamDetailApi(id));
    await dispatch(setDrawerInfo({ typeContent: typeDrawer, sizeDrawer: Constants.sizeDrawer.LARGE }));
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "80%",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (text: string) => <Link to={`${AppRoutes.public.home}`}>{text}</Link>
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (text: string, record: ExamOptionModel) => (
        <Space size="middle">
          <Button onClick={async () => {
            await getDetail(record.id, record.name, Constants.typeDrawer.VIEW_EXAM);
          }}>View</Button>
          <Button onClick={async () => {
            await getDetail(record.id, record.name, Constants.typeDrawer.EDIT_EXAM);
          }}>Edit</Button>
          <Popconfirm
            placement="topRight"
            title={"Are you sure to delete this exam"}
            onConfirm={async () => {
              await dispatch(deleteExamApi(record.id));
            }}
            okType="danger"
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  useEffect(() => {
    dispatch(getExamOptionApi());
  }, []);

  return (
    <UserAdminContainer>
      <div className="mt-4 mb-8 flex justify-between items-center">
        <Button className="font-medium" size="large" onClick={async () => {
          navigate(AppRoutes.private.user.create_exam);
        }}>Create Exam</Button>
        <p className="mx-4 font-medium text-base"><span>Total Exams: </span><span>{lstOptionExam?.length}</span>
        </p>
      </div>
      <Table rowKey={'id'} columns={columns} dataSource={lstOptionExam} />
    </UserAdminContainer>
  );
};


export default ListExamUser;