import React, {useEffect, useState} from 'react'
import {Avatar, Button, Input, Pagination, Rate} from 'antd';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {ArrowRightOutlined, LeftCircleOutlined, RightCircleOutlined, StarFilled, UserOutlined} from '@ant-design/icons'
import '../../assets/css/feedback/feedback.css'
import '../../assets/css/contest/contest.css'
import {useDispatch, useSelector} from 'react-redux';
import {DispatchType, RootState} from '../../redux/configStore';
import {CommentFormValue, ContestCommentModel} from '../../_core/CommentModel';
import {backToPosition, calculateAverageRate} from '../../utils/operate';
import {useTranslation} from 'react-i18next';
import {Swiper} from 'swiper/react';
import {Navigation} from "swiper";
import "swiper/css";

const {TextArea} = Input;
const DEFAULT__PAGESIZE = 10
type Props = {}
const initialFormValue: CommentFormValue = {
    comment: '',
    vote: 0
}
const ContestDetail = ({}: Props) => {
    const {contestId} = useParams()
    const navigate = useNavigate()
    let {userInfo} = useSelector((state: RootState) => state.userSlice)
    let {lstComment} = useSelector((state: RootState) => state.contestCommentSlice)
    let {contestDetail, arrRelateContest} = useSelector((state: RootState) => state.contestSlice)
    let [currentPage, setCurrentPage] = useState(1)
    let [filter, setFilter] = useState(0)
    const dispatch: DispatchType = useDispatch()
    const {t} = useTranslation('contest')

    useEffect(() => {
        //dispatch(getContestDetailApi(contestId ? Number(contestId) : 0))
        backToPosition(0)
    }, [contestDetail])

    let currentCommentList: ContestCommentModel[] = lstComment
    if (filter === 0) {
        currentCommentList = lstComment
    } else {
        currentCommentList = lstComment.filter(cmtItem => cmtItem.vote === filter)
    }
    // TODO: keep
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

    //TODO: keep
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

    //TODO: keep
    const renderButtonContest = () => {
        if (userInfo && userInfo.userPremium === 'premium') {
            return <div className='flex justify-start items-center'>
                <Button className='btn__contest'>{t('detail.go to contest')}</Button>
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

    return (
        <div className='size__component py-12'>
            <div className='grid grid-cols-6 gap-10 mb-6'>
                <div className='xl:col-span-2 lg:col-span-3 col-span-6 relative'>
                    <img style={{height: 400, width: '100%'}} src={contestDetail?.imgSrc} alt={contestDetail?.name}/>
                    <div
                        className={`course__premiumTag premiumTag ${contestDetail?.premium === 'free' ? 'color__free' : 'color__premium'}`}>{userInfo?.userPremium.toLocaleUpperCase()}</div>
                </div>
                <div className='xl:col-span-4 lg:col-span-3 col-span-6'>
                    <h1 className='font-bold text-xl mb-2'>{contestDetail?.name}</h1>
                    <p className='text-justify'>
                        <span className='statsName'>{t('detail.description')}: </span>
                        <span>{contestDetail?.description}</span>
                    </p>
                    <div>
                        <div className='grid grid-cols-2'>
                            <div>
                                <p className='statsName'>{t('detail.upload by')}:</p>
                                <p>{contestDetail?.createBy}</p>
                            </div>
                            <div>
                                <p className='statsName'>{t('detail.rating')}:</p>
                                <Rate className='flex items-center text-xs' disabled
                                      value={calculateAverageRate(lstComment)}/>
                            </div>
                            <div>
                                <p className='statsName'>{t('detail.duration')}:</p>
                                <p>{contestDetail?.duration}min</p>
                            </div>

                            <div>
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
                        <div className='grid grid-cols-4 items-center'>
                            <div className='md:col-span-1 col-span-4 text-center'>
                                <p className='text-6xl font-bold text-green-400'>{calculateAverageRate(lstComment)}</p>
                                <p className='text-2xl font-semibold text-green-400'>Good</p>
                                <Rate value={calculateAverageRate(lstComment)} disabled/>
                            </div>
                            <div className='md:col-span-3 col-span-4'>
                                <p className=' w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span
                                        className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>5 <StarFilled
                                        className='-translate-y-1 text-yellow-400'/></span>
                                    <p className='bg-green-400 h-full rounded-2xl'
                                       style={{width: `${getPercentRate(5)}%`}}></p>
                                    <span
                                        className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>{getPercentRate(5)}%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span
                                        className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>4 <StarFilled
                                        className='-translate-y-1 text-yellow-400'/></span>
                                    <p className='bg-green-400 h-full rounded-2xl'
                                       style={{width: `${getPercentRate(4)}%`}}></p>
                                    <span
                                        className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>{getPercentRate(4)}%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span
                                        className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>3 <StarFilled
                                        className='-translate-y-1 text-yellow-400'/></span>
                                    <p className='bg-green-400 h-full rounded-2xl'
                                       style={{width: `${getPercentRate(3)}%`}}></p>
                                    <span
                                        className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>{getPercentRate(3)}%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span
                                        className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>2 <StarFilled
                                        className='-translate-y-1 text-yellow-400'/></span>
                                    <p className='bg-green-400 h-full rounded-2xl'
                                       style={{width: `${getPercentRate(2)}%`}}></p>
                                    <span
                                        className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>{getPercentRate(2)}%</span>
                                </p>
                                <p className='w-4/5 h-4 bg-slate-400 relative rounded-2xl text-lg mx-auto my-4'>
                                    <span
                                        className='absolute top-0 left-0 -translate-x-10 -translate-y-1/4'>1 <StarFilled
                                        className='-translate-y-1 text-yellow-400'/></span>
                                    <p className='bg-green-400 h-full rounded-2xl'
                                       style={{width: `${getPercentRate(1)}%`}}></p>
                                    <span
                                        className='absolute top-0 right-0 translate-x-10 -translate-y-1/4'>{getPercentRate(1)}%</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='feedback__box '>
                        <h1 className='font-bold text-xl'>{t('feedback.feedback')}</h1>
                        <div>
                            <span className='mr-4'>{t('feedback.filter')}</span>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 0)
                            }}>{t('feedback.all')}</Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 5)
                            }}>5<StarFilled className='-translate-y-1 text-yellow-400'/></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 4)
                            }}>4<StarFilled className='-translate-y-1 text-yellow-400'/></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 3)
                            }}>3<StarFilled className='-translate-y-1 text-yellow-400'/></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 2)
                            }}>2<StarFilled className='-translate-y-1 text-yellow-400'/></Button>
                            <Button className='btnFilter mx-2' onClick={(e) => {
                                selectFilter(e, 1)
                            }}>1<StarFilled className='-translate-y-1 text-yellow-400'/></Button>
                        </div>
                        {currentCommentList.slice(0).reverse().map((cmtItem, index) => {
                            if (index >= (currentPage - 1) * DEFAULT__PAGESIZE && index < currentPage * DEFAULT__PAGESIZE) {
                                return <div key={cmtItem.cmtID} className='py-2 border-b-2'>
                                    <div className='flex justify-start items-center'>
                                        <Avatar size='default' icon={<UserOutlined/>}/>
                                        <div className='ml-4'>
                                            <p>{cmtItem.userId}</p>
                                            <Rate value={cmtItem.vote} disabled/>
                                        </div>
                                    </div>
                                    <p>{cmtItem.comment}</p>
                                </div>
                            }
                        })}

                        <Pagination className='text-center mt-4' defaultCurrent={1} total={currentCommentList.length}
                                    defaultPageSize={DEFAULT__PAGESIZE} onChange={(page, pageSize) => {
                            let topScroll = document.getElementById('feedbackArea')?.offsetTop
                            if (topScroll) {
                                backToPosition(topScroll)
                            }
                            setCurrentPage(page)
                        }}/>
                    </div>
                  
                </div>
              
                <div className='xl:col-span-2 col-span-6'>
                    <div className='flex justify-between font-bold text-xl mb-4'>
                        <p>Relate Contest</p>
                        <NavLink to={'/home'}><ArrowRightOutlined className='-translate-y-1'/></NavLink>
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
                        <Button className='customNavigationSlide customPrevSlide'><LeftCircleOutlined
                            style={{transform: 'translateY(-6px)'}}/></Button>
                        <Button className='customNavigationSlide customNextSlide'><RightCircleOutlined
                            style={{transform: 'translateY(-6px)'}}/></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContestDetail