import React from 'react'
import { Button } from 'antd'
import { ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons'
import '../../assets/css/banner/banner.css'
import { useTranslation } from 'react-i18next'
type Props = {}

const IntroductionBanner = (props: Props) => {
    const {t}=useTranslation('banner')
    return (
        <div className='size__component h-full ' style={{ height: 600 }}>
            <div className='grid grid-cols-2 h-full '>
                <div className='h-full flex items-center'>
                    <div>
                        <h1 className='text-2xl font-bold pb-4' >{t('bannerIntroduction.90% of our customers pass their exam in the first attempt')}</h1>
                        <ul className='text-lg pl-2 pb-4'>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerIntroduction.improve skill & score')}</li>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerIntroduction.get Latest exam questions')}</li>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerIntroduction.100% accurate answers')}</li>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerIntroduction.instant access')}</li>
                        </ul>
                        <Button className='btn__banner'>{t('bannerIntroduction.go to exam')} <ArrowRightOutlined style={{ transform: 'translate(0,-3px)' }} /></Button>
                    </div>
                </div>
                <div className='h-full flex items-center'>
                    <img className='img__banner' src="https://www.exam-labs.com/static/img/cert/hero_banner_white.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default IntroductionBanner