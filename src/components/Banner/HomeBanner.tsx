import React from 'react'
import { Carousel } from 'antd';
import PremiumBanner from './PremiumBanner';
import IntroductionBanner from './IntroductionBanner';
type Props = {}
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
const HomeBanner = (props: Props) => {
  return (
    <Carousel autoplay autoplaySpeed={4000} dots={false}>
    <div className='h-full bg-slate-200'>
      <IntroductionBanner/>
    </div>
    <div className='h-full bg-slate-200'>
      <PremiumBanner/>
    </div>
  </Carousel>
  )
}

export default HomeBanner