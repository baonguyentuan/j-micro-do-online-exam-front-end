import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CardCourse from '../Card/CardCourse'
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
import { useTranslation } from 'react-i18next';
type Props = {}

const HotCourse = (props: Props) => {
    const { arrHotCourse } = useSelector((state: RootState) => state.courseSlice)
    const {t}=useTranslation('card')
    return (
        <div className='size__component py-12'>
            <div>
                <h1 className='text__title'>{t('cardCourse.hot training course')}</h1>
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
    )
}

export default HotCourse