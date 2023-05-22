import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CardCourse from '../Card/CardContest'
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getLstHotContest } from '../../redux/reducers/contest/contestSlice';
type Props = {}

const HotCourse = (props: Props) => {
    const { arrHotContest } = useSelector((state: RootState) => state.contestSlice)
    const dispatch:DispatchType=useDispatch()
    const {t}=useTranslation('card')
    useEffect(()=>{
        dispatch(getLstHotContest())
    },[])
    return (
        <div className='size__component py-12'>
            <div>
                <h1 className='text__title'>{t('cardCourse.hot training course')}</h1>
            </div>
            <div className='pt-8'>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={true}
                    breakpoints={{
                        1536:{
                            slidesPerView:4,
                            spaceBetween:50,
                        },
                        1280:{
                            slidesPerView:4,
                            spaceBetween:40,
                        },
                        1084:{
                            slidesPerView:3,
                            spaceBetween:40,
                        },
                        640:{
                            slidesPerView:2,
                            spaceBetween:40,
                        },
                    }}
                >
                    {arrHotContest.map((contestItem, index) => {
                        return <SwiperSlide key={contestItem.id}><CardCourse contestDetail={contestItem} /> </SwiperSlide>
                    })}
                </Swiper>
            </div>
            <div className='w-full flex justify-center max-sc'>
                <Button className='mt-4 btn__banner'>{t('cardCourse.more courses')}</Button>
            </div>
        </div>
    )
}

export default HotCourse