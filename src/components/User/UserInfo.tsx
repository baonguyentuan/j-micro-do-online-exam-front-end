import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UserAdminContainer } from "../../assets/styles/userAdminStyles";
import { useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { useFormik } from "formik";
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from "react-redux";
import { getUserInfo, updateUserInfoApi, updateUserThumbnailApi } from "../../redux/reducers/user/userSlice";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
type Props = {}

function UserInfo({ }: Props) {
  let { userInfo } = useSelector((state: RootState) => state.userSlice)
  let dispatch: DispatchType = useDispatch()
  let [file, setFile] = useState<any>(null)
  const { t } = useTranslation("user");
  let currentInfo
  if (userInfo) {
    currentInfo = { ...userInfo }
  } else {
    currentInfo = {
      id: -1,
      username: '',
      phone: '',
      email: '',
      createAt: '',
      address: '',
      birthday: '',
      image: '',
      roles: []
    }
  }
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: currentInfo,
    // validationSchema:Yup.object({
    //   email: Yup.string().email(t("invalid_email_address")).required(t("required")),
    //   username: Yup.string().min(6, t("minimum_character")).required(t("required"))
    // }),
    onSubmit: async (formValue) => {
      const result = await dispatch(updateUserInfoApi({
        userName: formValue.username,
        email: formValue.email,
        phone: formValue.phone,
        birthday: formValue.birthday,
        address: formValue.address
      }))
      await dispatch(getUserInfo())
    }
  })
  useEffect(() => {
    dispatch(getUserInfo())
  }, [userInfo])
  return (
    <UserAdminContainer>
      <Form className="mt-8" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item label={"Username"} >
              <Input name='username' value={formik.values.username} onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label={"Email"} >
              <Input name='email' value={formik.values.email} onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label={"Phone"} >
              <Input name='phone' value={formik.values.phone ? formik.values.phone : ''} onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label={"Address"} >
              <Input name='address' value={formik.values.address ? formik.values.address : ''} onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label={"Birthday"} >
              <DatePicker
                name='birthday'
                format={'YYYY-MM-DD'}
                value={formik.values.birthday ? dayjs(formik.values.birthday) : null}
                onChange={(time) => {
                  formik.setFieldValue('birthday', time)
                }} />
            </Form.Item>
            <Form.Item className="text-center">
              <Space>
                <Button onClick={() => { formik.handleSubmit() }}>Save change</Button>
              </Space>
            </Form.Item>
          </Col>
          <Col span={12}>
            <div className=" w-full h-full">
              <div className="flex flex-col justify-around w-full h-full">
                <h2 className="text-center font-medium text-xl mb-2">Avatar</h2>
                <Space className="m-auto">
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
                      return null
                    }}
                    maxCount={1}
                    fileList={file ? [file] : []}
                    onChange={(file) => {
                      if (file.file) {
                        setFile(file.file)
                      }
                    }}>
                    <Button icon={<UploadOutlined />} />
                  </Upload>
                  {formik.values.image !== "" ? <img width={100} height={100} className="border-2 border-green-300 rounded-full" src={formik.values.image} alt={formik.values.username} /> : null}
                </Space>

                <Button disabled={file ? false : true} className="text-center m-auto" onClick={async () => {
                  let formData = new FormData()
                  formData.append("file", file, file.name)
                  await dispatch(updateUserThumbnailApi(formData))
                  await dispatch(getUserInfo())
                  await setFile(null)
                }}>Change image</Button>
              </div>
            </div>
          </Col>
        </Row>

      </Form>
    </UserAdminContainer>
  );
}

export default UserInfo;