import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Badge, Button, Drawer, Dropdown, Popover, Select, Space } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { useTranslation } from "react-i18next";
import HeaderNavbarMobile from "./HeaderNavbarMobile";
import "../../assets/css/header/header_title.css";
import AppRoutes from "../../constants/AppRoutes";
import Constants from "../../constants/Constants";
import { getLocalStorage } from "../../utils/local-storage";
import { BellOutlined, CloseOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
import { setNotifyBadge, setNotifyReaded } from "../../redux/reducers/notification/notificationSlice";
import { postLogout } from "../../redux/reducers/auth";
import { setDefaultTabAccountKey } from "../../redux/reducers/menu/menuSlice";

type Props = {}

export default function HeaderTitle({ }: Props) {
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("header");
  let [openMenu, setOpenMenu] = useState(false);
  const { haveNewNotify, arrNotify } = useSelector((state: RootState) => state.notificationSlice);

  const handleLogout = () => {
    dispatch(postLogout({ clientID: getLocalStorage(Constants.localStorageKey.userID) }))
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <NavLink to={AppRoutes.private.user.account}>{t("account")}</NavLink>
      )
    },
    {
      key: "2",
      label: (
        <p onClick={async () => {
          await dispatch(setDefaultTabAccountKey({ key: 'payment' }))
          await navigate(AppRoutes.private.user.account)
        }}><span>{t("premium")}: </span><span
          className={`premium_type ${getLocalStorage(Constants.localStorageKey.account) === "ADMIN" ? "hidden" : ""}`}>
            {getLocalStorage(Constants.localStorageKey.account)}</span></p>
      )
    },
    {
      key: "3",
      label: (
        <NavLink to={AppRoutes.private.user.create_exam}>{t("create exam")}</NavLink>
      )
    },
    {
      key: "4",
      label: (
        <NavLink to={AppRoutes.private.user.create_contest}>{t("create contest")}</NavLink>
      )
    },
    {
      key: "5",
      label: (<p onClick={handleLogout}>{t("logout")}</p>
      )
    }
  ];

  let userRender = () => {
    const username = getLocalStorage(Constants.localStorageKey.username);
    if (getLocalStorage(Constants.localStorageKey.accessToken) && username) {
      return <Space>
        <span className="notification">
          <Popover placement="bottom"
            title={
              <h1 className="p-2 border-b-2 m-0 ">Thông báo mới nhận</h1>
            }
            content={
              <div className="notification__list">
                <ul className="border-b-2 p-0 m-0">
                  {arrNotify.map((notifyItem, index) => {
                    return <li key={notifyItem.id}
                      className={`notify__item ${notifyItem.readStatus ? "" : "unreaded"}`}
                      onClick={() => {
                        dispatch(setNotifyReaded({ notify: notifyItem }));
                      }}>{notifyItem.message}</li>;
                  })}
                </ul>
                <NavLink className="block text-center p-2" to={"/home"}>Xem tất cả</NavLink>
              </div>
            } trigger="hover">
            <span className="p-2" onMouseEnter={() => {
              setTimeout(() => {
                dispatch(setNotifyBadge({ status: false }));
              }, 1500);
            }
            }>
              <Badge dot={haveNewNotify} size="default">
                <BellOutlined className="text-xl -translate-y-1" />
              </Badge>
            </span>
          </Popover>
        </span>
        <Dropdown className="lg:block hidden" menu={{ items }} placement="bottom">
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ border: "1px solid gray", padding: "2px 8px", borderRadius: "4px" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>{username}</span>
              <DownOutlined style={{ fontSize: "12px" }} className="-translate-y-1" />
            </Space>
          </a>
        </Dropdown>
      </Space>;

    } else {
      return <NavLink to={AppRoutes.public.login}>{t("signin")}</NavLink>;
    }
  };
  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };
  useEffect(() => {
    let checkNewNotify = arrNotify.findIndex(noti => noti.readStatus === false);
    if (checkNewNotify !== -1) {
      dispatch(setNotifyBadge({ status: true }));
    } else {
      dispatch(setNotifyBadge({ status: false }));

    }
  }, []);
  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.4)" }}>
      <div className=" flex justify-between items-center  size__component py-3">
        <Button className="inline-block lg:hidden" onClick={() => {
          setOpenMenu(true);
        }}><MenuOutlined className="-translate-y-1" /></Button>
        <NavLink to={AppRoutes.public.home} className="main-logo">DO ONLINE EXAM</NavLink>
        <div>
          <Space>
            {userRender()}
            <Select
              defaultValue="vn"
              style={{ width: 70 }}
              onChange={handleChange}
              options={[
                { value: "vn", label: "VNI" },
                { value: "en", label: "ENG" }
              ]}
            />
          </Space>
        </div>
      </div>
      <Drawer
        className="max-w-sm p-0"
        title={<div className="flex justify-between items-center">
          <NavLink className="main-logo" to={AppRoutes.public.home}>DO ONLINE EXAM</NavLink>
          <Button className="h-auto py-1 px-2" onClick={() => {
            setOpenMenu(false);
          }}><CloseOutlined className="-translate-y-1 text-xl" /></Button>
        </div>}
        placement="left"
        closable={false}
        onClose={() => {
          setOpenMenu(false);
        }} open={openMenu}>
        <div className="h-full">
          <HeaderNavbarMobile />
        </div>
      </Drawer>
    </div>

  );
}