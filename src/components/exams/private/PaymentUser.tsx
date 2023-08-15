import { ClockCircleOutlined } from "@ant-design/icons";
import { UserAdminContainer } from "../../../assets/styles/userAdminStyles";
import { Link } from "react-router-dom";
import AppRoutes from "../../../constants/AppRoutes";
import React from "react";
import { Button, Table, Tag } from "antd";
import { useDispatch } from "react-redux";
import { DispatchType, RootState } from "../../../redux/configStore";
import { GlobalAccountModalActionType, triggerGlobalAccountModal } from "../../../redux/reducers/global-slice";
import { useSelector } from "react-redux";

function PaymentUser() {
  let dispatch: DispatchType = useDispatch()
  let { userInfo } = useSelector((state: RootState) => state.userSlice)
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
      <h2 className="font-medium text-xl mb-4">Payment history</h2>
      <div className="font-medium flex items-center justify-between">
        <div>
          <div className="">
            <p>Description: Tải khoản dùng thử sẽ có 1 số hạn chế trong việc sử dụng đối với trang web</p>
            <ul>
              <li>Số lượng bài thi tải lên hệ thống tối đa là 5</li>
              <li>Số lượng cuộc thi tạo tối đa là 3</li>
              <li>Thời gian tạo cuộc thi hợp lệ là trước 2 ngày kể từ ngày tạo cuộc thi. Sau khi tạo cuộc thi thành công thi
                không có quyền sửa lại cuộc thi.
              </li>
            </ul>

          </div>
        </div>
        <div className="flex flex-col items-center">
          <p>Account type: </p>
          <Tag color="cyan" className="my-2 text-base">{userInfo?.roles.findIndex(role => role === "USER_PREMIUM") !== -1 ? "USER_PREMIUM" : "USER"}</Tag>
          <Button className="btn__banner" size="large" onClick={() => {
            dispatch(triggerGlobalAccountModal({ type: GlobalAccountModalActionType.OPEN }))
          }}>Gia hạn</Button>
        </div>
      </div>

      {/* TODO: Generate list payment */}
      {/* <div className='mt-6'>
        <Table rowKey={'id'} columns={columns} dataSource={data} />
      </div> */}
    </UserAdminContainer>
  );
}

export default PaymentUser;