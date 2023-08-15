import React from "react";
import { Badge, Button } from "antd";
import { NavLink } from "react-router-dom";
import ChatBox from "../ChatBox/ChatBox";
import "../../assets/css/footer/footer.css";
import "../../assets/css/chat/chat.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/configStore";
import { useTranslation } from "react-i18next";
import { backToPosition } from "../../utils/operate";
import payment_method from "../../assets/img/imgsrc/payment.png";
import { MessageOutlined, SwapRightOutlined, UpSquareOutlined } from "@ant-design/icons";
import { setChatBoxShow, setReadMessageStatus } from "../../redux/reducers/chat/chatSlice";


export default function FooterIntro() {
  const dispatch = useDispatch();
  const { t } = useTranslation("footer");
  const { chatBoxShow, unReadMessage } = useSelector((state: RootState) => state.chatSlice);

  return (
    <div className="footer__intro border-t-4 border-indigo-200 py-10">
      <div className=" grid md:grid-cols-4 grid-cols-1 gap-4 size__component">
        <ul className="flex items-center">
          <NavLink className="text-3xl logo-font" to={"/home"}>
            DO ONLINE EXAM
          </NavLink>
        </ul>

        <ul className="flex flex-col gap-5">
          <NavLink to={"/home"} className="flex items-center gap-2">
            <SwapRightOutlined />
            <span className="text-xl">{t("examProvider")}</span>
          </NavLink>
          <NavLink to={"/home"} className="flex items-center gap-2">
            <SwapRightOutlined />
            <span className="text-xl">{t("requestExam")}</span>
          </NavLink>
          <NavLink to={"/home"} className="flex items-center gap-2">
            <SwapRightOutlined />
            <span className="text-xl">{t("archive")}</span>
          </NavLink>
        </ul>

        <ul className="flex flex-col gap-5">
          <NavLink to={"/home"} className="flex items-center gap-2">
            <SwapRightOutlined />
            <span className="text-xl">{t("contact")}</span>
          </NavLink>
          <NavLink to={"/home"} className="flex items-center gap-2">
            <SwapRightOutlined />
            <span className="text-xl">{t("faq")}</span>
          </NavLink>
          <NavLink to={"/home"} className="flex items-center gap-2">
            <SwapRightOutlined />
            <span className="text-xl">{t("blog")}</span>
          </NavLink>
        </ul>

        <ul className="flex flex-col gap-5">
          <NavLink to={"/home"} className="flex items-center gap-2">
            <SwapRightOutlined />
            <span className="text-xl">{t("facebook")}</span>
          </NavLink>
          <NavLink to={"/home"} className="flex items-center gap-2">
            <SwapRightOutlined />
            <span className="text-xl">{t("privacyPolicy")}</span>
          </NavLink>
          <NavLink to={"/home"} className="flex items-center gap-2">
            <SwapRightOutlined />
            <span className="text-xl">{t("termsConditions")}</span>
          </NavLink>
        </ul>
      </div>
      <div className="flex md:justify-center mt-4" style={{ height: "80px", width: "100%" }}>
        <img style={{ height: "100%" }} src={payment_method} alt="img" />
      </div>
      <div className="support__area">
        <Button type="link" className="btn__sup" onClick={() => {
          dispatch(setChatBoxShow({ chatboxShow: !chatBoxShow }));
          if (unReadMessage > 0) {
            dispatch(setReadMessageStatus());
          }
        }}>
          <Badge count={unReadMessage} size="default">
            <MessageOutlined className="sup__icon" />
          </Badge>
        </Button>
        <ChatBox chatboxShow={chatBoxShow} />
        <Button type="link" className="btn__sup" onClick={() => {
          backToPosition(0);
        }}><UpSquareOutlined className="sup__icon" /></Button>
      </div>
    </div>
  );
}