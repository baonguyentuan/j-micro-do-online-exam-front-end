import React, { useState } from "react";
import { Form, Modal, Rate } from "antd";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { DispatchType, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { getFeedbacksByExam,editFeedBack } from "../../redux/reducers/feedback";
import { openNotificationWithIcon } from "../../utils/operate";

interface IFeedbackModelProps {
  examID: number,
  feedID: number,
  vote: number,
  comment: string
  buttonName: string,
  searchData: any
}

const FeedbackModal = (props: IFeedbackModelProps) => {
  const { t } = useTranslation("contest");
  const dispatch: DispatchType = useDispatch();
  const [open, setOpen] = useState(false);
  const [oldFeedback, setOldFeedback] = useState({
    comment: props.comment,
    vote: props.vote
  });
  const { loading } = useSelector((state: RootState) => state.feedBackSlice);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
    formik.values.vote = props.vote;
    formik.values.comment = props.comment;
  };

  const formik = useFormik({
    initialValues: oldFeedback,
    validationSchema: Yup.object({
      vote: Yup.number().min(1, t("feedback.you must be vote")),
      comment: Yup.string().required("Your review is required!")
    }),
    onSubmit: async (formValue) => {
      let flag = false;
      const result = await dispatch(editFeedBack({
        id: props.feedID,
        data:{
          examID: props.examID,
          comment: formValue.comment,
          vote: formValue.vote
        }
      }));

      
      if(editFeedBack.rejected.match(result)){
        //TODO: handler error
        flag = true
      }
      hideModal();
      if(flag){
        return;
      }

      openNotificationWithIcon("success", result?.payload?.message, "", 1);

      await dispatch(getFeedbacksByExam(props.searchData))
    }
  });

  return (
    <>
      <button onClick={showModal}
              className="text-white text-medium bg-blue-500 hover:bg-blue-400 rounded py-1 px-2 flex items-center gap-3"
              style={{ minWidth: "5rem" }}><EditOutlined /><span>{props.buttonName}</span>
      </button>
      <Modal
        closable={false}
        maskClosable={false}
        title="Edit feedback modal"
        open={open}
        onOk={() => formik.handleSubmit()}
        onCancel={hideModal}
        okText="Ok"
        okButtonProps={{
          loading,
          type: "primary",
          style: {
            backgroundColor: "#1D5D9B"
          },
          disabled: oldFeedback.vote === formik.values.vote && oldFeedback.comment === formik.values.comment
        }}
        cancelButtonProps={{
          disabled:loading
        }}
        cancelText="Cancel"
      >
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
              <span
                className="inline-block text-red-400 mt-2">{formik.errors.comment ? formik.errors.comment : ""}</span>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackModal;