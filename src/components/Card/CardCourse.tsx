import React from 'react'
import { Button, Card, Rate } from 'antd';
import { CourseInfoModel } from '../../_core/CourseModel';
import { useTranslation } from 'react-i18next';
type Props = {
    courseDetail: CourseInfoModel
}
const CardCourse = ({ courseDetail }: Props) => {
    const {t}=useTranslation('card')
    return (
        <Card
            className='card__course pb-4 cursor-pointer '
            size="small"
            style={{ backgroundImage: `url('${courseDetail.imgSrc}')`, backgroundRepeat: 'none', backgroundPosition: 'center 0', backgroundSize: 'cover', }}
            title={<div className='course__title '>
                <div className='course__name'>
                    {courseDetail.name}
                </div>
                <span className={`course__premiumTag ${courseDetail.premium === 'free' ? 'freeTag' : 'premiumTag'}`}>{courseDetail.premium.toLocaleUpperCase()}</span>
                <p className='course__desc'>
                    <span className='statsName'>{t('cardCourse.description')}: </span>
                    <span>
                        {courseDetail.description.length > 100 ? `${courseDetail.description.slice(0, 200)} . . .` : courseDetail.description}
                    </span>
                </p>
                <div className='course__info'>
                    <p className='statsName'>{t('cardCourse.category')}</p>
                    <p>{courseDetail.categories.join(' / ')}</p>
                </div>
            </div>}
        >
            <div className='course__stats'>
                <div>
                    <p className='statsName'>{t('cardCourse.uploaded by')}</p>
                    <p>{courseDetail.createBy}</p>
                </div>
                <div>
                    <p className='statsName'>{t('cardCourse.duration')}</p>
                    <p>{courseDetail.duration}min</p>
                </div>
                <div className=''>
                    <p className='statsName'>{t('cardCourse.rating')}</p>
                    <Rate className='flex items-center text-xs' disabled defaultValue={courseDetail.rating} />
                </div>
            </div>
        </Card>
    )
}

export default CardCourse