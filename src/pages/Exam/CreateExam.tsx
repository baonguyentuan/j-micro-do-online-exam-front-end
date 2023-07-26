import React, { useEffect, useState } from "react";
import type { SelectProps } from "antd";
import { Button, Col, Form, Input, InputNumber, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import AppConfigs from "../../config/AppConfigs";
import Constants from "../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import CreateQuestion from "../../components/exams/private/CreateQuestion";
import { QuestionExamSubmitModel, QuestionRowModel } from "../../_core/exam";
import { getCategoryOptionApi } from "../../redux/reducers/category/categorySlice";
import { createExamApi, editExamApi, getFullExamDetail, updateThumbnailExamApi, getExamDetailShow } from "../../redux/reducers/exam";
import { getUserInfo } from "../../redux/reducers/user/userSlice";

const { TextArea } = Input;
type Props = {
  status: string
}
const CreateExam = ({ status }: Props) => {
  const dispatch: DispatchType = useDispatch();
  let [isNewQuestion, setIsNewQuestion] = useState<boolean>(false);
  const { userInfo } = useSelector((state: RootState) => state.userSlice);
  const { lstCategoryOption } = useSelector((state: RootState) => state.categorySlice);
  const { fullExamDetail, examGetDetail } = useSelector((state: RootState) => state.examSlice);
  const [file, setFile] = useState<{ file: File | null, fileSrc: any, filePath: string }>({
    file: null,
    fileSrc: "",
    filePath: ""
  });

  let { t } = useTranslation("contest");

  const optionsCategory: SelectProps["options"] = [];

  lstCategoryOption.map((categoryItem, index) => {
    optionsCategory.push({
      label: categoryItem.name,
      value: categoryItem.id
    });
  });

  let startValue;
  if (status === Constants.formStatus.CREATE) {
    startValue = {
      title: fullExamDetail.title,
      categoryId: fullExamDetail.categoryId,
      examType: fullExamDetail.examType,
      description: fullExamDetail.description,
      duration: fullExamDetail.duration,
      question: fullExamDetail.question,
      file: fullExamDetail.file
    };
  } else {
    startValue = {
      title: fullExamDetail.title,
      categoryId: fullExamDetail.categoryId,
      examType: examGetDetail.examType,
      description: fullExamDetail.description,
      duration: fullExamDetail.duration,
      question: fullExamDetail.question,
      file: examGetDetail.image
    };
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: startValue,
    onSubmit: (formValue) => {
      let formData = new FormData();
      if (status === Constants.formStatus.EDIT) {
        let lstCreateQuestion: QuestionExamSubmitModel[] = [];
        formValue.question.map((questionItem, index) => {
          lstCreateQuestion.push({
            questionType: questionItem.questionType.toUpperCase(),
            questionPoint: questionItem.questionPoint,
            question: questionItem.question,
            answers: questionItem.answers,
            correctAnswers: questionItem.correctAnswers
          });
        });
        dispatch(editExamApi({
          id: fullExamDetail.id,
          title: formValue.title,
          duration: formValue.duration,
          categoryId: formValue.categoryId,
          description: formValue.description,
          questions: lstCreateQuestion
        }));
      } else {
        if (typeof formValue.file === "object" && formValue.file) {
          formData.append("file", formValue.file, formValue.file?.name);
        }
        formData.append("title", formValue.title);
        formData.append("duration ", JSON.stringify(formValue.duration));
        formData.append("categoryId", JSON.stringify(formValue.categoryId));
        formData.append("description", formValue.description);
        formData.append("examType", formValue.examType);
        let lstCreateQuestion: QuestionExamSubmitModel[] = [];
        formValue.question.map((questionItem, index) => {
          lstCreateQuestion.push({
            questionType: questionItem.questionType.toUpperCase(),
            questionPoint: questionItem.questionPoint,
            question: questionItem.question,
            answers: questionItem.answers,
            correctAnswers: questionItem.correctAnswers
          });
        });
        formData.append("questions", JSON.stringify(lstCreateQuestion
        ));
        dispatch(createExamApi(formData));
      }
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(t("detail.name is required")),
      description: Yup.string().required(t("detail.description is required")),
      categoryId: Yup.number().typeError(t("detail.category is required")).required(t("detail.category is required")),
      duration: Yup.number().typeError(t("detail.duration must be number")).required(t("detail.duration is required")).min(AppConfigs.exam.MIN_DURATION_EXAM, t("detail.minium duration is {{duration}} min", { duration: AppConfigs.exam.MIN_DURATION_EXAM })).max(AppConfigs.exam.MAX_DURATION_EXAM, t("detail.maxium duration is {{duration}} min", { duration: AppConfigs.exam.MAX_DURATION_EXAM })),
      question: Yup.array().min(AppConfigs.exam.MIN_QUESTION_EXAM, t("exam.Each exam have at least {{min}} question and max {{max}} question", {
        min: AppConfigs.exam.MIN_QUESTION_EXAM,
        max: AppConfigs.exam.MAX_QUESTION_EXAM
      })).max(AppConfigs.exam.MAX_QUESTION_EXAM, t("exam.Each exam have at least {{min}} question and max {{max}} question", {
        min: AppConfigs.exam.MIN_QUESTION_EXAM,
        max: AppConfigs.exam.MAX_QUESTION_EXAM
      })),
      file: Yup.mixed().required(t("detail.file is required"))
    })
  });
  const renderThumbnailInput = () => {
    if (status === Constants.formStatus.EDIT) {
      return <Form.Item label={t("detail.thumbnail")}>
        {file.file ? <img width={150} height={150} src={file.fileSrc} alt={formik.values.examType} /> :
          <img width={150} height={150} src={typeof formik.values.file === "string" ? formik.values.file : ""}
               alt={formik.values.examType} />}
        <Input
          className="my-4"
          value={file.filePath}
          multiple={false}
          type="file"
          accept="image/img, image/jpg, image/png, image/jpeg, image/gif"
          onChange={async (event) => {
            if (event.target.files) {
              let file = event.target.files[0];
              let reader = new FileReader();
              reader.onload = (e) => {
                if (e.target) {
                  setFile({
                    file,
                    filePath: event.target.value,
                    fileSrc: e.target.result
                  });
                }
              };
              reader.readAsDataURL(file);
            }
          }} />
        <Button className="btn__contest" disabled={file.file ? false : true} onClick={() => {
          let formData = new FormData();
          formData.append("id", fullExamDetail.id.toString());
          if (file.file) {
            formData.append("file", file.file, file.file?.name);
          }
          dispatch(updateThumbnailExamApi(formData));
          setFile({
            file: null,
            fileSrc: "",
            filePath: ""
          });
        }}>Update Thumbnail</Button>
      </Form.Item>;
    } else {
      return <Form.Item label={t("detail.thumbnail")}>
        <Upload
          name="file"
          accept="image/img, image/jpg, image/png, image/jpeg, image/gif"
          beforeUpload={() => {
            return false;
          }}
          listType="picture"
          multiple={false}
          onPreview={(file) => {
          }}
          maxCount={1}
          onChange={(file) => {
            formik.setFieldValue("file", file.file);
          }}>
          <Button icon={<UploadOutlined className="-translate-y-1" />}>Choose Image</Button>
        </Upload>
        <p className="mt-1 text-red-500">{formik.errors.file}</p>
      </Form.Item>;
    }
  };
  const setLstQuestion = (value: QuestionRowModel[]) => {
    return formik.setFieldValue("question", value);
  };
  const disableSubmit = () => {
    let status: boolean = false;
    if (isNewQuestion) {
      return true;
    }
    for (let error in formik.errors) {
      if (error) {
        status = true;
        break;
      }
    }
    return status;
  };
  useEffect(() => {
    let setData = async () => {
      if (status === Constants.formStatus.CREATE) {
        let type = userInfo?.roles.find(roleItem => roleItem === "ADMIN") === "ADMIN" ? "FREE" : "PRIVATE";
        await dispatch(getFullExamDetail({
          examDetail: {
            id: -1,
            title: "",
            categoryId: null,
            examType: type,
            description: "",
            duration: AppConfigs.exam.MIN_DURATION_EXAM,
            question: [],
            file: null
          }
        }));
        await dispatch(getExamDetailShow({
          id: -1,
          image: "",
          examType: type,
          examName: "",
          createAt: "",
          duration: AppConfigs.exam.MIN_DURATION_EXAM,
          totalRating: 0,
          categoryID: null,
          description: "",
          categoryName: "",
          downloadNumber: 0
        }));
      }
      await dispatch(getCategoryOptionApi());
    };
    setData();
  }, []);

  return (
    <div className="size__component py-4" style={{ minHeight: "70vh" }}>
      {status === Constants.formStatus.EDIT ?
        <h1 className="text-center font-bold text-2xl m-4">{t("exam.Update exam")}</h1> :
        <h1 className="text-center font-bold text-2xl m-4">{t("exam.Create exam")}</h1>}
      <Form labelAlign="left" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={16}>
            <Form.Item label={t("detail.name")} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              <Input name="title" onChange={formik.handleChange} value={formik.values.title} />
              <p className="mt-1 text-red-500">{formik.errors.title}</p>
            </Form.Item>
            <Form.Item label={t("detail.description")} labelCol={{ span: 4 }} wrapperCol={{ span: 22 }}>
              <TextArea
                rows={5}
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description} />
              <p className="mt-1 text-red-500">{formik.errors.description}</p>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={8}>
            <Form.Item label={t("detail.category")}>
              <Select
                style={{ width: "100%" }}
                showSearch
                placeholder="Please select"
                value={formik.values.categoryId}
                filterOption={(input, option) => (String(option?.label) ?? "").toLowerCase().includes(input)}
                filterSort={(optionA, optionB) =>
                  (String(optionA?.label) ?? "").toLowerCase().localeCompare((String(optionB?.label) ?? "").toLowerCase())
                }
                onChange={(value) => {
                  formik.setFieldValue("categoryId", value);
                }}
                options={optionsCategory}
              />
              <p className="mt-1 text-red-500">{formik.errors.categoryId}</p>
            </Form.Item>
            {
              userInfo?.roles?.find(roleItem => roleItem === "ADMIN") === "ADMIN" || status === Constants.formStatus.EDIT ?
                <Form.Item label={"Type"}>
                  <Select
                    style={{ width: 100 }}
                    disabled={status !== Constants.formStatus.CREATE}
                    value={formik.values.examType}
                    onChange={(value) => {
                      formik.setFieldValue("examType", value);
                    }
                    }
                    options={[{
                      label: "FREE", value: "FREE"
                    }, { label: "PREMIUM", value: "PREMIUM" }]}
                  />
                </Form.Item> : ""
            }
            <Form.Item label={t("detail.duration")}>
              <InputNumber
                style={{ maxWidth: 150 }}
                addonAfter={t("detail.minutes")}
                name="duration"
                min={AppConfigs.exam.MIN_DURATION_EXAM}
                value={formik.values.duration}
                onChange={(value) => {
                  formik.setFieldValue("duration", value);
                }}
              />
              <p className="mt-1 text-red-500">{formik.errors.duration}</p>
            </Form.Item>
            {renderThumbnailInput()}

          </Col>
        </Row>
        <Form.Item wrapperCol={{ span: 24 }}>
          <CreateQuestion
            questionList={formik.values.question}
            setLstQuestion={setLstQuestion}
            questionError={formik.errors.question}
            isNewQuestion={isNewQuestion}
            setIsNewQuestion={setIsNewQuestion}
          />
        </Form.Item>
        <Form.Item className="text-center" wrapperCol={{ span: 24 }}>
          <Button disabled={disableSubmit()} className="btn__contest" onClick={() => {
            formik.handleSubmit();
          }}>{status === Constants.formStatus.EDIT ? t("exam.Update exam") : t("exam.Send exam")}</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateExam;