import { useEffect } from "react";
import styled from "styled-components";
import AppRoutes from "../../../constants/AppRoutes";
import Constants from "../../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Form, Input, Modal } from "antd";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../../../utils/local-storage";
import { openNotificationWithIcon } from "../../../utils/operate";
import { getContestByUser } from "../../../redux/reducers/contest";
import { DispatchType, RootState } from "../../../redux/configStore";
import { postLoginWithExamAccount } from "../../../redux/reducers/auth";
import { ExclamationCircleOutlined, Html5Outlined, LoadingOutlined } from "@ant-design/icons";

const LoginExamAccount = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const dispatch: DispatchType = useDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const { loading: LoadingLogin } = useSelector((state: RootState) => state.authSlice);
  const { loading: LoadingContest, contestInfo } = useSelector((state: RootState) => state.contestSlice);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      confirm();
    }
  }, [searchParams.get("token")]);

  const confirm = () => {
    modal.confirm({
      title: "Warning action!",
      icon: <ExclamationCircleOutlined />,
      content: <p className="font-medium text-lg">You can not access the route</p>,
      closable: true,
      closeIcon: <p className="text-red-500" onClick={() => {
        navigate(AppRoutes.public.home);
      }}>x</p>,
      footer: null
    });
  };

  const handleSubmit = async (values: any) => {
    const result = await dispatch(postLoginWithExamAccount({ ...values, validateToken: searchParams.get("token") }));

    if (postLoginWithExamAccount.rejected.match(result)) {
      //TODO: handler error
      return;
    }
    
    setLocalStorage(Constants.localStorageKey.userExamToken, result?.payload["access-token"]);

    const contestInfo = await dispatch(getContestByUser());
    console.log(contestInfo);
    if (getContestByUser.rejected.match(contestInfo)) {
      localStorage.clear();
      return;
    }

    openNotificationWithIcon("success", "", "Accessing the contest successfully", 1);
  };

  return (
    <LoginExamAccountWrapper>
      {contextHolder}
      <div className="login__exam-container">
        {/*  */}
        <div>
          <p className="flex items-center gap-3 font-medium text-xl p-6">
            <Html5Outlined className="text-red-500" />
            <span>Take the contest</span>
          </p>
          <Divider className="mt-0" />
          <Form
            className="p-8 pb-0"
            layout="horizontal"
            requiredMark={false}
            labelAlign={"left"}
            onFinish={handleSubmit}
          >
            <Form.Item
              labelCol={{
                span: 5
              }}
              label={<p className="font-medium">Account number</p>}
              name="username"
              rules={[{ required: true, message: "username is required" }]}
            >
              <Input
                disabled={LoadingLogin}
                size="large"
                name="username"
              />
            </Form.Item>
            <Form.Item
              labelCol={{
                span: 5
              }}
              label={<p className="font-medium">Password</p>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "password is required"
                }
              ]}
            >
              <Input.Password disabled={LoadingLogin} name="password" size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full mt-2 font-semibold"
                htmlType="submit"
                size={"large"}
                loading={LoadingLogin}
                block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/*  */}
        {
          contestInfo?.examID !== undefined ?
            (<Link to={`/takeContest/${contestInfo?.examName}?token=${getLocalStorage(Constants.localStorageKey.userExamToken)}`}>
              <div className='px-7 font-medium'>
                <div className='p-6 border border-indigo-200 rounded'>
                  <p className='grid grid-cols-3'>
                    <span>ContestName</span>
                    <span className='col-span-2'>{contestInfo?.contestName}</span>
                  </p>
                  <p className='grid grid-cols-3'>
                    <span>Start at</span>
                    <span className='col-span-2'>{contestInfo?.startAt}</span>
                  </p>
                  <p className='grid grid-cols-3'>
                    <span>End at</span>
                    <span className='col-span-2'>{contestInfo?.endAt}</span>
                  </p>
                </div>
              </div>
            </Link>)
            :
            (LoadingContest && <div style={{height:"100px"}} className='flex items-center justify-center'>
              <LoadingOutlined className='text-2xl' />
            </div>)
        }
      </div>
    </LoginExamAccountWrapper>
  );
};

const LoginExamAccountWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);

  .login__exam-container {
    margin-top: 7rem;
    min-width: 40rem;
    max-height: 30rem;
    border-radius: 5px;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  }
`;

export default LoginExamAccount;