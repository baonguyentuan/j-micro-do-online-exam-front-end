import React from 'react'
import { Button, Card, Rate } from 'antd';
import { ContestInfoModel } from '../../_core/ContestModel';
import { useTranslation } from 'react-i18next';
import { calculateAverageRate } from '../../utils/operate';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import { getContestDetailApi } from '../../redux/reducers/contest/contestSlice';
type Props = {
    contestDetail: ContestInfoModel
}
const CardContest = ({ contestDetail }: Props) => {
    const { t } = useTranslation('card')
    const navigate=useNavigate()
    const dispatch:DispatchType=useDispatch()
    return (
        <Card
            className='card__course pb-4 cursor-pointer '
            size="small"
            onClick={async()=>{
                dispatch(getContestDetailApi(contestDetail.id))    
                navigate(`/contest/${contestDetail.id}`)
            }}
            style={{ backgroundImage: `url('${contestDetail.imgSrc}')`, backgroundRepeat: 'none', backgroundPosition: 'center 0', backgroundSize: 'cover', }}
            title={<div className='course__title '>
                <div className='course__name'>
                    {contestDetail.name}
                </div>
                <span className={`course__premiumTag premiumTag ${contestDetail.premium === 'free' ? 'color__free' : 'color__premium'}`}>{contestDetail.premium.toLocaleUpperCase()}</span>
                <p className='course__desc'>
                    <span className='statsName'>{t('cardCourse.description')}: </span>
                    <span>
                        {contestDetail.description.length > 100 ? `${contestDetail.description.slice(0, 200)} . . .` : contestDetail.description}
                    </span>
                </p>
                <div className='course__info'>
                    <p className='statsName'>{t('cardCourse.category')}</p>
                    <p>{contestDetail.categories.join(' / ')}</p>
                </div>
            </div>}
        >
            <div className='course__stats'>
                <div>
                    <p className='statsName'>{t('cardCourse.uploaded by')}</p>
                    <p>{contestDetail.createBy}</p>
                </div>
                <div>
                    <p className='statsName'>{t('cardCourse.duration')}</p>
                    <p>{contestDetail.duration}min</p>
                </div>
                <div className=''>
                    <p className='statsName'>{t('cardCourse.rating')}</p>
                    <Rate className='flex items-center text-xs' disabled defaultValue={calculateAverageRate(contestDetail.rating)} />
                </div>
            </div>
        </Card>
    )
}

export default CardContest