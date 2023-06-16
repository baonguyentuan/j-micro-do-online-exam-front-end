import React from 'react'
import { Button } from 'antd'
import { ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons'
import '../../assets/css/banner/banner.css'
import premiumJpg from '../../assets/img/imgsrc/premium.png'
import { useTranslation } from 'react-i18next'
type Props = {}

const PremiumBanner = (props: Props) => {
    const { t } = useTranslation('banner')
    return (
        <div className='size__component banner__size' >
            <div className='grid md:grid-cols-2 h-full '>
                <div className='h-full flex items-center md:order-1 order-2'>
                    <div className='mb-4'>
                        <h1 className='md:text-2xl text-xl font-bold pb-4' >{t('bannerPremium.get unlimited access to all premium exam')}</h1>
                        <p className='md:text-xl text-lg pb-4'>{t('bannerPremium.take advantage of premium VCE Files which are guaranteed by Our Examination & Get Certified Easily!')}</p>
                        <ul className='text-lg pl-2  pb-4'>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerPremium.unlimited Exam')}</li>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerPremium.guaranteed to have Latest Exam Questions')}</li>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerPremium.instant download')}</li>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerPremium.unlimited create contest')}</li>
                        </ul>
                        <Button className='btn__banner' >{t('bannerPremium.get premium')} <ArrowRightOutlined style={{ transform: 'translate(0,-3px)' }} /></Button>
                    </div>
                </div>
                <div className='h-full flex items-center md:order-2 order-1'>
                    <img className='img__banner' src={premiumJpg} alt="premium banner" />
                </div>
            </div>
        </div>
    )
}

export default PremiumBanner