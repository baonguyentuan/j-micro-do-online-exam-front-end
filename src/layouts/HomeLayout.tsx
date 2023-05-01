import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderTitle from '../components/Header/HeaderTitle';
import HeaderNavbar from '../components/Header/HeaderNavbar';
import FooterIntro from '../components/Footer/FooterIntro';
import FooterCopyright from '../components/Footer/FooterCopyright';
import Loading from '../components/Loading/Loading';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/reducers/loading/loadingSlice';
type Props = {}

export default function HomeLayout({ }: Props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading({ isLoading: true }))
        setTimeout(()=>{
            dispatch(setLoading({isLoading:false}))
        },100)
    }, [])
    return (
        <div className='relative'>
            <Loading />
            <header className='bg-white'>
                <HeaderTitle />
                <HeaderNavbar />
            </header>
            <Outlet />
            <footer>
                <FooterIntro />
                <FooterCopyright />
            </footer>
        </div>

    )
}