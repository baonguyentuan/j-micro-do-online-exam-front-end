import React, { useEffect, useState } from 'react'
import { Button, Pagination, Statistic } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { backToPosition } from '../../utils/operate';
import { DEFAULT__PAGE__SIZE } from '../../utils/config';
import { useDispatch } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { getContestingInfoApi, setAnswer } from '../../redux/reducers/contest/contestSlice';
import { QuestionContestModel } from '../../_core/exam';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const { Countdown } = Statistic;
type Props = {}
export default function Contesting({ }: Props) {
    let { contestId } = useParams()
    let [currentPage, setCurrentPage] = useState(1)
    let { contestingInfo, lstAnswer } = useSelector((state: RootState) => state.contestSlice)
    let { t } = useTranslation("contest")
    let dispatch: DispatchType = useDispatch()
    useEffect(() => {
        dispatch(getContestingInfoApi(Number(contestId)))
    }, [])
    let timecount = contestingInfo?.duration ? contestingInfo.duration : 0
    return (
        <div className='size__component grid grid-cols-6 gap-4 py-8'>
            <div className='col-span-2 ' >
                <div className='sticky right-0 top-0'>
                    <div className='px-2 m-2 border-2 border-solid rounded-2xl ' >
                        <h1 className='font-bold text-center text-xl'>{contestingInfo?.name}</h1>
                        <h1 className='font-bold text-center text-xl'>{dayjs().format('DD/MM/YYYY')}</h1>
                        <p><span>{t('detail.organize by')} : </span><span>{contestingInfo?.organization}</span></p>
                        <p><span>{t('detail.organize by')} : </span><span>{contestingInfo?.category.join(' / ')}</span></p>
                        <p><span>{t('detail.duration')} : </span><span>{contestingInfo?.duration}min</span></p>
                        <p><span>{t('detail.start at')} : </span><span>{dayjs(contestingInfo?.timeStart).format('HH:mm:ss')}</span></p>
                        <Countdown
                            title={<p>Time remain:</p>}
                            value={timecount * 60000 + Date.parse(String(contestingInfo?.timeStart))}
                            valueStyle={{ fontSize: 30 }}
                            format="HH:mm:ss"
                            onFinish={() => { alert(1) }} />
                        <Button className='my-2' onClick={() => {
                            console.log(Date.now() - Date.parse(String(contestingInfo?.timeStart)));
                        }}>Finish</Button>
                    </div>
                    <div className='px-2 m-4 border-2 border-solid rounded-2xl overflow-y-scroll' style={{ height: 250 }}>
                        <h1 className='font-bold text-center text-xl my-2'>{t('exam.manager answer')}</h1>
                        <div className='mb-2'>
                            <p><span><CheckCircleOutlined className='-translate-y-1 text-green-600 text-xl' /></span> : <span>{t('exam.manager answer')}</span></p>
                            <p><span><CloseCircleOutlined className='-translate-y-1 text-red-600 text-xl' /></span> : <span>{t('exam.manager answer')}</span></p>
                        </div>
                        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 pb-2'>
                            {lstAnswer.map((answer, answerIndex) => {
                                return <div onClick={async () => {
                                    await setCurrentPage(Math.floor((answerIndex) / DEFAULT__PAGE__SIZE) + 1)
                                    let topScroll = document.getElementById(`question-${answerIndex + 1}`)?.offsetTop
                                    if (topScroll) {
                                        backToPosition(topScroll)
                                    }
                                }} key={`question-${answerIndex}`} className='flex justify-between items-center border-2 border-solid rounded-sm p-2 hover:bg-slate-100 cursor-pointer'>
                                    <span className='text-center'>{`${answerIndex + 1}`}</span>
                                    {answer.answerSelected.length > 0 ? <span><CheckCircleOutlined className='-translate-y-1 text-green-600 text-xl' /></span> : <span><CloseCircleOutlined className='-translate-y-1 text-red-600 text-xl' /></span>}
                                </div>
                            })}
                        </div>
                    </div>
                    <Pagination defaultCurrent={1} total={lstAnswer.length} defaultPageSize={10} onChange={(page) => {
                        setCurrentPage(page)
                    }} />
                </div>
            </div>
            <div className='col-span-4 m-2 border-2 border-solid rounded-2xl overflow-hidden'>
                <div>
                    {contestingInfo?.lstQuestion.map((question: QuestionContestModel, questionIndex: number) => {
                        let bgColor: string
                        if (questionIndex % 2 === 0) {
                            bgColor = 'bg-slate-100'
                        } else {
                            bgColor = ''
                        }
                        if (questionIndex >= (currentPage - 1) * DEFAULT__PAGE__SIZE && questionIndex < currentPage * DEFAULT__PAGE__SIZE)
                            return <div id={`question-${questionIndex + 1}`} className={`p-4 m-0 ${bgColor} `} key={questionIndex} >
                                <p className=' mb-2 text-base font-semibold'>{`${questionIndex + 1}: ${question.question}`}</p>
                                <div className=' grid xl:grid-cols-2 grid-cols-1 gap-4'>
                                    {question.answer.map((answer: string, answerIndex: number) => {
                                        if (question.type === 'multi') {
                                            return <div key={answerIndex} className='answerSelectionBox'>
                                                <input className='answerSelection' name={`answer-${questionIndex}`} id={`answer-${questionIndex + 1}-${answerIndex}`} type='checkbox' onChange={(event) => {
                                                    if (event.target.checked === true) {
                                                        dispatch(setAnswer({
                                                            questionIndex,
                                                            answerIndex,
                                                            type: question.type,
                                                            checked: true
                                                        }))
                                                    } else {
                                                        dispatch(setAnswer({
                                                            questionIndex,
                                                            answerIndex,
                                                            type: question.type,
                                                            checked: false
                                                        }))
                                                    }
                                                }} />
                                                <label className='answerLabel' htmlFor={`answer-${questionIndex + 1}-${answerIndex}`}>{answer}</label>
                                            </div>
                                        } else {
                                            return <div key={answerIndex}  className='answerSelectionBox'>
                                                <input className='answerSelection' name={`answer-${questionIndex + 1}`} id={`answer-${questionIndex + 1}-${answerIndex}`} type='radio' onChange={(event) => {
                                                    dispatch(setAnswer({
                                                        questionIndex,
                                                        answerIndex,
                                                        type: question.type,
                                                        checked: true
                                                    }))
                                                }} />
                                                <label className='answerLabel' htmlFor={`answer-${questionIndex + 1}-${answerIndex}`}>{answer}</label>
                                            </div>
                                        }
                                    })}
                                </div>

                            </div>
                    })}
                </div>
            </div>
        </div>
    )
}