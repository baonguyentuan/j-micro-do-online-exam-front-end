import React, { useState } from 'react'
import { Button, Checkbox, Input, InputNumber, Popconfirm, Radio, Select, Table } from 'antd'
import { PlusCircleOutlined, DeleteOutlined, CheckOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { QuestionRowModel } from '../../_core/ExamModel';
import { useTranslation } from 'react-i18next';
const { TextArea } = Input
type Props = {
    questionList: QuestionRowModel[],
    setLstQuestion: Function,
    questionError: any,
    isNewQuestion: boolean,
    setIsNewQuestion: Function
}
let QuestionFormDefaultValue: QuestionRowModel = {
    id: Date.now(),
    question: '',
    type: 'single',
    answer: [],
    point: 1,
    correctAnswer: []
}
function CreateQuestion({ questionList, setLstQuestion, questionError, isNewQuestion, setIsNewQuestion }: Props) {
    let [tempQuestion, setTempQuestion] = useState<QuestionRowModel>(QuestionFormDefaultValue)
    let { t } = useTranslation("contest")
    let [editId, setEditId] = useState<number>(-1)
    let [disableAddQuestion, setDisableAddQuestion] = useState<boolean>(false)
    let locale = {
        emptyText: t('exam.No question')
    }
    const formik = useFormik({
        initialValues: QuestionFormDefaultValue,
        enableReinitialize: true,
        onSubmit: (formValue) => {
            console.log(formValue);
        },
        validationSchema: Yup.object({
            question: Yup.string().required(t('exam.Question is required')),
            point: Yup.number().typeError(t('exam.Point is number')).min(1, t('exam.minium point is 1')),
            correctAnswer: Yup.array().min(1, t('exam.You must choose correct answers')),
            answer: Yup.array().min(2, t('exam.Each question have at least 2 answers')).of(Yup.string().required(t('exam.Answer is required')))
        })
    })
    const renderErrorAnswer = () => {
        if (Array.isArray(formik.errors.answer)) {
            return t('exam.Answer is required')
        } else {
            return formik.errors.answer
        }
    }
    const onChangeAnswer = async (indexQuestion: number, currentIndex: number, event: any) => {
        if (indexQuestion !== -1) {
            let answerUpdate = [...formik.values.answer]
            answerUpdate[currentIndex] = event.target.value
            await formik.setFieldValue('answer', answerUpdate)
            let lstQuestionUpdate = JSON.parse(JSON.stringify(questionList))
            lstQuestionUpdate[indexQuestion].answer = answerUpdate
            await setLstQuestion(lstQuestionUpdate)
        }
    }
    const deleteAnswer = async (indexQuestion: number, currentIndex: number) => {
        if (indexQuestion !== -1) {
            let newAnswer = formik.values.answer.filter((answerDel, delIndex) => delIndex !== currentIndex)
            let newCorrectAnswer = [...formik.values.correctAnswer]
            formik.values.correctAnswer.map((correcrAnswerItem, correctAnswerIndex) => {
                if (correcrAnswerItem === currentIndex) {
                    newCorrectAnswer.splice(correctAnswerIndex, 1)
                } else if (correcrAnswerItem > currentIndex) {
                    newCorrectAnswer[correctAnswerIndex] = correcrAnswerItem - 1
                }
            })
            await formik.setFieldValue('answer', newAnswer)
            formik.setFieldValue('correctAnswer', newCorrectAnswer)
        }
    }
    const renderAnswer = (record: QuestionRowModel, status: boolean) => {
        let indexQuestion = questionList.findIndex(question => question.id === record.id)
        if (status === true) {
            if (record.type === 'single') {
                return <div>
                    <Radio.Group className='grid grid-cols-1 lg:grid-cols-2 gap-4 ' value={formik.values.correctAnswer.length > 0 ? formik.values.correctAnswer[0] : ''} onChange={(event) => {
                        formik.setFieldValue('correctAnswer', [event.target.value])
                    }}>
                        {formik.values.answer.map((answerItem, index) => {
                            return <div className='flex items-center' key={index}>
                                <Radio value={index} name='answerItemSelect' />
                                <TextArea
                                    size='large'
                                    onChange={(event) => {
                                        onChangeAnswer(indexQuestion, index, event)
                                    }}
                                    value={answerItem} />
                                <Button className='ml-2' onClick={() => {
                                    deleteAnswer(indexQuestion, index)
                                }}><DeleteOutlined style={{ transform: 'translateY(-2px)' }} /></Button>
                            </div>
                        })
                        }
                    </Radio.Group>
                    <Button
                        type='link'
                        className='text-xl '
                        onClick={() => {
                            let indexQuestion = questionList.findIndex(question => question.id === record.id)
                            if (indexQuestion !== -1) {
                                let lstAnswerUpdate = formik.values.answer
                                lstAnswerUpdate.push('')
                                formik.setFieldValue('answer', lstAnswerUpdate)
                            }
                        }}><PlusCircleOutlined className='-translate-y-2' /></Button>
                    <p className='mt-1 text-red-500'>{renderErrorAnswer()}</p>
                    <p className='mt-1 text-red-500'>{formik.errors.correctAnswer}</p>
                </div>
            } else if (record.type === 'multi') {
                return <div>
                    <Checkbox.Group className='grid grid-cols-1 lg:grid-cols-2 gap-4 ' value={formik.values.correctAnswer} onChange={(value) => {
                        formik.setFieldValue('correctAnswer', value)
                    }}>
                        {formik.values.answer.map((answerItem, index) => {
                            return <div className='flex items-center' key={index}>
                                <Checkbox value={index} name='answerItemSelect' />
                                <TextArea
                                    className='mx-2'
                                    key={index}
                                    size='large'
                                    onChange={(event) => {
                                        onChangeAnswer(indexQuestion, index, event)
                                    }}
                                    defaultValue={answerItem} />
                                <Button onClick={() => {
                                    deleteAnswer(indexQuestion, index)
                                }}><DeleteOutlined style={{ transform: 'translateY(-2px)' }} /></Button>
                            </div>
                        })
                        }
                    </Checkbox.Group>
                    <Button
                        type='link'
                        className='text-xl '
                        onClick={() => {
                            let indexQuestion = questionList.findIndex(question => question.id === record.id)
                            if (indexQuestion !== -1) {
                                let lstAnswerUpdate = formik.values.answer
                                lstAnswerUpdate.push('')
                                formik.setFieldValue('answer', lstAnswerUpdate)
                            }
                        }} ><PlusCircleOutlined className='-translate-y-2' /></Button>
                    <p className='mt-1 text-red-500'>{renderErrorAnswer()}</p>
                    <p className='mt-1 text-red-500'>{formik.errors.correctAnswer}</p>
                </div>
            }
        } else {
            return record.answer.map((answerItem, index) => {
                let checkCorrectAnswerIndex = record.correctAnswer.findIndex(ans => ans === index)
                if (checkCorrectAnswerIndex !== -1) {
                    return <p key={index} className='bg-green-200 overflow-hidden border-2 border-blue-300 '><span className=' inline-block px-4 py-2 bg-slate-300'>{`${index + 1}`}</span><span className='p-2'>{answerItem}
                    </span></p>
                } else {
                    return <p key={index} className='overflow-hidden border-2 border-blue-300'><span className=' inline-block px-4 py-2 bg-slate-300'>{`${index + 1}`}</span><span className='p-2'>
                        {answerItem}</span></p>
                }
            })
        }
    }
    const validateQuestionInput = () => {
        let validateStatus: boolean = true
        for (let error in formik.errors) {
            if (error) {
                validateStatus = false
                break;
            }
        }
        return validateStatus
    }
    const disableAction = (editId: number, recordId: number) => {
        if (editId === -1 || editId === recordId) {
            return false
        } else {
            return true
        }
    }
    const columns = [
        {
            title: t('exam.numerical order'),
            key: 'id',
            width: '5%',
            render: (text: string, record: QuestionRowModel, index: number) => (
                <p className={disableAction(editId, record.id) ? 'opacity-50' : ''}>{index + 1}</p>
            )
        },
        {
            title: t('exam.Question'),
            key: 'question',
            width: '87%',
            render: (text: string, record: QuestionRowModel, index: number) => {
                if (editId === record.id) {
                    return <div >
                        <TextArea
                            className='mb-4'
                            name='question'
                            rows={5}
                            placeholder='Input question'
                            defaultValue={formik.values.question}
                            onChange={(event) => {
                                formik.setFieldValue('question', event.target.value)
                            }} />
                        <p className='mt-1 text-red-500'>{formik.errors.question}</p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 items-center'>
                            <div className='flex items-center '>
                                <span className='mr-4'>Type: </span>
                                <Select
                                    style={{ width: 100 }}
                                    placeholder="Please select"
                                    value={formik.values.type}
                                    onChange={(value) => {
                                        formik.setFieldValue('type', value)
                                        let lstQuestionUpdate = JSON.parse(JSON.stringify(questionList))
                                        let indexQuestion = questionList.findIndex(question => question.id === record.id)
                                        if (indexQuestion !== -1) {
                                            lstQuestionUpdate[indexQuestion] = {
                                                ...lstQuestionUpdate[indexQuestion],
                                                type: value,
                                            }
                                            setLstQuestion(lstQuestionUpdate)
                                        }
                                    }
                                    }
                                    options={[{ label: 'Single', value: 'single' }, { label: 'Multiple', value: 'multi' }]}
                                />
                            </div>
                            <div className='flex items-center '>
                                <span className='mr-4'>Point: </span>
                                <InputNumber name='point' min={0} defaultValue={formik.values.point} onChange={(value) => {
                                    formik.setFieldValue('point', value)
                                }} />
                                <p className='mt-1 text-red-500'>{formik.errors.point}</p>
                            </div>
                        </div>
                        {renderAnswer(record, true)}
                    </div>
                } else {
                    return <div className={disableAction(editId, record.id) ? 'opacity-50' : ''}>
                        <p className='mb-4'>
                            <span>{record.question}</span>
                            <span className='font-semibold ml-4'>{`( Point: ${record.point} - ${record.type === 'single' ? 'Single choice' : 'Multiple choice'} )`}</span>
                        </p>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 '>
                            {renderAnswer(record, false)}
                        </div>
                    </div>
                }
            }
        },
        {
            title: t('exam.Action'),
            key: 'action',
            width: '8%',
            render: (text: string, record: QuestionRowModel, index: number) => {
                let indexQuestion = questionList.findIndex(question => question.id === record.id)
                if (editId === record.id) {
                    return <div className=''>
                        <Button
                            className='btn__action'
                            onClick={async () => {
                                validateQuestionInput()
                                let lstQuestionUpdate = JSON.parse(JSON.stringify(questionList))
                                if (indexQuestion !== -1) {
                                    lstQuestionUpdate[indexQuestion] = {
                                        ...lstQuestionUpdate[indexQuestion],
                                        question: formik.values.question,
                                        type: formik.values.type,
                                        answer: formik.values.answer,
                                        point: formik.values.point,
                                        correctAnswer: formik.values.correctAnswer
                                    }
                                    if (isNewQuestion) {
                                        await setIsNewQuestion(false)
                                    }
                                    await setLstQuestion(lstQuestionUpdate)
                                    await setEditId(-1)
                                    await setDisableAddQuestion(false)
                                }
                            }}
                            disabled={!validateQuestionInput()}
                        ><CheckOutlined /></Button>
                        <Button
                            className='btn__action'
                            onClick={async () => {
                                let lstQuestionUpdate = JSON.parse(JSON.stringify(questionList))
                                if (indexQuestion !== -1) {
                                    if (isNewQuestion) {
                                        lstQuestionUpdate.splice(indexQuestion, 1)
                                        await setIsNewQuestion(false)
                                    } else {
                                        lstQuestionUpdate[indexQuestion] = tempQuestion
                                    }
                                    await setEditId(-1)
                                    await setLstQuestion(lstQuestionUpdate)
                                    await setDisableAddQuestion(false)
                                }
                            }}><CloseCircleOutlined /></Button>
                    </div>
                } else {
                    return <div className=''>
                        <Button
                            className='btn__action'
                            disabled={disableAction(editId, record.id)}
                            onClick={async () => {
                                if (indexQuestion !== -1) {
                                    await formik.setFieldValue('type', questionList[indexQuestion].type)
                                    await formik.setFieldValue('point', questionList[indexQuestion].point)
                                    await formik.setFieldValue('question', questionList[indexQuestion].question)
                                    await formik.setFieldValue('answer', questionList[indexQuestion].answer)
                                    await formik.setFieldValue('correctAnswer', questionList[indexQuestion].correctAnswer)
                                    await setTempQuestion(questionList[indexQuestion])
                                    await setEditId(record.id)
                                }
                            }}><EditOutlined /></Button>
                        <Popconfirm
                            title="Delete the question"
                            description="Are you sure to delete this question?"
                            onConfirm={async () => {
                                if (indexQuestion !== -1) {
                                    let lstQuestionUpdate = JSON.parse(JSON.stringify(questionList))
                                    lstQuestionUpdate.splice(indexQuestion, 1)
                                    await setLstQuestion(lstQuestionUpdate)
                                }
                            }}
                            okType='danger'
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                className='btn__action'
                                disabled={disableAction(editId, record.id)}><DeleteOutlined /></Button>
                        </Popconfirm>

                    </div>
                }
            }
        },
    ];
    const renderErrorQuestion = (valueError: any) => {
        let errorsString
        if (valueError) {
            errorsString = valueError
            return <p className='mt-1 text-red-500'>{errorsString}</p>
        } else {
            errorsString = ''
            return null
        }
    }
    return (
        <Table
            rowKey={'id'}
            locale={locale}
            bordered={true}
            dataSource={questionList}
            columns={columns}
            pagination={false}
            footer={() => {
                return <div className='grid grid-cols-2 items-center'>
                    <div className='col-span-2 text-center'>
                        {renderErrorQuestion(questionError)}
                    </div>
                    <div >
                        <h1 className='font-bold'>Note:</h1>
                        <p>* Each exam have at least 10 question</p>
                        <p>* Each question have at least 2 answers</p>
                        <p>* You must choose correct answers</p>
                    </div>
                    <div>
                        <Button
                            onClick={async () => {
                                setIsNewQuestion(true)
                                setDisableAddQuestion(true)
                                let lstQuestionUpdate = [...questionList]
                                let newID = Date.now()
                                let newQuestion = {
                                    id: newID,
                                    question: '',
                                    type: 'single',
                                    answer: ['', ''],
                                    point: 1,
                                    correctAnswer: []
                                }
                                lstQuestionUpdate.push(newQuestion)
                                formik.setFieldValue('type', newQuestion.type)
                                formik.setFieldValue('point', newQuestion.point)
                                formik.setFieldValue('question', newQuestion.question)
                                formik.setFieldValue('answer', newQuestion.answer)
                                formik.setFieldValue('correctAnswer', newQuestion.correctAnswer)
                                await setLstQuestion(lstQuestionUpdate)
                                await setEditId(newID)
                            }}
                            disabled={disableAddQuestion}
                        >Add question</Button>

                    </div>

                </div>
            }} />
    )
}

export default CreateQuestion