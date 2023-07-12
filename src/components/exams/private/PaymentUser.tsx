import { ClockCircleOutlined } from "@ant-design/icons";
import { UserAdminContainer } from "../../../assets/styles/userAdminStyles";
import { Link } from "react-router-dom";
import AppRoutes from "../../../constants/AppRoutes";
import React from "react";
import { Table } from "antd";

function PaymentUser() {
  const data: any = [];
  
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "85%",
      render: (text: string) => <Link to={`${AppRoutes.public.home}`}>{text}</Link>
    },
    {
      title: "Action",
      key: "action",
      width: "10%"
    }
  ];
  
  return (
    <UserAdminContainer>
      <div className="font-medium flex items-center justify-between">
        <h2 className="font-medium text-lg">Payment history</h2>
        <div className="flex flex-col items-center">
          <p>Account type: Trial</p>
          <p>Thời gian hết hạn</p>
          <p className="flex items-center gap-2">
            <ClockCircleOutlined /> <span className="text-xl">09:00:00</span>
          </p>
        </div>
      </div>
      <div>
        <p>Description: Tải khoản dùng thử sẽ có 1 số hạn chế trong việc sử dụng đối với trang web</p>
        <ul>
          <li>Số lượng bài thi tải lên hệ thống tối đa là 5</li>
          <li>Số lượng cuộc thi tạo tối đa là 3</li>
          <li>Thời gian tạo cuộc thi hợp lệ là trước 2 ngày kể từ ngày tạo cuộc thi. Sau khi tạo cuộc thi thành công thi
            không có quyền sửa lại cuộc thi.
          </li>
        </ul>
      </div>
      {/* TODO: Generate list payment */}
      <div className='mt-6'>
        <Table rowKey={'id'} columns={columns} dataSource={data} />
      </div>
    </UserAdminContainer>
  );
}

export default PaymentUser;