import React, {useEffect} from 'react';
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {DispatchType, RootState} from '../../redux/configStore';
import {useTranslation} from 'react-i18next';
import {getExamsByCategoryApi} from '../../redux/reducers/examSlice/examSlice'
import {Navigation} from "swiper";
import CardCourse from "../../components/Card/CardContest";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import AppRoutes from "../../constants/AppRoutes";

function TrainingCourses() {
    const dispatch: DispatchType = useDispatch()
    const {t} = useTranslation('card')
    const items = [
        {name: t('nav.home'), link: AppRoutes.public.home},
        {name: t('nav.training_course')},
    ];

    const {hotExamsByCategory} = useSelector((state: RootState) => state.examSlice)

    useEffect(() => {
        dispatch(getExamsByCategoryApi())
    }, [])

    return (
        <div>
            <div className='size__component'>
                <Breadcrumb items={items}/>
            </div>
            <div>
                {
                    Object.keys(hotExamsByCategory).map((name, index) => {
                        return <div key={index} className='size__component py-6'>
                            <h3 className='text-2xl font-bold'>{name}</h3>
                            <div className='pt-4 relative'>
                                <Swiper
                                    spaceBetween={30}
                                    slidesPerView={2}
                                    modules={[Navigation]}
                                    navigation={{
                                        prevEl: '.customPrevSlide',
                                        nextEl: '.customNextSlide',
                                    }}
                                    breakpoints={{
                                        1280: {
                                            slidesPerView: 4,
                                        },
                                        1084: {
                                            slidesPerView: 3,
                                        },
                                        640: {
                                            slidesPerView: 2,
                                        },
                                    }}
                                >
                                    {
                                        hotExamsByCategory[name].map((exam, index: number) => {
                                            return <SwiperSlide key={index}>
                                                <CardCourse examCard={exam}/>
                                            </SwiperSlide>
                                        })
                                    }
                                </Swiper>
                                {
                                    hotExamsByCategory[`${name}`].length > 4 ? (<>
                                        <Button className='customNavigationSlide customPrevSlide'><LeftCircleOutlined
                                            style={{transform: 'translateY(-6px)'}}/></Button>
                                        <Button className='customNavigationSlide customNextSlide'><RightCircleOutlined
                                            style={{transform: 'translateY(-6px)'}}/></Button>
                                    </>) : ''
                                }
                            </div>
                            <div className='w-full flex justify-center'>
                                <Button className='mt-4 btn__banner'>
                                    <Link
                                        to={{pathname: `${AppRoutes.public.courses}/${name}`}}>{t('cardCourse.more courses')}</Link>
                                </Button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default TrainingCourses