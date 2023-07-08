import React from 'react'
import CardFeedback from '../Card/CardFeedback'
import { useTranslation } from 'react-i18next'
import user1 from '../../assets/img/imgsrc/feedback-user1 .jpg';
import user2 from '../../assets/img/imgsrc/feedback-user2.jpg';
import user3 from '../../assets/img/imgsrc/feedback-user3.jpg';
let arrFeedback = [
  {
    id: 2,
    userID: 3,
    img: user1,
    feedback: 'Take advantage of premium VCE Files which are guaranteed by Exam-Labs & Get Certified Easily!',
    rate: 4
  },
  {
    id: 3,
    userID: 5,
    img: user2,
    feedback: 'Fast Free Updates to Cover Latest Pool of Questions',
    rate: 5
  },
  {
    id: 4,
    userID: 10,
    img: user3,
    feedback: 'DP-900 Microsoft Azure Data Fundamentals Topic: Data Visualization',
    rate: 3
  },
]
type Props = {}

const Feedback = (props: Props) => {
  const {t}=useTranslation('feedback')
  return (
    <div className='bg-slate-200'>
      <div className='size__component py-16'>
        <h1 className='text__title'>{t('what do our customers say?')} </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 pt-8">
          {arrFeedback.map((feedbackItem, index) => {
            return <CardFeedback key={index} feedback={feedbackItem} />
          })}

        </div>
      </div>
    </div>
  )
}

export default Feedback