import { Button, Space, Table } from "antd";
import React from "react";
import { UserAdminContainer } from "../../assets/styles/userAdminStyles";
import { useNavigate } from "react-router-dom";

type Props = {}

const ListContestUser = (props: Props) => {
  let navigate = useNavigate();
  const columns = [
    {
      title: "Numeric order",
      dataIndex: "numericOrder",
      key: "numericOrder",
      width: "10%",
      render: (text: string, record: any, index: number) => <a>{index + 1}</a>
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "60%",
      render: (text: string) => <a>{text}</a>
    },
    {
      title: "Duration (min)",
      dataIndex: "duration",
      key: "duration",
      width: "15%"
    },
    {
      title: "Time start",
      dataIndex: "timeStart",
      key: "timeStart",
      width: "10%"
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      )
    }
  ];

  const data: any = [];
  return (
    <UserAdminContainer>
      <div className="mt-4 mb-8 flex justify-between items-center">
        <Button className="font-medium" size="large" onClick={async () => {
          navigate("/create_exam");
        }}>Create Contest</Button>
        <p className="mx-4 font-medium text-base"><span>Total Contests: </span><span>0</span></p>
      </div>
      <div>
        <Table rowKey={"id"} columns={columns} dataSource={data} />
      </div>
    </UserAdminContainer>
  );
};

export default ListContestUser;