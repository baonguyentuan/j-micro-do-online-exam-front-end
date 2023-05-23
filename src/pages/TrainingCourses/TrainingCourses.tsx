import React from 'react';
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CardCourse from '../../components/Card/CardCourse';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
import { useTranslation } from 'react-i18next';
type Props = {}

function TrainingCourses(props: Props) {
    const { t } = useTranslation('card')
    const items = [
        { name: t('nav.home'), link: "/" },
        { name: t('nav.training_course') },
    ];
    const { arrHotCourse } = useSelector((state: RootState) => state.courseSlice)

    return (
        <div>
            <Breadcrumb items={items} />
            <div className='size__component py-6'>
                <div>
                    <h3 className='text__title'>Amazon</h3>
                </div>
                <div className='pt-8'>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={4}
                        navigation={true}
                    >
                        {arrHotCourse.map((courseItem, index) => {
                            return <SwiperSlide key={courseItem.id}><CardCourse courseDetail={courseItem} /> </SwiperSlide>
                        })}
                    </Swiper>
                </div>
                <div className='w-full flex justify-center'>
                    <Button className='mt-4 btn__banner'>{t('cardCourse.more courses')}</Button>
                </div>
            </div>
            <div className='size__component py-6'>
                <div>
                    <h3 className='text__title'>Microsoft</h3>
                </div>
                <div className='pt-8'>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={4}
                        navigation={true}
                    >
                        {arrHotCourse.map((courseItem, index) => {
                            return <SwiperSlide key={courseItem.id}><CardCourse courseDetail={courseItem} /> </SwiperSlide>
                        })}
                    </Swiper>
                </div>
                <div className='w-full flex justify-center'>
                    <Button className='mt-4 btn__banner'>{t('cardCourse.more courses')}</Button>
                </div>
            </div>
            <div className='size__component py-6'>
                <div>
                    <h3 className='text__title'>Oracle</h3>
                </div>
                <div className='pt-8'>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={4}
                        navigation={true}
                    >
                        {arrHotCourse.map((courseItem, index) => {
                            return <SwiperSlide key={courseItem.id}><CardCourse courseDetail={courseItem} /> </SwiperSlide>
                        })}
                    </Swiper>
                </div>
                <div className='w-full flex justify-center'>
                    <Button className='mt-4 btn__banner'>{t('cardCourse.more courses')}</Button>
                </div>
            </div>
        </div>
    );
}

export default TrainingCourses