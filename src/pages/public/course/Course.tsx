import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DispatchType, RootState } from "../../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import Constants from "../../../constants/Constants";
import styled from "styled-components";
import { Button, Divider, Modal, Pagination, Rate } from "antd";
import { useTranslation } from "react-i18next";
import AppRoutes from "../../../constants/AppRoutes";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import CardContest from "../../../components/Card/CardContest";
import "react-quill/dist/quill.snow.css";
import ExamFeedBack from "../../../components/exams/ExamFeedBack";
import { backToPosition, openNotificationWithIcon } from "../../../utils/operate";
import "../../../assets/css/feedback/feedback.css";
import { getExamDetailShow, getExamsRandom } from "../../../redux/reducers/exam";
import { deleteFeedBack, getExamRating, getFeedbacksByExam } from "../../../redux/reducers/feedback";
import { FeedBackSearchParams } from "../../../_core/feedback";
import AppConfigs from "../../../config/AppConfigs";
import { DeleteOutlined, ExclamationCircleOutlined, InboxOutlined, StarFilled,UserOutlined } from "@ant-design/icons";
import FeedbackModal from "../../../components/Feedbacks/FeedbackModal";


function Course() {
  let { name } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("contest");
  const dispatch: DispatchType = useDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const [feedbackChoose, setFeedBackChoose] = useState(0);
  const { examGetDetail, randomExams } = useSelector((state: RootState) => state.examSlice);
  const { examRating, examRatingList, loading } = useSelector((state: RootState) => state.feedBackSlice);

  const [feedBackSearch, setFeedBackSearch] = useState({
    name: name,
    vote: 0,
    page_index: 1,
    page_size: 10
  } as FeedBackSearchParams);

  const items = [
    { name: "Home", link: AppRoutes.public.home },
    { name: "Luyện thi", link: AppRoutes.public.courses },
    { name: examGetDetail?.categoryName, link: AppRoutes.public.courses + `/${examGetDetail?.categoryName}` },
    { name: name }
  ];

  useEffect(() => {
    dispatch(getExamRating({ name: name }));
    dispatch(getExamDetailShow({ name: name }));
    dispatch(getExamsRandom({ name: name }));
    backToPosition(0);
  }, [name]);

  useEffect(() => {
    dispatch(getFeedbacksByExam(feedBackSearch));
  }, [feedBackSearch]);

  const onHandleChangeFeedBackFilter = (star: number) => {
    setFeedBackSearch({ ...feedBackSearch, vote: star });
  };

  const generateConditionExamButton = () => {
    if (examGetDetail && examGetDetail.examType === "FREE") {
      return <div className="flex justify-start items-center gap-3">
        <Button onClick={() => navigate(`/takeExam/${examGetDetail?.examName}`)} size="large"
                className="font-semibold">{t("detail.go to contest")}</Button>
        <span className="font-medium">{t("detail.or")}</span>
        <Button size="large" className="font-semibold">{t("detail.download now")}</Button>
      </div>;
    } else {
      return <div className="flex justify-start items-center">
        <Button size="large" className="font-semibold">{t("detail.become a premium")}</Button>
      </div>;
    }
  };

  const confirm = (number: number) => {
    modal.confirm({
      title: "Confirm delete",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to delete the feedback?",
      okText: "OK",
      onOk: (id) => {
        const executeLogic = async () => {
          const result = await dispatch(deleteFeedBack({ id: number }));

          if (deleteFeedBack.rejected.match(result)) {
            //TODO: handle error
            return true;
          }
          openNotificationWithIcon("success", result?.payload?.message, "", 2);

          await dispatch(getFeedbacksByExam(feedBackSearch));
          await dispatch(getExamRating({ name: name }));
          await dispatch(getExamDetailShow({ name: name }));

          return true;
        };

        return executeLogic();
      },
      okButtonProps: {
        loading,
        type: "primary",
        style: {
          backgroundColor: "#1D5D9B"
        }
      },
      cancelButtonProps: {
        disabled: loading
      },
      cancelText: "Cancel"
    });
  };

  const handleOnMouseEnter = (id: number) => {
    setFeedBackChoose(id);
  };

  const handleOnMouseLeave = () => {
    setFeedBackChoose(0);
  };

  return (<CourseWrapper className="size__component mb-14">
    {contextHolder}
    <div className="course__container">
      <Breadcrumb items={items} />
      <div className="top mb-14 mt-10 md:mt-12">
        {
          examGetDetail !== undefined ?
            <div className="grid grid-cols-6 gap-10 md:gap-16 mb-6">
              <div className="xl:col-span-2 lg:col-span-6 col-span-6 relative">
                <img className="thumbnail rounded w-full" src={examGetDetail?.image} alt={examGetDetail?.examName} />
                <div
                  className={`course__premiumTag premiumTag ${examGetDetail?.examType === "FREE" ? "color__free" : "color__premium"}`}>{examGetDetail?.examType}</div>
              </div>
              <div className="xl:col-span-4 lg:col-span-6 col-span-6">
                <div className="flex flex-col items-end">
                  <p className="text-base font-semibold">{t("detail.rating")}:</p>
                  <Rate className="flex items-center text-2xl" disabled
                        value={examGetDetail?.totalRating} />
                </div>
                <h1 className="font-bold text-3xl mb-5 mt-2">{examGetDetail?.examName}</h1>
                <p className="text-justify">
                  <span className="text-lg font-semibold">{t("detail.description")}: </span>
                  <span className="text-lg italic text-slate-700">{examGetDetail?.description}</span>
                </p>
                <div>
                  <div className="flex flex-wrap gap-5 my-5">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-medium">{t("detail.duration")}:</p>
                      <p className="flex items-center gap-2">
                        <span className="text-2xl">{examGetDetail?.duration}</span> Min
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold">Category: </p>
                      <p className="category-tag">{examGetDetail?.categoryName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold">{t("detail.downloaded")}: </p>
                      <p className="text-2xl">{examGetDetail?.downloadNumber}</p>
                    </div>
                  </div>
                </div>
                <Divider style={{ borderWidth: "2px" }} />
                {generateConditionExamButton()}
              </div>
            </div>
            : Constants.EmptyString
        }
      </div>

      <h1 className="font-semibold text-2xl mb-5">{t("feedback.customer feedback")}</h1>
      <div id="feedbackArea" className="bottom grid grid-cols-6 gap-16">

        <div className="xl:col-span-4 col-span-6">
          {
            examRating !== undefined ? (<ExamFeedBack {...examRating} />) : Constants.EmptyString
          }
          <div className="feedback__box">
            <h1 className="font-semibold text-2xl mb-5">{t("feedback.feedback")}</h1>
            <div className="flex items-center">
              <span className="mr-4 font-semibold">{t("feedback.filter")}</span>
              <div className="flex gap-2">
                {
                  examRating !== undefined ? (
                    [0, ...examRating.ratingData.stars].map((opt, index) => {
                      return <ExamFeedBackFilterButton key={index} defaultStart={feedBackSearch.vote} star={opt}
                                                       onHandleFilter={onHandleChangeFeedBackFilter} />;
                    })) : Constants.EmptyString
                }
              </div>
            </div>
            {
              examRatingList !== undefined && examRatingList?.data?.length > 0 ? (
                <div>
                  <div className="py-2 border-b-2 mt-5">
                    <div className="flex flex-col gap-3">
                      {
                        examRatingList.data.map((feed, index) => {
                          return (<div onMouseEnter={() => handleOnMouseEnter(feed.id)}
                                       onMouseLeave={handleOnMouseLeave} key={index}
                                       className="relative border border-indigo-200 p-3 rounded">
                            {feed.userID === examGetDetail?.ownerID && <OwnerTag>Owner</OwnerTag>}
                            <div className="flex justify-between items-center mb-2">
                              <p className="font-medium text-slate-500">{feed.createdAt}</p>
                              <Rate value={feed.vote} disabled />
                            </div>
                            <p className="flex items-center gap-2">
                              <UserOutlined className="text-red-500" />
                              <span className="text-lg font-medium italic">{feed.username}</span>
                            </p>
                            <p className="text-gray-600 text-base" dangerouslySetInnerHTML={{ __html: feed.comment }} />
                            <div className={`absolute h-full w-full top-0 left-0 cursor-pointer rounded
                              ${feedbackChoose === feed.id && feed.userID === examGetDetail?.ownerID ? "flex items-center justify-center gap-3" : "hidden"}`}
                                 style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                              <button onClick={() => {
                                confirm(feed.id);
                              }}
                                      className="text-white text-medium bg-red-500 hover:bg-red-400 rounded py-1 px-2 flex items-center gap-3"
                                      style={{ minWidth: "5rem" }}><DeleteOutlined /><span>Delete</span>
                              </button>
                              <FeedbackModal searchData={feedBackSearch} examID={examGetDetail?.id} feedID={feed.id}
                                             buttonName="Edit" comment={feed.comment} vote={feed.vote} />
                            </div>
                          </div>);
                        })
                      }

                    </div>
                  </div>
                  {
                    examRatingList?.pagination?.pages > 1 ? (
                      <Pagination className="text-center mt-4" defaultCurrent={1}
                                  total={examRatingList?.pagination?.totals}
                                  defaultPageSize={AppConfigs.pagination.DEFAULT_PAGE_SIZE} onChange={(page) => {
                        let topScroll = document.getElementById("feedbackArea")?.offsetTop;
                        if (topScroll) {
                          backToPosition(topScroll);
                        }
                        setFeedBackSearch({ ...feedBackSearch, page_index: page });
                      }} />
                    ) : ""
                  }
                </div>
              ) : <div className="flex flex-col items-center justify-center py-16">
                <InboxOutlined className="text-3xl mb-2" />
                <p className="text-2xl">No data found</p>
              </div>
            }

          </div>
        </div>

        <div className="xl:col-span-2 col-span-6 hidden xl:block">
          <h3 className="text-2xl font-semibold mb-3">Training courses related</h3>
          <div className="flex flex-col gap-3">
            {
              randomExams?.map((ex, index) => {
                return <CardContest key={index} examCard={ex} />;
              })
            }
          </div>
        </div>
      </div>
    </div>
  </CourseWrapper>);
}


type ExamFeedBackFilterButtonProps = {
  star: number,
  defaultStart: number,
  onHandleFilter: (start: number) => void
}

const ExamFeedBackFilterButton = (props: ExamFeedBackFilterButtonProps) => {
  const { star, defaultStart, onHandleFilter } = props;
  const { t } = useTranslation("contest");
  const handleClickButton = (star: number) => {
    onHandleFilter(star);
  };

  return (<ExamFeedBackFilterButtonWrapper>
    {
      star === 0 ? <Button className={`font-medium ${defaultStart === star ? "active" : ""}`} onClick={() => {
          handleClickButton(star);
        }}>{t("feedback.all")}</Button> :
        <Button className={`font-medium ${defaultStart === star ? "active" : ""}`} onClick={() => {
          handleClickButton(star);
        }}>{star}<StarFilled className="-translate-y-1 text-yellow-400" /></Button>
    }
  </ExamFeedBackFilterButtonWrapper>);
};

const OwnerTag = styled.div`
  top: -15px;
  left: -6px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  border-radius: 2px;
  padding: 5px;
  position: absolute;
  background-color: #1D5D9B;
`

const CourseWrapper = styled.div`
  .course__container .top .thumbnail {
    height: 400px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  }


  .category-tag {
    background-color: #4A55A2;
    color: white;
    padding: 5px;
    border-radius: 3px;
  }
`;

const ExamFeedBackFilterButtonWrapper = styled.div`
  .active, .ant-btn-default:hover {
    background-color: rgba(74, 85, 162, 0.73);
    color: white;
    border-color: transparent;
  }
`;


export default Course;
