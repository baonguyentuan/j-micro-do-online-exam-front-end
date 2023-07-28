import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import { backToPosition } from '../../utils/operate'

type Props = {}

const ViewExam = (props: Props) => {
    const { fullExamDetail, examGetDetail } = useSelector((state: RootState) => state.examSlice)

    return (
        <div >
            <h1 className='text-center font-bold text-2xl m-4'>Exam Infomation</h1>
            <div className='grid grid-cols-3 gap-8'>
                <div className='col-span-2'>
                    <p><span className='prop__title'>Name: </span> <span className='text-base'>{fullExamDetail.title}</span></p>
                    <div className=' '><span className='prop__title flex-1'>Description: </span> <span className='text-base block text-justify'>{fullExamDetail.description}</span></div>
                </div>
                <div className='col-span-1'>
                    <div className=' flex items-start'>
                        <p className='prop__title'>Thumbnail: </p>
                        <img style={{ width: 150, border: '1px solid black' }} src={examGetDetail.image} alt={fullExamDetail.title} />
                    </div>
                    <p><span className='prop__title'>Category:</span> <span className='text-base'>{examGetDetail.categoryName}</span></p>
                    <p><span className='prop__title'>Duration:</span> <span className='text-base'>{fullExamDetail.duration} min</span></p>
                    <p><span className='prop__title'>Type:</span> <span className='text-base'>{examGetDetail.examType}</span></p>
                    <p><span className='prop__title'>Rate:</span> <span className='text-base'>{examGetDetail.totalRating}</span></p>
                    <p><span className='prop__title'>Downloaded:</span> <span className='text-base'>{examGetDetail.downloadNumber}</span></p>
                </div>
            </div>
            <div>
                <h1 className='text-center font-bold text-xl m-4'>Question</h1>
                {fullExamDetail.question.map((questionItem, index) => {
                    return <div>
                        <p className='my-4'>
                            <span className='prop__title'>{index + 1}: </span>
                            <span className='text-base'>{questionItem.question}</span>
                            <span className='text-base font-semibold'>{`( ${questionItem.questionType} CHOICE - ${questionItem.questionPoint} POINTS )`}</span>
                        </p>
                        <div className='grid grid-cols-2 gap-4'>
                            {questionItem.answers.map((answerItem, index) => {
                                let checkCorrectAnswerIndex = questionItem.correctAnswers.findIndex(ans => ans === index)
                                if (checkCorrectAnswerIndex !== -1) {
                                    return <p key={index} className='flex bg-green-200 overflow-hidden border-2 border-blue-300 '><span className='block h-full px-4 py-2 bg-slate-300'>{`${index + 1}`}</span><span className='inline-block  p-2'>{answerItem}
                                    </span></p>
                                } else {
                                    return <p key={index} className='flex overflow-hidden border-2 border-blue-300'><span className=' block h-full  px-4 py-2 bg-slate-300'>{`${index + 1}`}</span><span className='p-2'>
                                        {answerItem}</span></p>
                                }
                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ViewExam