import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {DispatchType, RootState} from "../../redux/configStore";
import {useDispatch, useSelector} from "react-redux";
import {getExamDetail, getExamsRandom} from "../../redux/reducers/exam";
import Constants from "../../constants/Constants";
import styled from "styled-components";
import {Button, Divider, Form, Rate} from 'antd';
import {useTranslation} from "react-i18next";
import AppRoutes from "../../constants/AppRoutes";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import {CommentFormValue} from "../../_core/CommentModel";
import CardContest from "../../components/Card/CardContest";
import {useFormik} from 'formik';
import * as Yup from 'yup'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {StarFilled} from "@ant-design/icons";
import ExamFeedBack from "../../components/exams/ExamFeedBack";
import {backToPosition} from "../../utils/operate";
import '../../assets/css/feedback/feedback.css';

const initialFormValue: CommentFormValue = {
  comment: '',
  vote: 0
}

const feedBackRange = [0, 1, 2, 3, 4, 5];

function Course() {
  let {name} = useParams();
  const navigate = useNavigate();
  let [currentPage, setCurrentPage] = useState(1);
  const {t} = useTranslation('contest');
  let [filter, setFilter] = useState(0);
  const dispatch: DispatchType = useDispatch();
  const [isFeedBackModalOpen, SetIsFeedBackModalOpen] = useState(false);
  const {examGetDetail, randomExams} = useSelector((state: RootState) => state.examSlice)
  let {lstComment} = useSelector((state: RootState) => state.contestCommentSlice)

  const items = [
    {name: 'Home', link: AppRoutes.public.home},
    {name: 'Luyện thi', link: AppRoutes.public.courses},
    {name: examGetDetail?.categoryName, link: AppRoutes.public.courses + `/${examGetDetail?.categoryName}`},
    {name: name},
  ];

  useEffect(() => {
    dispatch(getExamDetail({name: name}))
    dispatch(getExamsRandom({name: name}))
    backToPosition(0)
  }, [name])


  const onHandleChangeFeedBackFilter = (star: number) => {
    setFilter(star);
  }

  // let currentCommentList: ContestCommentModel[] = lstComment
  // if (filter === 0) {
  //   currentCommentList = lstComment
  // } else {
  //   currentCommentList = lstComment.filter(cmtItem => cmtItem.vote === filter)
  // }

  const generateConditionExamButton = () => {
    if (examGetDetail && examGetDetail.examType === 'FREE') {
      return <div className='flex justify-start items-center gap-3'>
        <Button size="large" className='font-semibold'>{t('detail.go to contest')}</Button>
        <span className='font-medium'>{t('detail.or')}</span>
        <Button size="large" className='font-semibold'>{t('detail.download now')}</Button>
      </div>
    } else {
      return <div className='flex justify-start items-center'>
        <Button size="large" className='font-semibold' onClick={() => {
          navigate(AppRoutes.public.home)
        }}>{t('detail.become a premium')}</Button>
      </div>
    }
  }

  //TODO: move to conducting exam component
  const formik = useFormik({
    initialValues: initialFormValue,
    validationSchema: Yup.object({
      vote: Yup.number().min(1, t('feedback.you must be vote')),
      comment: Yup.string().required('Your review is required!')
    }),
    onSubmit: async (formValue) => {
      if (false) {
        // await dispatch(sendContestComment({
        //   userId: userInfo?.userId,
        //   comment: formValue.comment,
        //   vote: formValue.vote
        // }))
        // formik.values.vote = 0
        // formik.values.comment = ''
      }
    },
  })

  const feedBackModal = () => {
    return <Form className='pb-2'>
      <Form.Item label={`${t('feedback.vote')}:`} className='mb-1'>
        <Rate
          className='-translate-y-1'
          value={formik.values.vote}
          onChange={(voteValue) => {
            formik.setFieldValue('vote', voteValue)
          }}/>
        <span
          className='inline-block px-2 text-red-400 translate-x-4 -translate-y-1'>{formik.errors.vote ? formik.errors.vote : ''}</span>
      </Form.Item>
      <Form.Item>
        <ReactQuill
          value={formik.values.comment}
          theme="snow"
          onChange={(commentValue) => {
            formik.setFieldValue('comment', commentValue)
          }}
        />
        <span className='inline-block text-red-400 mt-2'>{formik.errors.comment ? formik.errors.comment : ''}</span>
      </Form.Item>
      <Form.Item>
        <Button size='large' htmlType='submit' onClick={() => {
          formik.handleSubmit()
        }}>{t('feedback.send feedback')}</Button>
      </Form.Item>
    </Form>
  }

  return (<CourseWrapper className='size__component mb-14'>
    <div>
      {isFeedBackModalOpen && feedBackModal()}
    </div>

    <div className='course__container'>
      <Breadcrumb items={items}/>
      <div className='top mb-14 mt-10 md:mt-16'>
        {
          examGetDetail !== undefined ?
            <div className='grid grid-cols-6 gap-10 md:gap-16 mb-6'>
              <div className='xl:col-span-2 lg:col-span-3 col-span-6 relative'>
                <img className='thumbnail rounded w-full' src={examGetDetail?.image} alt={examGetDetail?.examName}/>
                <div
                  className={`course__premiumTag premiumTag ${examGetDetail?.examType === 'FREE' ? 'color__free' : 'color__premium'}`}>{examGetDetail?.examType}</div>
              </div>
              <div className='xl:col-span-4 lg:col-span-3 col-span-6'>
                <h1 className='font-bold text-3xl mb-5'>{examGetDetail?.examName}</h1>
                <p className='text-justify'>
                  <span className='text-lg font-semibold'>{t('detail.description')}: </span>
                  <span className='text-lg italic text-slate-700'>{examGetDetail?.description}</span>
                </p>
                <div>
                  <div className='flex flex-wrap gap-5 my-5'>
                    <div className='flex items-center gap-2'>
                      <p className='text-lg font-medium'>{t('detail.duration')}:</p>
                      <p className='flex items-center gap-2'>
                        <span className='text-2xl'>{examGetDetail?.duration}</span> Min
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <p className='text-lg font-semibold'>Category: </p>
                      <p className='category-tag'>{examGetDetail?.categoryName}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <p className='text-lg font-semibold'>{t('detail.downloaded')}: </p>
                      <p className='text-2xl'>{examGetDetail?.downloadNumber}</p>
                    </div>
                    {/*<div>*/}
                    {/*  <p className='statsName'>{t('detail.rating')}:</p>*/}
                    {/*  <Rate className='flex items-center text-xs' disabled*/}
                    {/*        value={calculateAverageRate(lstComment)}/>*/}
                    {/*</div>*/}
                  </div>
                </div>
                <Divider style={{borderWidth: '2px'}}/>
                {generateConditionExamButton()}
              </div>
            </div>
            : Constants.EmptyString
        }
      </div>

      <h1 className='font-semibold text-2xl mb-5'>{t('feedback.customer feedback')}</h1>
      <div id='feedbackArea' className='bottom grid grid-cols-6 gap-10'>

        <div className='xl:col-span-4 col-span-6'>
          <ExamFeedBack/>

          <div className='feedback__box'>
            <h1 className='font-semibold text-2xl mb-5'>{t('feedback.feedback')}</h1>
            <div className='flex items-center'>
              <span className='mr-4'>{t('feedback.filter')}</span>
              <div className='flex gap-2'>
                {
                  feedBackRange.map((opt, index) => {
                    return <ExamFeedBackFilterButton key={index} defaultStart={filter} star={opt}
                                                     onHandleFilter={onHandleChangeFeedBackFilter}/>
                  })
                }
              </div>
            </div>

            {/*{currentCommentList.slice(0).reverse().map((cmtItem, index) => {*/}
            {/*  if (index >= (currentPage - 1) * DEFAULT__PAGESIZE && index < currentPage * DEFAULT__PAGESIZE) {*/}
            {/*    return <div key={cmtItem.cmtID} className='py-2 border-b-2'>*/}
            {/*      <div className='flex justify-start items-center'>*/}
            {/*        <Avatar size='default' icon={<UserOutlined/>}/>*/}
            {/*        <div className='ml-4'>*/}
            {/*          <p>{cmtItem.userId}</p>*/}
            {/*          <Rate value={cmtItem.vote} disabled/>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*      <p>{cmtItem.comment}</p>*/}
            {/*    </div>*/}
            {/*  }*/}
            {/*})}*/}

            {/*<Pagination className='text-center mt-4' defaultCurrent={1} total={currentCommentList.length}*/}
            {/*            defaultPageSize={AppConfigs.pagination.DEFAULT_PAGE_SIZE} onChange={(page, pageSize) => {*/}
            {/*  let topScroll = document.getElementById('feedbackArea')?.offsetTop*/}
            {/*  if (topScroll) {*/}
            {/*    backToPosition(topScroll)*/}
            {/*  }*/}
            {/*  setCurrentPage(page)*/}
            {/*}}/>*/}

          </div>

        </div>

        <div className='xl:col-span-2 col-span-6 hidden xl:block'>
          <h3 className='text-2xl mb-3'>Training courses related</h3>
          <div className='flex flex-col gap-3'>
            {
              randomExams?.map((ex, index) => {
                return <CardContest key={index} examCard={ex}/>
              })
            }
          </div>
        </div>
      </div>
    </div>
  </CourseWrapper>)
}


type ExamFeedBackFilterButtonProps = {
  star: number,
  defaultStart: number,
  onHandleFilter: (start: number) => void
}


const ExamFeedBackFilterButton = (props: ExamFeedBackFilterButtonProps) => {
  const {star, defaultStart, onHandleFilter} = props;
  const {t} = useTranslation('contest');
  const handleClickButton = (star: number) => {
    onHandleFilter(star);
  }

  return (<ExamFeedBackFilterButtonWrapper>
    {
      star === 0 ? <Button className={`font-medium ${defaultStart === star ? 'active' : ''}`} onClick={() => {
          handleClickButton(star)
        }}>{t('feedback.all')}</Button> :
        <Button className={`font-medium ${defaultStart === star ? 'active' : ''}`} onClick={() => {
          handleClickButton(star)
        }}>{star}<StarFilled className='-translate-y-1 text-yellow-400'/></Button>
    }
  </ExamFeedBackFilterButtonWrapper>)
}

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
`


export default Course;
