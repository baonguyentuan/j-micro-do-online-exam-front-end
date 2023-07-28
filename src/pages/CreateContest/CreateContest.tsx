import React, { useEffect } from "react";
import type { SelectProps } from "antd";
import { Button, DatePicker, Form, Input, InputNumber, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RangePickerProps } from "antd/es/date-picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import FormItem from "antd/es/form/FormItem";
import "../../assets/css/contest/contest.css";
import { CreateContestFormModel } from "../../_core/contest";
import { useTranslation } from "react-i18next";
import { DispatchType, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import AppConfigs from "../../config/AppConfigs";
import { getExamOptionApi } from "../../redux/reducers/exam";
import Constants from "../../constants/Constants";
import { postCreateContest } from "../../redux/reducers/contest";

const { TextArea } = Input;
type Props = {}

const DefaultCreateContestFormValue: CreateContestFormModel = {
  name: "",
  description: "",
  endAt: dayjs(Date.now()).format(Constants.formatFullDate),
  startAt: dayjs(Date.now()).format(Constants.formatFullDate),
  file: null,
  examID: -1
};
const CreateContest = (props: Props) => {
  const optionsExam: SelectProps["options"] = [];
  let { t } = useTranslation("contest");
  let { lstOptionExam } = useSelector((state: RootState) => state.examSlice);
  let dispatch: DispatchType = useDispatch();
  lstOptionExam.map((examItem, index) => {
    optionsExam.push({
      label: examItem.name,
      value: examItem.id
    });
  });
  let formik = useFormik({
    initialValues: DefaultCreateContestFormValue,
    validationSchema: Yup.object({
      name: Yup.string().required(t("detail.name is required")),
      description: Yup.string().required(t("detail.description is required")),
      endAt: Yup.date().typeError(t("detail.time start must be timestamp")).required(t("detail.time start is required")).min(dayjs().add(AppConfigs.exam.MIN_PERIOD_CONTEST, "day"), t("detail.the contest must start at least {{duration}} days from the date of creation", { duration: AppConfigs.exam.MIN_PERIOD_CONTEST })),
      startAt: Yup.date().typeError(t("detail.time start must be timestamp")).required(t("detail.time start is required")).min(dayjs().add(AppConfigs.exam.MIN_PERIOD_CONTEST, "day"), t("detail.the contest must start at least {{duration}} days from the date of creation", { duration: AppConfigs.exam.MIN_PERIOD_CONTEST })),
      file: Yup.mixed().required(t("detail.file is required")),
      examID: Yup.string().required(t("detail.exam is required"))
    }),
    onSubmit: (value) => {
      let formData = new FormData()
      formData.append('name', value.name)
      formData.append('description', value.description)
      formData.append('endAt', dayjs(value.endAt).format(Constants.formatFullDate))
      formData.append('startAt', dayjs(value.startAt).format(Constants.formatFullDate))
      // console.log(typeof dayjs(value.startAt).format(Constants.formatFullDate));
      // console.log(dayjs(value.endAt).format(Constants.formatFullDate));

      //TODO: create contest
      if (value.file) {
        formData.append('file', value.file, value.file?.name)
      }
      formData.append('examID', value.examID.toString())
      dispatch(postCreateContest(formData))
    }
  });
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };
  let handleChangeDatePicker = (key: string, value: Dayjs | null) => {
    formik.setFieldValue(key, value);
  };
  useEffect(() => {
    dispatch(getExamOptionApi());
  }, []);
  return (
    <div id="createContest" className="size__component mb-8" style={{ minHeight: "70vh" }}>
      <div className="m-auto" style={{ maxWidth: 700 }}>
        <Form className="" labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item className="text-center" wrapperCol={{ span: 24 }}>
            <h1 className="text__title m-8">{t("contest.create contest")}</h1>
          </Form.Item>
          <Form.Item label={t("detail.name")}>
            <Input name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <p className="mt-1 text-red-500">{formik.errors.name}</p>
          </Form.Item>
          <Form.Item label={t("detail.description")}>
            <TextArea rows={3} name="description" onChange={formik.handleChange} value={formik.values.description}
              onBlur={formik.handleBlur} />
            <p className="mt-1 text-red-500">{formik.errors.description}</p>
          </Form.Item>
          <FormItem label={t("detail.choose exam")}>
            <Select
              style={{ width: "100%" }}
              showSearch
              placeholder={t("detail.select exam")}
              optionFilterProp="children"
              filterOption={(input, option) => (String(option?.label) ?? "").toLowerCase().includes(input)}
              filterSort={(optionA, optionB) =>
                (String(optionA?.label) ?? "").toLowerCase().localeCompare((String(optionB?.label) ?? "").toLowerCase())
              }
              options={optionsExam}
              onChange={(value) => {
                formik.setFieldValue("examID", value);
              }}
            />
            <p className="mt-1 text-red-500">{formik.errors.examID}</p>
          </FormItem>
          <Form.Item label={t("detail.start at")}>
            <DatePicker
              name="startAt"
              disabledDate={disabledDate}
              format={Constants.formatFullDate}
              showTime
              defaultValue={dayjs(formik.values.startAt)}
              onOk={(time) => {
                handleChangeDatePicker("startAt", time);
              }} />
            <p className="mt-1 text-red-500">{formik.errors.startAt}</p>
          </Form.Item>
          <Form.Item label={t("detail.end at")}>
            <DatePicker
              name="endAt"
              disabledDate={disabledDate}
              format={Constants.formatFullDate}
              showTime
              defaultValue={dayjs(formik.values.endAt)}
              onOk={(time) => {
                handleChangeDatePicker("endAt", time);
              }} />
            <p className="mt-1 text-red-500">{formik.errors.endAt}</p>
          </Form.Item>
          <Form.Item label={t("detail.contestant list")}>
            <Upload name="file"
              accept=".csv"
              multiple={false}
              maxCount={1}
              beforeUpload={() => {
                return false;
              }}
              onPreview={(file) => {
                return false;
              }}
              onChange={(file) => {
                formik.setFieldValue("file", file.file);
              }}
              onRemove={(file) => {
                formik.setFieldValue("file", null);
              }}>
              <Button icon={<UploadOutlined className="-translate-y-1" />}>Click to Upload CSV File</Button>
            </Upload>
            <p className="mt-1 text-red-500">{formik.errors.file}</p>
          </Form.Item>

          <Form.Item className="text-center" wrapperCol={{ span: 24 }}>
            <Button className="btn__contest" onClick={() => {
              formik.handleSubmit();
            }}>Create Contest</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateContest;