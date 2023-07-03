import React, { useEffect } from 'react';
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CardContest from '../../components/Card/CardContest';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getLstHotContest } from '../../redux/reducers/contest/contestSlice';
import {Navigation} from "swiper";
import CardCourse from "../../components/Card/CardContest";
import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
type Props = {}

function TrainingCourses(props: Props) {
    const { t } = useTranslation('card')
    const items = [
        { name: t('nav.home'), link: "/" },
        { name: t('nav.training_course') },
    ];
    const { arrHotContest } = useSelector((state: RootState) => state.contestSlice)
    console.log(arrHotContest);
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getLstHotContest())
    })

    return (
        <div>
            <div className='size__component'>
                <Breadcrumb items={items} />
            </div>
            <div className='size__component py-6'>
                <h3 className='text-2xl font-bold'>Amazon</h3>
                <div className='pt-4 relative'>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
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
                        {arrHotContest.map((contestItem, index) => {
                            return <SwiperSlide key={contestItem.id}><CardCourse contestDetail={contestItem} /> </SwiperSlide>
                        })}
                    </Swiper>
                    <Button className='customNavigationSlide customPrevSlide'><LeftCircleOutlined style={{ transform: 'translateY(-6px)' }} /></Button>
                    <Button className='customNavigationSlide customNextSlide'><RightCircleOutlined style={{ transform: 'translateY(-6px)' }} /></Button>
                </div>
                <div className='w-full flex justify-center'>
                    <Button className='mt-4 btn__banner'>{t('cardCourse.more courses')}</Button>
                </div>

            </div>
        </div>
    );
}

export default TrainingCourses