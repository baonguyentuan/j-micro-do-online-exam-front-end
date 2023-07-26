import { DispatchType, RootState } from "../../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  checkExamStatus,
  chooseExamAnswer,
  createAnswersStore,
  getExamDetailDo,
  postSubmitExam
} from "../../../redux/reducers/exam";
import AppConfigs from "../../../config/AppConfigs";
import { Modal, Pagination, Statistic } from "antd";
import Constants from "../../../constants/Constants";
import AppRoutes from "../../../constants/AppRoutes";
import { backToPosition } from "../../../utils/operate";
import { getLocalStorage } from "../../../utils/local-storage";
import { QuestionExamModel, QuestionResult } from "../../../_core/exam";
import { useNavigate, useParams } from "react-router-dom";
import { getStatusIsUserDoFeedBack } from "../../../redux/reducers/feedback";
import ExamModalResult from "../../../components/Modal/exam-result/ExamModalResult";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, TagsOutlined } from "@ant-design/icons";

const { Countdown } = Statistic;

const DoExam = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);
  const [isExamResultModalOpen, setExamResultModalOpen] = useState(false);

  const {
    examFetchDetail,
    examResult,
    examStartTime,
    finalExamResult
  } = useSelector((state: RootState) => state.examSlice);


  useEffect(() => {
    const fetchExamDetail = async () => {
      await dispatch(getExamDetailDo({ name: name }));
      await dispatch(createAnswersStore());
    };
    fetchExamDetail();
  }, [name]);

  const handleExamCountFinish = () => {
  };

  const handleExamSubmit = async () => {
    const pureAnswers = examResult.answers.reduce((result: any, ans: QuestionResult) => {
      const { id, answerSelected } = ans;
      result.push({ id, answers: answerSelected });
      return result;
    }, []);

    const resultSubmitExam: any = await dispatch(postSubmitExam(
      { ...examResult, startTimeExam: examStartTime, endTimeExam: Date.now(), answers: pureAnswers }));

    if (postSubmitExam.rejected.match(resultSubmitExam)) {
      //TODO: handle error
      return;
    }

    setSubmitModalOpen(true);
    setExamResultModalOpen(true);
  };

  const getExamResult = async () => {
    if (getLocalStorage(Constants.localStorageKey.userExamToken) == null) {
      const resultCheckFeedback: any = await dispatch(getStatusIsUserDoFeedBack({ id: examResult.id }));
      if (getStatusIsUserDoFeedBack.rejected.match(resultCheckFeedback)) {
        //TODO: handle error
        return;
      }
      setTimeout(() => {
        if (!resultCheckFeedback?.payload?.data) {
          navigate(`${AppRoutes.private.user.feedback}?token=${getLocalStorage(Constants.localStorageKey.accessToken)}&examID=${examResult.id}`);
        } else {
          navigate(AppRoutes.public.home);
        }
      }, 500);
    } else {
      navigate(`${AppRoutes.private.user.feedback}?token=${getLocalStorage(Constants.localStorageKey.userExamToken)}&examID=${examResult.id}`);
    }
  };

  return (
    <>
      {isExamResultModalOpen &&
        <ExamModalResult callback={getExamResult} data={finalExamResult} flag={isExamResultModalOpen} />}
      <div className="size__component grid grid-cols-6 gap-10 py-8">

        <div className="col-span-2 ">
          <div className="sticky right-0 top-5 flex flex-col">

            <div className="px-3 py-5 m-2 border-2 border-solid rounded-2xl ">
              <h1 className="font-medium text-xl">Exam: {examFetchDetail?.examName}</h1>
              <div>
                <div className="mb-2 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="relative bottom-1 text-green-700"><TagsOutlined /></span>
                    <div><span className="font-medium">Category:</span> <span
                      className="italic">{examFetchDetail?.categoryName}</span></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="relative bottom-1 text-blue-600"><ClockCircleOutlined /></span>
                      <span><span className="font-medium">Duration:</span> {examFetchDetail?.duration} min</span></div>
                  </div>
                </div>
                {
                  !isExamResultModalOpen ? (<Countdown
                    title="Exam end in"
                    value={examStartTime + (60000 * examFetchDetail?.duration)}
                    valueStyle={{ fontSize: 30 }}
                    format="HH:mm:ss"
                    onFinish={handleExamCountFinish} />) : (
                    <p className="text-red-500 text-lg">Ended</p>
                  )
                }

              </div>
              <div className="mt-4">
                <ExamSubmitModal flag={isSubmitModalOpen} submit={handleExamSubmit} />
              </div>
            </div>

            <div className="px-3 pt-3 pb-10 m-2 border-2 border-solid rounded-2xl overflow-y-auto"
                 style={{ height: "300px" }}>
              <h1 className="font-medium text-xl my-2">Quản lý câu trả lời</h1>
              <div className="mb-2 flex gap-5">
                <p><span><CheckCircleOutlined
                  className="-translate-y-1 text-green-600" /></span> : <span className="font-medium">Đã trả lời</span>
                </p>
                <p><span><CloseCircleOutlined
                  className="-translate-y-1 text-red-600" /></span> : <span className="font-medium">Chưa trả lời</span>
                </p>
              </div>

              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 2 mt-4">
                {examResult?.answers.map((answer, answerIndex) => {
                  return <div onClick={() => {
                    setCurrentPage(Math.floor((answerIndex) / AppConfigs.pagination.DEFAULT_PAGE_SIZE) + 1);
                    let topScroll = document.getElementById(`question-${answerIndex + 1}`)?.offsetTop;
                    if (topScroll) {
                      backToPosition(topScroll);
                    }
                  }} key={`question-${answerIndex}`}
                              className="flex justify-between items-center border-2 border-solid rounded py-1 px-3 hover:bg-neutral-50 cursor-pointer">
                    <span className="font-medium">{`${answerIndex + 1}`}</span>
                    {
                      answer.answerSelected.length > 0 ?
                        <span><CheckCircleOutlined className="-translate-y-1 text-green-600 text-xl" /></span> :
                        <span><CloseCircleOutlined className="-translate-y-1 text-red-600 text-xl" /></span>
                    }
                  </div>;
                })}
              </div>

            </div>
            {
              examResult !== undefined ? (
                <Pagination className="mt-3 text-center" current={currentPage} simple defaultCurrent={currentPage}
                            total={examResult?.answers.length}
                            defaultPageSize={10} onChange={(page) => {
                  setCurrentPage(page);
                }} />
              ) : Constants.EmptyString
            }
          </div>

        </div>
        {/* RIGHT CONTENT */}
        <div className="col-span-4 m-2 border-2 border-solid rounded-2xl overflow-hidden">
          <div>
            {
              examFetchDetail?.questionsExam.map((question: QuestionExamModel, questionIndex: number) => {
                let bgColor = questionIndex % 2 === 0 ? "bg-slate-100" : "";
                return (questionIndex >= (currentPage - 1) * AppConfigs.pagination.DEFAULT_PAGE_SIZE && questionIndex < currentPage * AppConfigs.pagination.DEFAULT_PAGE_SIZE)
                  ? <div id={`question-${questionIndex + 1}`} className={`p-8 m-0 ${bgColor} `} key={questionIndex}>
                    <p className="mb-2 text-base font-medium">{`${questionIndex + 1}: ${question.question}`}</p>
                    <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
                      {
                        question.answers.map((answer: string, answerIndex: number) => {
                          return question.questionType === "MULTI"
                            ? <div key={answerIndex} className="answerSelectionBox">
                              <input className="answerSelection" name={`answer-${questionIndex}`}
                                     id={`answer-${questionIndex + 1}-${answerIndex}`} type="checkbox"
                                     onChange={(event) => {
                                       event.target.checked ?
                                         dispatch(chooseExamAnswer({
                                           questionIndex,
                                           answerIndex,
                                           type: question.questionType,
                                           checked: true
                                         })) : dispatch(chooseExamAnswer({
                                           questionIndex,
                                           answerIndex,
                                           type: question.questionType,
                                           checked: false
                                         }));
                                     }} />
                              <label className="answerLabel"
                                     htmlFor={`answer-${questionIndex + 1}-${answerIndex}`}>{answer}</label>
                            </div>
                            : <div key={answerIndex} className="answerSelectionBox">
                              <input className="answerSelection" name={`answer-${questionIndex + 1}`}
                                     id={`answer-${questionIndex + 1}-${answerIndex}`} type="radio"
                                     checked={question.checked === answerIndex}
                                     onChange={(event) => {
                                       dispatch(chooseExamAnswer({
                                         questionIndex,
                                         answerIndex,
                                         type: question.questionType,
                                         checked: true
                                       }));
                                     }} />
                              <label className="answerLabel"
                                     htmlFor={`answer-${questionIndex + 1}-${answerIndex}`}>{answer}</label>
                            </div>;
                        })
                      }
                    </div>
                  </div>
                  : Constants.EmptyString;
              })
            }
          </div>
        </div>
      </div>
    </>
  );
};

interface ExamSubmitModalProps {
  submit: any,

  flag: boolean
}

const ExamSubmitModal = (props: ExamSubmitModalProps) => {
  const [open, setOpen] = useState(false);
  let dispatch: DispatchType = useDispatch();
  const { checkExamResult, loading } = useSelector((state: RootState) => state.examSlice);

  const showModal = async () => {
    await dispatch(checkExamStatus());
    setOpen(true);
  };

  useEffect(() => {
    if (props.flag) {
      setOpen(false);
    }
  }, [props.flag]);

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <button className="text-white bg-red-500 w-full rounded py-1 font-medium" onClick={showModal}>
        Finish
      </button>
      <Modal
        title="Confirm"
        open={open}
        onOk={props.submit}
        onCancel={hideModal}
        cancelButtonProps={{
          disabled: loading
        }}
        okButtonProps={{
          loading,
          type: "primary",
          style: {
            backgroundColor: "#1D5D9B"
          }
        }}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>{checkExamResult?.message}</p>
      </Modal>
    </>
  );
};

export default DoExam;