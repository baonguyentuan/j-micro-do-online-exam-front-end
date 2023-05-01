import React from 'react'
import CardStatistics from '../Card/CardStatistics'
import { stat } from 'fs'
import { useTranslation } from 'react-i18next'

type Props = {}
let arrStat=[
  {
    id:1,
    icon:<i className="fa fa-book-open card__icon__title"></i>,
    stats:2300,
    desc:'Exam answers & resources'
  },
  {
    id:2,
    icon:<i className="fa fa-user-graduate card__icon__title"></i>,
    stats:400,
    desc:'Certified Trainers & Industry experts'
  },
  {
    id:3,
    icon:<i className="fa fa-star card__icon__title"></i>,
    stats:4,
    desc:'Pass rate. Happiness Guaranteed'
  },
  {
    id:4,
    icon:<i className="fa fa-users card__icon__title"></i>,
    stats:10000,
    desc:'Happy customers worldwide'
  },
]
const Statistics = (props: Props) => {
  const {t}=useTranslation('card')
  return (
    <div className='bg-slate-100'>
    <div className='size__component py-12 '>
    <h1 className='text__title'>{t('cardStatistic.statistics')} </h1>
    <div className="grid grid-cols-4 gap-8 pt-8">
      {arrStat.map((statItem,index)=>{
        return <CardStatistics key={statItem.id}  statistics={statItem}/>
      })}
    </div>
</div>
    </div>
  )
}

export default Statistics