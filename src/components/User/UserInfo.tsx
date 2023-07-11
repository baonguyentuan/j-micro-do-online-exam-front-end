import { Button, Col, DatePicker, Form, Input, Row, Space, Upload } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { UserAdminContainer } from "../../assets/styles/userAdminStyles";

type Props = {}

function UserInfo({}: Props) {
  return (
    <UserAdminContainer>
      <Form className="mt-8" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item label={"Username"}>
              <Input />
            </Form.Item>
            <Form.Item label={"Email"}>
              <Input />
            </Form.Item>
            <Form.Item label={"Phone"}>
              <Input />
            </Form.Item>
            <Form.Item label={"Address"}>
              <Input />
            </Form.Item>
            <Form.Item label={"Birthday"}>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <div className=" w-full h-full">
              <div>
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
              </div>
            </div>
          </Col>
        </Row>
        <Form.Item>
          <Space>
            <Button>Change password</Button>
            <Button>Save change</Button>
          </Space>
        </Form.Item>
      </Form>
    </UserAdminContainer>
  );
}

export default UserInfo;