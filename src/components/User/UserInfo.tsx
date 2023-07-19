import { Button, Col, DatePicker, Form, Input, Row, Space, Upload } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { UserAdminContainer } from "../../assets/styles/userAdminStyles";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configStore";
import { useFormik } from "formik";
import dayjs, {Dayjs} from 'dayjs';

type Props = {}

function UserInfo({ }: Props) {
  let { userInfo } = useSelector((state: RootState) => state.userSlice)
  let currentInfo
  if (userInfo) {
    currentInfo = {...userInfo}
  } else {
    currentInfo = {
      id: -1,
      username: '',
      phone: '',
      email: '',
      createAt: '',
      address: '',
      birthday: '',
      roles: []
    }
  }
  console.log(currentInfo);
  
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: currentInfo,
    onSubmit: (formValue) => {
      console.log(formValue);

    }
  })
  return (
    <UserAdminContainer>
      <Form className="mt-8" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item label={"Username"} >
              <Input name='username' value={formik.values.username} onChange={formik.handleChange}/>
            </Form.Item>
            <Form.Item label={"Email"} >
              <Input name='email' value={formik.values.email} onChange={formik.handleChange}/>
            </Form.Item>
            <Form.Item label={"Phone"} >
              <Input name='phone' value={formik.values.phone ? formik.values.phone:''} onChange={formik.handleChange}/>
            </Form.Item>
            <Form.Item label={"Address"} >
              <Input name='address' value={formik.values.address ? formik.values.address:''} onChange={formik.handleChange}/>
            </Form.Item>
            <Form.Item label={"Birthday"} >
              <DatePicker 
              name='birthday'
              format={'YYYY-MM-DD'}
              value={formik.values.birthday ? dayjs(formik.values.birthday):dayjs()}
              onOk={(time)=>{
                formik.setFieldValue('birthday', time)
              }}/>
            </Form.Item>
            <Form.Item className="text-center">
              <Space>
                <Button onClick={()=>{formik.handleSubmit()}}>Save change</Button>
              </Space>
            </Form.Item>
          </Col>
          <Col span={12}>
            <div className=" w-full h-full">
              <div className="flex flex-col justify-around w-full h-full">
                <h2 className="text-center font-medium text-xl mb-2">Avatar</h2>
                <Upload
                  className="text-center"
                  style={{ width: 150 }}
                  name="file"
                  accept="image/img, image/jpg, image/png, image/jpeg, image/gif"
                  beforeUpload={() => {
                    return false;
                  }}
                  listType="picture-circle"
                  multiple={false}
                  onPreview={(file) => {
                  }}
                  maxCount={1}
                  onChange={(file) => {
                  }}>
                  <Button icon={<UploadOutlined />} />
                </Upload>
                <Button className="text-center m-auto">Save change</Button>
              </div>
            </div>
          </Col>
        </Row>

      </Form>
    </UserAdminContainer>
  );
}

export default UserInfo;