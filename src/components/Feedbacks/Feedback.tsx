import React from 'react'
import CardFeedback from '../Card/CardFeedback'
import { useTranslation } from 'react-i18next'
let arrFeedback = [
  {
    id: 2,
    userID: 3,
    feedback: 'Take advantage of premium VCE Files which are guaranteed by Exam-Labs & Get Certified Easily!',
    rate: 4
  },
  {
    id: 3,
    userID: 5,
    feedback: 'Fast Free Updates to Cover Latest Pool of Questions',
    rate: 5
  },
  {
    id: 4,
    userID: 10,
    feedback: 'DP-900 Microsoft Azure Data Fundamentals Topic: Data Visualization',
    rate: 3
  },
]
type Props = {}

const Feedback = (props: Props) => {
  const {t}=useTranslation('feedback')
  return (
    <div className='bg-slate-100'>
      <div className='size__component py-12'>
        <h1 className='text__title'>{t('what do our customers say?')} </h1>
        <div className="grid grid-cols-3 gap-8 pt-8">
          {arrFeedback.map((feedbackItem, index) => {
            return <CardFeedback key={index} feedback={feedbackItem} />
          })}

        </div>
      </div>
    </div>
  )
}

export default Feedback