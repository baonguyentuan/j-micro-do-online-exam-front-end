import React from 'react'
import { Card, Rate } from "antd";
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {ExamCardInfoModel} from "../../_core/exam";
import AppRoutes from "../../constants/AppRoutes";

type Props = { examCard: ExamCardInfoModel }
const CardContest = ({examCard}: Props) => {
  const {t} = useTranslation('card')
  const navigate = useNavigate()

  return (
    <Card
      className='card__course pb-4 cursor-pointer '
      size="small"
      onClick={async () => {
        navigate(`${AppRoutes.public.courses}/${examCard.categoryName}/${examCard.examName}`)
      }}
      style={{
        backgroundImage: `url('${examCard.image}')`,
        backgroundRepeat: 'none',
        backgroundPosition: 'center 0',
        backgroundSize: 'cover',
      }}

      title={<div className='course__title '>
        <div className='course__name'>
          {examCard.examName}
        </div>
        <span
          className={`course__premiumTag premiumTag ${examCard.examType === 'FREE' ? 'color__free' : 'color__premium'}`}>{examCard.examType}</span>
        <p className='course__desc'>
          <span className='statsName'>{t('cardCourse.description')}: </span>
          <span>
                        {examCard.description.length > 100 ? `${examCard.description.slice(0, 200)} . . .` : examCard.description}
                    </span>
        </p>
        <div className='course__info'>
          <p className='statsName'>{t('cardCourse.category')}</p>
          <p>{examCard.categoryName}</p>
        </div>
      </div>}
    >
      <div className='course__stats'>
        <div>
          <p className='statsName'>{t('cardCourse.duration')}</p>
          <p>{examCard.duration} min</p>
        </div>
        <div>
            <p className='statsName'>{t('cardCourse.rating')}</p>
            <Rate className='flex items-center text-xs' disabled
                  defaultValue={examCard?.totalRating}/>
        </div>
        <div>
            <p className='statsName'>Download</p>
          <p>{examCard?.downloadNumber}</p>
        </div>
      </div>
    </Card>
  )
}

export default CardContest