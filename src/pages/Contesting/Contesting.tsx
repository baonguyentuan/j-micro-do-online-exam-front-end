import React, { useEffect, useState } from "react";
import { Pagination, Statistic } from "antd";
import { backToPosition } from "../../utils/operate";
import { useDispatch, useSelector } from "react-redux";
import { QuestionExamModel } from "../../_core/exam";
import { useParams } from "react-router-dom";
import AppConfigs from "../../config/AppConfigs";
import Constants from "../../constants/Constants";
import { fetchExamDetail,chooseExamAnswer } from "../../redux/reducers/exam";
import { DispatchType, RootState } from "../../redux/configStore";
import { getContestingInfoApi, setAnswer } from "../../redux/reducers/contest/contestSlice";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, TagsOutlined } from "@ant-design/icons";

const { Countdown } = Statistic;

export default function Contesting() {
  let { contestId } = useParams();
  let dispatch: DispatchType = useDispatch();
  let [currentPage, setCurrentPage] = useState(1);
  const { examFetchDetail } = useSelector((state: RootState) => state.examSlice);
  const { contestingInfo, lstAnswer } = useSelector((state: RootState) => state.contestSlice);

  useEffect(() => {
    dispatch(getContestingInfoApi(Number(contestId)));
  }, []);

  useEffect(() => {
    dispatch(fetchExamDetail({ name: "Introduction to Python" }));
  }, []);

  const handleExamCountFinish = () => {

  };

  return (
    <div className="size__component grid grid-cols-6 gap-4 py-8">
      <div className="col-span-2 ">
        <div className="sticky right-0 top-5 flex flex-col">

          <div className="px-3 py-5 m-2 border-2 border-solid rounded-2xl ">
            <h1 className="font-medium text-xl">Exam: {examFetchDetail?.examName}</h1>
            <div>
              <div className="my-2">
                <p className="flex items-center gap-2">
                  <span className="relative bottom-1 text-green-700"><TagsOutlined /></span>
                  <span>Category : {examFetchDetail?.categoryName}</span>
                </p>
                <div>
                  <p className="flex items-center gap-2">
                    <span className="relative bottom-1 text-blue-600"><ClockCircleOutlined /></span>
                    <span>Duration : {examFetchDetail?.duration} min</span></p>
                </div>
              </div>
              <Countdown
                title="Exam end in"
                value={Date.now() + (60000 * examFetchDetail?.duration)}
                valueStyle={{ fontSize: 30 }}
                format="HH:mm:ss"
                onFinish={handleExamCountFinish} />
            </div>

            <button className=" mt-4 text-white bg-red-500 w-full rounded py-1 font-medium" onClick={() => {
              console.log(Date.now() - Date.parse(String(contestingInfo?.timeStart)));
            }}>Finish
            </button>
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
              {lstAnswer.map((answer, answerIndex) => {
                return <div onClick={async () => {
                  await setCurrentPage(Math.floor((answerIndex) / AppConfigs.pagination.DEFAULT_PAGE_SIZE) + 1);
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

          <Pagination defaultCurrent={1} total={lstAnswer.length} defaultPageSize={10} onChange={(page) => {
            setCurrentPage(page);
          }} />
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
                                   id={`answer-${questionIndex + 1}-${answerIndex}`} type="radio" onChange={(event) => {
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
  );
}