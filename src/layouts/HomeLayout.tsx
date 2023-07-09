import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import HeaderTitle from '../components/Header/HeaderTitle';
import HeaderNavbar from '../components/Header/HeaderNavbar';
import FooterIntro from '../components/Footer/FooterIntro';
import FooterCopyright from '../components/Footer/FooterCopyright';
import Loading from '../components/Loading/Loading';
import {useDispatch} from 'react-redux';
import {DispatchType} from '../redux/configStore';
import { getUserInfoApi } from '../redux/reducers/user/userSlice';

type Props = {}

export default function HomeLayout({}: Props) {
  const dispatch: DispatchType = useDispatch()
  useEffect(() => {
    //dispatch(getUserInfoApi())
  }, [])
  return (
    <div className='relative'>
      <Loading/>
      <header className='bg-white'>
        <HeaderTitle/>
        <HeaderNavbar/>
      </header>
      <Outlet/>
      <footer>
        <FooterIntro/>
        <FooterCopyright/>
      </footer>
    </div>

  )
}