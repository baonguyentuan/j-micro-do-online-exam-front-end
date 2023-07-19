import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Rate } from "antd";
import ReactQuill from "react-quill";
import React from "react";
import { CommentFormValue } from "../../../_core/CommentModel";
import { useTranslation } from "react-i18next";
import { postCreateFeedback } from "../../../redux/reducers/feedback";
import { DispatchType, RootState } from "../../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import AppRoutes from "../../../constants/AppRoutes";
import Constants from "../../../constants/Constants";
import { openNotificationWithIcon } from "../../../utils/operate";

const initialFormValue: CommentFormValue = {
  comment: "",
  vote: 0
};

const FeedBack = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { t } = useTranslation("contest");
  const dispatch: DispatchType = useDispatch();
  const {loading} = useSelector((state: RootState) => state.feedBackSlice)

  const formik = useFormik({
    initialValues: initialFormValue,
    validationSchema: Yup.object({
      vote: Yup.number().min(1, t("feedback.you must be vote")),
      comment: Yup.string().required("Your review is required!")
    }),
    onSubmit: async (formValue) => {
      let token =searchParams.get("token");
      let exam = searchParams.get("examID");
      if (exam !== null && token !== null) {
        // @ts-ignore
        let examID = +searchParams.get("examID");
        const result = await dispatch(postCreateFeedback({
          examID: examID,
          comment: formValue.comment,
          vote: formValue.vote
        }));
        formik.values.vote = 0;
        formik.values.comment = Constants.EmptyString;
        if(postCreateFeedback.rejected.match(result)){
          //TODO: handle error
          return;
        }
        
        openNotificationWithIcon('success', `${result?.payload?.message}`, '', 1)
        setTimeout(()=>{
          navigate(AppRoutes.public.home)
        },500)
      }
    }
  });

  return (
    <FeedbackWrapper className="flex justify-center relative">
      <Link to={AppRoutes.public.home} className="absolute font-medium bg-red-500 top-6 hover:bg-red-400
       right-6 text-white cursor-pointer h-10 w-10 rounded inline-block"><CloseOutlined className='relative' style={{top:'3px',left:'13px'}} /></Link>
      <div className="feedback_container p-4 bg-white rounded">
        <Form className="pb-2">
          <Form.Item label={`${t("feedback.vote")}:`} className="mb-1">
            <Rate
              className="-translate-y-1"
              value={formik.values.vote}
              onChange={(voteValue) => {
                formik.setFieldValue("vote", voteValue);
              }} />
            <span
              className="inline-block px-2 text-red-400 translate-x-4 -translate-y-1">{formik.errors.vote ? formik.errors.vote : ""}</span>
          </Form.Item>
          <Form.Item>
            <ReactQuill
              value={formik.values.comment}
              theme="snow"
              onChange={(commentValue) => {
                formik.setFieldValue("comment", commentValue);
              }}
            />
            <span className="inline-block text-red-400 mt-2">{formik.errors.comment ? formik.errors.comment : ""}</span>
          </Form.Item>
          <Form.Item>
            <Button loading={loading} size="large" htmlType="submit" onClick={() => {
              formik.handleSubmit();
            }}>{t("feedback.send feedback")}</Button>
          </Form.Item>
        </Form>
      </div>
    </FeedbackWrapper>
  );
};

const FeedbackWrapper = styled.section`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 100%;

  .feedback_container {
    min-width: 50rem;
    margin-top: 10rem;
    height: 35vh;
  }
`;

export default FeedBack;