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

const { TextArea } = Input;
type Props = {}

const DefaultCreateContestFormValue: CreateContestFormModel = {
  name: "",
  description: "",
  duration: 30,
  timeStart: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
  contestantList: null,
  exam: null
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
      duration: Yup.number().typeError(t("detail.duration must be number")).required(t("detail.duration is required")).min(AppConfigs.exam.MIN_DURATION_EXAM, t("detail.minium duration is {{duration}} min", { duration: AppConfigs.exam.MIN_DURATION_EXAM })).max(AppConfigs.exam.MAX_DURATION_EXAM, t("detail.maxium duration is {{duration}} min", { duration: AppConfigs.exam.MAX_DURATION_EXAM })),
      timeStart: Yup.date().typeError(t("detail.time start must be timestamp")).required(t("detail.time start is required")).min(dayjs().add(AppConfigs.exam.MIN_PERIOD_CONTEST - 1, "day"), t("detail.the contest must start at least {{duration}} days from the date of creation", { duration: AppConfigs.exam.MIN_PERIOD_CONTEST })),
      contestantList: Yup.mixed().required(t("detail.file is required")),
      exam: Yup.string().required(t("detail.exam is required"))
    }),
    onSubmit: (value) => {
      let contestDetail = {
        name: value.name,
        description: value.description,
        duration: value.duration,
        timeStart: dayjs(value.timeStart).format("YYYY-MM-DD hh:mm"),
        contestantList: value.contestantList,
        exam: value.exam
      };
    //TODO: create contest
    }
  });
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };
  let handleChangeDatePicker = (value: Dayjs | null) => {
    formik.setFieldValue("timeStart", value);
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
                formik.setFieldValue("exam", value);
              }}
            />
            <p className="mt-1 text-red-500">{formik.errors.exam}</p>
          </FormItem>
          <Form.Item label={t("detail.duration")}>
            <InputNumber style={{ maxWidth: 150 }} addonAfter="minutes" name="duration" min={1}
                         value={formik.values.duration} onChange={(durationValue) => {
              formik.setFieldValue("duration", durationValue);
            }} />
            <p className="mt-1 text-red-500">{formik.errors.duration}</p>
          </Form.Item>
          <Form.Item label={t("detail.start time")}>
            <DatePicker
              name="timeStart"
              disabledDate={disabledDate}
              format={"YYYY-MM-DD hh:mm:ss"}
              showTime
              defaultValue={dayjs(formik.values.timeStart)}
              onOk={(time) => {
                handleChangeDatePicker(time);
              }} />
            <p className="mt-1 text-red-500">{formik.errors.timeStart}</p>
          </Form.Item>
          <Form.Item label={t("detail.contestant list")}>
            <Upload name="contestantList"
                    accept=".csv"
                    multiple={false}
                    maxCount={1}
                    onChange={(file) => {
                      formik.setFieldValue("contestantList", file.file);
                    }}
                    onRemove={(file) => {
                      formik.setFieldValue("contestantList", null);
                    }}>
              <Button icon={<UploadOutlined className="-translate-y-1" />}>Click to Upload CSV File</Button>
            </Upload>
            <p className="mt-1 text-red-500">{formik.errors.contestantList}</p>
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