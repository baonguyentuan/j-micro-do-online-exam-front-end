import React, { useState, useEffect, Fragment } from 'react'
import { Button, Rate, Avatar, Input, Form, Pagination } from 'antd';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ArrowRightOutlined, UserOutlined, StarFilled, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import CardCourse from '../../components/Card/CardContest';
import '../../assets/css/feedback/feedback.css'
import '../../assets/css/contest/contest.css'
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { ContestCommentModel, CommentFormValue } from '../../_core/CommentModel';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { sendContestComment } from '../../redux/reducers/comment/contestCommentSlice';
import { getContestDetailApi } from '../../redux/reducers/contest/contestSlice';
import { backToPosition, calculateAverageRate } from '../../utils/operate';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import "swiper/css";
const { TextArea } = Input;
const DEFAULT__PAGESIZE = 10
type Props = {

}
const initialFormValue: CommentFormValue = {
    comment: '',
    vote: 0
}
const ContestDetail = ({ }: Props) => {
    const { contestId } = useParams()
    const navigate = useNavigate()
    let { userInfo } = useSelector((state: RootState) => state.userSlice)
    let { lstComment } = useSelector((state: RootState) => state.contestCommentSlice)
    let { contestDetail, arrRelateContest } = useSelector((state: RootState) => state.contestSlice)
    let [currentPage, setCurrentPage] = useState(1)
    let [filter, setFilter] = useState(0)
    const dispatch: DispatchType = useDispatch()
    const { t } = useTranslation('contest')
    const formik = useFormik({
        initialValues: initialFormValue,
        validationSchema: Yup.object({
            vote: Yup.number().min(1, t('feedback.you must be vote'))
        }),
        onSubmit: async (formValue) => {
            if (userInfo) {
                await dispatch(sendContestComment({
                    userId: userInfo?.id,
                    comment: formValue.comment,
                    vote: formValue.vote
                }))
                formik.values.vote = 0
                formik.values.comment = ''
            }
        },
    })
    useEffect(() => {
        dispatch(getContestDetailApi(contestId ? Number(contestId) : 0))
        backToPosition(0)
    }, [contestDetail])
    let currentCommentList: ContestCommentModel[] = lstComment
    if (filter === 0) {
        currentCommentList = lstComment
    } else {
        currentCommentList = lstComment.filter(cmtItem => cmtItem.vote === filter)
    }
    const getPercentRate = (star: number) => {
        let totalRate: number = lstComment.reduce((total, currentComment) => {
            if (currentComment.vote === star) {
                return total + 1
            } else {
                return total
            }
        }, 0);
        return Math.round(totalRate * 100 / lstComment.length)
    }
    const selectFilter = (e: React.MouseEvent<HTMLElement>, value: number) => {
        let lstBtn = document.getElementsByClassName('btnFilter')
        for (let i = 0; i < lstBtn.length; i++) {
            if (lstBtn[i] === e.target || lstBtn[i] === e.currentTarget) {
                lstBtn[i].classList.add('btn__filter__active');
            } else {
                lstBtn[i].classList.remove('btn__filter__active');
            }
        }
        setFilter(value)

    }
    const renderButtonContest = () => {
        if (userInfo && userInfo.roles.find(roleItem => roleItem === 'USER_PREMIUM' || roleItem === 'ADMIN')) {
            return <div className='flex justify-start items-center'>
                <Button className='btn__contest' >{t('detail.go to contest')}</Button>
                <span>{t('detail.or')}</span>
                <Button className='btn__contest'>{t('detail.download now')}</Button>
            </div>
        } else {
            return <div className='flex justify-start items-center'>
                <Button className='btn__contest' onClick={() => {
                    navigate('/home')
                }}>{t('detail.become a premium')}</Button>
            </div>
        }
    }
    const renderInputCommentBox = () => {
        if (userInfo) {
            return <Form className='pb-2'>
                <Form.Item label={`${t('feedback.vote')}:`} className='mb-1' >
                    <Rate
                        className='-translate-y-1'
                        value={formik.values.vote}
                        onChange={(voteValue) => {
                            formik.setFieldValue('vote', voteValue)
                        }} />
                    <span id='voteError' className='inline-block px-2 text-red-400 translate-x-4 -translate-y-1'>{formik.errors.vote ? formik.errors.vote : ''}</span>
                </Form.Item>
                <Form.Item>
                    <TextArea
                        name='comment'
                        rows={5}
                        placeholder={t('feedback.input feedback')}
                        value={formik.values.comment}
                        onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item>
                    <Button size='large' htmlType='submit' onClick={() => {
                        formik.handleSubmit()
                    }}>{t('feedback.send feedback')}</Button>
                </Form.Item>
            </Form>
        } else {
            return <p className='text-base text-center pb-2'>{t('feedback.please')} <NavLink className='underline text-blue-500 font-semibold' to={'/login'}>{t('feedback.log in')}</NavLink> {t('feedback.to write feedback')}</p>
        }
    }
    return (
        <div className='size__component py-12'>
            <div className='grid grid-cols-6 gap-10 mb-6' >
                <div className='xl:col-span-2 lg:col-span-3 col-span-6 relative'>
                    <img style={{ height: 400, width: '100%' }} src={contestDetail?.imgSrc} alt={contestDetail?.name} />
                    <div className={`course__premiumTag premiumTag ${contestDetail?.premium === 'free' ? 'color__free' : 'color__premium'}`}>{contestDetail?.premium.toLocaleUpperCase()}</div>
                </div>
                <div className='xl:col-span-4 lg:col-span-3 col-span-6'>
                    <h1 className='font-bold text-xl mb-2'>{contestDetail?.name}</h1>
                    <p className='text-justify'>
                        <span className='statsName'>{t('detail.description')}: </span>
                        <span>{contestDetail?.description}</span>
                    </p>
                    <div>
                        <div className='grid grid-cols-2'>
                            <div >
                                <p className='statsName'>{t('detail.upload by')}:</p>
                                <p>{contestDetail?.createBy}</p>
                            </div>
                            <div >
                                <p className='statsName'>{t('detail.rating')}:</p>
                                <Rate className='flex items-center text-xs' disabled value={calculateAverageRate(lstComment)} />
                            </div>
                            <div >
                                <p className='statsName'>{t('detail.duration')}:</p>
                                <p>{contestDetail?.duration}min</p>
                            </div>

                            <div >
                                <p className='statsName'>{t('detail.downloaded')}:</p>
                                <p>{contestDetail?.quantityDownload}</p>
                            </div>

                        </div>
                    </div>
                    {renderButtonContest()}
                </div>
            </div>
            <div id='feedbackArea' className='grid grid-cols-6 gap-10'>
                <div className='xl:col-span-4 col-span-6'>
                    <div className='feedback__box '>
                        <h1 className='font-bold text-2xl text-center'>{t('feedback.customer feedback')}</h1>
                        <div className='grid grid-cols-4 items-center' >
                            <div className='md:col-span-1 col-span-4 text-center' >
                                <p className='text-6xl font-bold text-green-400'>{calculateAverageRate(lstComment)}</p>
                                <p className='text-2xl font-semibold text-green-400'>Good</p>
                                <Rate value={calculateAverageRate(lstComment)} disabled />
                            </div>
                            <div className='md:col-span-3 col-span-4'>
                                <p className=' w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>5 <StarFilled className='-translate-y-1 text-yellow-400' /></span>
                                    <p className='bg-green-400 h-full rounded-2xl' style={{ width: `${getPercentRate(5)}%` }}></p>
                                    <span className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>{getPercentRate(5)}%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>4 <StarFilled className='-translate-y-1 text-yellow-400' /></span>
                                    <p className='bg-green-400 h-full rounded-2xl' style={{ width: `${getPercentRate(4)}%` }}></p>
                                    <span className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>{getPercentRate(4)}%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>3 <StarFilled className='-translate-y-1 text-yellow-400' /></span>
                                    <p className='bg-green-400 h-full rounded-2xl' style={{ width: `${getPercentRate(3)}%` }}></p>
                                    <span className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>{getPercentRate(3)}%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>2 <StarFilled className='-translate-y-1 text-yellow-400' /></span>
                                    <p className='bg-green-400 h-full rounded-2xl' style={{ width: `${getPercentRate(2)}%` }}></p>
                                    <span className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>{getPercentRate(2)}%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>1 <StarFilled className='-translate-y-1 text-yellow-400' /></span>
                                    <p className='bg-green-400 h-full rounded-2xl' style={{ width: `${getPercentRate(1)}%` }}></p>
                                    <span className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>{getPercentRate(1)}%</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='feedback__box '>
                        <h1 className='font-bold text-xl'>{t('feedback.feedback')}</h1>
                        {renderInputCommentBox()}
                        <div>
                            <span className='mr-4'>{t('feedback.filter')}</span>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 0)

                            }}>{t('feedback.all')}</Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 5)
                            }}>5<StarFilled className='-translate-y-1 text-yellow-400' /></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 4)
                            }}>4<StarFilled className='-translate-y-1 text-yellow-400' /></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 3)
                            }}>3<StarFilled className='-translate-y-1 text-yellow-400' /></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 2)
                            }}>2<StarFilled className='-translate-y-1 text-yellow-400' /></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 1)
                            }}>1<StarFilled className='-translate-y-1 text-yellow-400' /></Button>
                        </div>
                        {currentCommentList.slice(0).reverse().map((cmtItem, index) => {
                            if (index >= (currentPage - 1) * DEFAULT__PAGESIZE && index < currentPage * DEFAULT__PAGESIZE) {
                                return <div key={cmtItem.cmtID} className='py-2 border-b-2'>
                                    <div className='flex justify-start items-center'>
                                        <Avatar size='default' icon={<UserOutlined />} />
                                        <div className='ml-4'>
                                            <p>{cmtItem.userId}</p>
                                            <Rate value={cmtItem.vote} disabled />
                                        </div>
                                    </div>
                                    <p>{cmtItem.comment}</p>
                                </div>
                            }
                        })}

                        <Pagination className='text-center mt-4' defaultCurrent={1} total={currentCommentList.length} defaultPageSize={DEFAULT__PAGESIZE} onChange={(page, pageSize) => {
                            let topScroll = document.getElementById('feedbackArea')?.offsetTop
                            if (topScroll) {
                                backToPosition(topScroll)
                            }
                            setCurrentPage(page)
                        }} />
                    </div>
                </div>
                <div className='xl:col-span-2 col-span-6'>
                    <div className='flex justify-between font-bold text-xl mb-4'>
                        <p>Relate Contest</p>
                        <NavLink to={'/home'}><ArrowRightOutlined className='-translate-y-1' /></NavLink>
                    </div>
                    <div className='xl:block hidden'>
                        {/*{arrRelateContest.map((contest, index) => {*/}
                        {/*    return <Fragment key={contest.id}>*/}
                        {/*        <CardCourse contestDetail={contest} />*/}
                        {/*        <br />*/}
                        {/*    </Fragment>*/}
                        {/*})}*/}
                    </div>
                    <div className='xl:hidden block relative'>
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={{
                                prevEl: '.customPrevSlide',
                                nextEl: '.customNextSlide',
                            }}
                            modules={[Navigation]}
                            breakpoints={{
                                1084: {
                                    slidesPerView: 3,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                            }}
                        >
                            {/*{arrRelateContest.map((contestItem, index) => {*/}
                            {/*    return <SwiperSlide key={contestItem.id}><CardCourse contestDetail={contestItem} /> </SwiperSlide>*/}
                            {/*})}*/}
                        </Swiper>
                        <Button className='customNavigationSlide customPrevSlide'><LeftCircleOutlined style={{ transform: 'translateY(-6px)' }} /></Button>
                        <Button className='customNavigationSlide customNextSlide'><RightCircleOutlined style={{ transform: 'translateY(-6px)' }} /></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContestDetail