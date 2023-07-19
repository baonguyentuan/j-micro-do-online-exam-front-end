import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderTitle from "../components/Header/HeaderTitle";
import HeaderNavbar from "../components/Header/HeaderNavbar";
import FooterIntro from "../components/Footer/FooterIntro";
import FooterCopyright from "../components/Footer/FooterCopyright";
import Loading from "../components/Loading/Loading";
import AccountModal from "../components/Modal/account/AccountModal";
import { getUserInfoApi } from "../redux/reducers/user/userSlice";
import { DispatchType } from "../redux/configStore";
import { useDispatch } from "react-redux";


export default function HomeLayout() {
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoApi());
  }, []);

  return (
    <div className="relative">
      <>
        <AccountModal />
      </>
      <Loading />
      <header className="bg-white">
        <HeaderTitle />
        <HeaderNavbar />
      </header>
      <Outlet />
      <footer>
        <FooterIntro />
        <FooterCopyright />
      </footer>
    </div>
  );
}