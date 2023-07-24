import "swiper/css";
import { Button } from "antd";
import { Navigation } from "swiper";
import { Swiper } from "swiper/react";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { DispatchType } from "../../redux/configStore";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

type Props = {}

const HotContest = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { t } = useTranslation("card");

  useEffect(() => {}, []);

  return (
    <div className="size__component py-12">
      <div>
        <h1 className="text__title">{t("cardCourse.hot training course")}</h1>
      </div>
      <div className="pt-8 relative">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          modules={[Navigation]}
          navigation={{
            prevEl: ".customPrevSlide",
            nextEl: ".customNextSlide"
          }}
          breakpoints={{
            1280: {
              slidesPerView: 4

            },
            1084: {
              slidesPerView: 3
            },
            640: {
              slidesPerView: 2
            }
          }}
        >
          {/*{arrHotContest.map((contestItem, index) => {*/}
          {/*    return <SwiperSlide key={contestItem.id}><CardCourse contestDetail={contestItem} /> </SwiperSlide>*/}
          {/*})}*/}
        </Swiper>
        <Button className="customNavigationSlide customPrevSlide"><LeftCircleOutlined
          style={{ transform: "translateY(-6px)" }} /></Button>
        <Button className="customNavigationSlide customNextSlide"><RightCircleOutlined
          style={{ transform: "translateY(-6px)" }} /></Button>
      </div>
      <div className="w-full flex justify-center max-sc mt-2">
        <Button className="mt-4 btn__banner"><NavLink
          to={"/training_course"}>{t("cardCourse.more courses")}</NavLink></Button>
      </div>
    </div>
  );
};

export default HotContest;