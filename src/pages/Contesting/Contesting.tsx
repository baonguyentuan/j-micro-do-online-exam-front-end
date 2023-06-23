import React, { useState } from 'react'
import { Button, Statistic } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import arrQuestion from './dethi.json'
import { ContestResultModel } from '../../_core/ContestModel';
const { Countdown } = Statistic;
type Props = {}
let lstAnswerSelected: ContestResultModel[] = []
arrQuestion.map((question, questionIndex) => {
    lstAnswerSelected.push({
        questionIndex,
        answerSelected: []
    })
})
export default function Contesting({ }: Props) {
    let [lstResult, setLstResult] = useState(lstAnswerSelected)
    return (
        <div className='size__component grid grid-cols-6 gap-4 py-8'>
            <div className='col-span-2 ' >
                <div className='sticky right-0 top-0'>
                    <div className='px-2 m-2 border-2 border-solid rounded-2xl ' >
                        <h1 className='font-bold text-center text-2xl'>Exam name</h1>
                        <h1 className='font-bold text-center text-2xl'>07/06/2023</h1>
                        <p><span>Organize by: </span><span>tsukuyomi</span></p>
                        <p><span >Upload by: </span><span>tsukuyomi</span></p>
                        <p><span>Category: </span><span>English</span></p>
                        <p><span>Duration: </span><span>120min</span></p>
                        <p><span>Start at: </span><span>16h30</span></p>
                        <p><span>End at: </span><span>18h30</span></p>
                        <Countdown
                            title={<p>Time remain:</p>}
                            value={Date.now() + Date.parse('23 Jun 2023 23:45:00 GMT+7') - Date.now()}
                            valueStyle={{ fontSize: 30 }}
                            format="HH:mm:ss" 
                            onFinish={()=>{

                            }}
                            />
                        <Button className='btn__contest' onClick={() => {
                            // console.log(lstResult);
                            console.log('end', Date.parse('07 Jun 2023 21:06:00 GMT'));
                            console.log('start', Date.parse('07 Jun 2023 21:05:00 GMT'));
                            console.log('now', Date.now());
                        }}>Finish</Button>
                    </div>
                    <div className='px-2 m-2 border-2 border-solid rounded-2xl'>
                        <h1 className='font-bold text-center text-2xl my-2'> Manager Answer</h1>
                        <div className='mb-2'>
                            <p><span><CheckCircleOutlined className='-translate-y-1 text-green-600 text-xl' /></span>: <span>Question answered</span></p>
                            <p><span><CloseCircleOutlined className='-translate-y-1 text-red-600 text-xl' /></span>: <span>Question unanswered</span></p>
                        </div>
                        <div className='grid xl:grid-cols-4 grid-cols-3 gap-2 pb-2'>
                            {lstResult.map((result, resultIndex) => {
                                return <div onClick={() => {
                                    let topScroll = document.getElementById(`question-${resultIndex + 1}`)?.offsetTop
                                    if (topScroll) {
                                        document.body.scrollTo({
                                            top: topScroll,
                                            behavior: 'smooth'
                                        });
                                        document.documentElement.scrollTo({
                                            top: topScroll,
                                            behavior: 'smooth'
                                        });
                                    }
                                }} key={`question-${resultIndex}`} className='flex justify-between items-center border-2 border-solid rounded-sm p-2 hover:bg-slate-100 cursor-pointer'>
                                    <span className='text-center'>{resultIndex + 1}</span>
                                    {result.answerSelected.length > 0 ? <span><CheckCircleOutlined className='-translate-y-1 text-green-600 text-xl' /></span> : <span><CloseCircleOutlined className='-translate-y-1 text-red-600 text-xl' /></span>}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-4 m-2 border-2 border-solid rounded-2xl overflow-hidden'>
                <div>
                    {arrQuestion.map((question, questionIndex) => {
                        let bgColor: string
                        if (questionIndex % 2 === 0) {
                            bgColor = 'bg-slate-100'
                        } else {
                            bgColor = ''
                        }
                        return <div id={`question-${questionIndex + 1}`} className={`p-4 m-0 ${bgColor} `} key={questionIndex} >
                            <p className=' mb-2 text-base font-semibold'>{`Question ${questionIndex + 1}: ${question.question}`}</p>
                            <div className=' grid xl:grid-cols-2 grid-cols-1 gap-4'>
                                {question.answer.map((answer, answerIndex) => {
                                    if (question.type === 'multi') {
                                        return <div key={answerIndex} className='answerSelectionBox'>
                                            <input className='answerSelection' name={`answer-${questionIndex}`} id={`answer-${questionIndex + 1}-${answerIndex}`} type='checkbox' onChange={(event) => {
                                                let newLstResult = [...lstResult]
                                                if (event.target.checked === true) {
                                                    newLstResult[questionIndex].answerSelected.push(answerIndex)
                                                    setLstResult(newLstResult)
                                                } else {
                                                    let findResultIndex = lstResult[questionIndex].answerSelected.findIndex(result => result === answerIndex)
                                                    if (findResultIndex !== -1) {
                                                        newLstResult[questionIndex].answerSelected.splice(findResultIndex, 1)
                                                        setLstResult(newLstResult)
                                                    }
                                                }
                                            }} />
                                            <label className='answerLabel' htmlFor={`answer-${questionIndex + 1}-${answerIndex}`}>{answer}</label>
                                        </div>
                                    } else {
                                        return <div className='answerSelectionBox'>
                                            <input className='answerSelection' name={`answer-${questionIndex + 1}`} id={`answer-${questionIndex + 1}-${answerIndex}`} type='radio' onChange={(event) => {
                                                if (lstResult[questionIndex].answerSelected.length > 0) {
                                                    let newLstResult = [...lstResult]
                                                    newLstResult[questionIndex].answerSelected.push(answerIndex)
                                                    setLstResult(newLstResult)
                                                } else {
                                                    let newLstResult = [...lstResult]
                                                    newLstResult[questionIndex].answerSelected[0] = answerIndex
                                                    setLstResult(newLstResult)
                                                }
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