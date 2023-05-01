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
        <div className='size__component h-full ' style={{ height: 600 }}>
            <div className='grid grid-cols-2 h-full '>
                <div className='h-full flex items-center'>
                    <div>
                        <h1 className='text-2xl font-bold pb-4' >{t('bannerPremium.get unlimited access to all premium exam')}</h1>
                        <p className='text-xl pb-4'>{t('bannerPremium.take advantage of premium VCE Files which are guaranteed by Our Examination & Get Certified Easily!')}</p>
                        <ul className='text-lg pl-2  pb-4'>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerPremium.unlimited Exam')}</li>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerPremium.guaranteed to have Latest Exam Questions')}</li>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerPremium.instant download')}</li>
                            <li className='pb-4'><CheckCircleOutlined className='icon__banner' />{t('bannerPremium.unlimited create contest')}</li>
                        </ul>
                        <Button className='btn__banner' >{t('bannerPremium.get premium')} <ArrowRightOutlined style={{ transform: 'translate(0,-3px)' }} /></Button>
                    </div>
                </div>
                <div className='h-full flex items-center'>
                    <img className='img__banner' src={premiumJpg} alt="premium banner" />
                </div>
            </div>
        </div>
    )
}

export default PremiumBanner