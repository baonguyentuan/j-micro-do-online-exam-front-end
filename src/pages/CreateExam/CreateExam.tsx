import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, InputNumber, Row, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ExamDetailFormModel, QuestionRowModel } from '../../_core/ExamModel';
import CreateQuestion from '../../components/Contest/CreateQuestion';
import { MAX_DURATION_EXAM, MAX_QUESTION_EXAM, MIN_DURATION_EXAM, MIN_QUESTION_EXAM } from '../../utils/config';
import { DispatchType } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { createExamApi } from '../../redux/reducers/examSlice/examSlice';
import { useTranslation } from 'react-i18next';
import { getEndpointOptionApi } from '../../redux/reducers/endpoint/endpointSlice';
import { getCategoryOptionApi } from '../../redux/reducers/category/categorySlice';
const { TextArea } = Input
type Props = {}
let ExamDetailDefaultValue: ExamDetailFormModel = {
    name: '',
    category: [],
    description: '',
    duration: MIN_DURATION_EXAM,
    question: [
        {
            "id": 1,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": ["access", "afford", "brochure", "casual"],
            "type": "single",
            "correctAnswer": [0],
            "point": 1
        },
        {
            "id": 2,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": [
                "behaviour",
                "determined",
                "counselor",
                "decisive"
            ],
            "type": "single",
            "correctAnswer": [0],
            "point": 1
        },
        {
            "id": 3,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": [
                "donate",
                "compare",
                "campaign",
                "flashy"
            ],
            "type": "multi",
            "correctAnswer": [0, 3],
            "point": 1
        },
        {
            "id": 4,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": ["access", "afford", "brochure", "casual"],
            "type": "single",
            "correctAnswer": [0],
            "point": 1
        },
        {
            "id": 5,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": [
                "behaviour",
                "determined",
                "counselor",
                "decisive"
            ],
            "type": "single",
            "correctAnswer": [0],
            "point": 1
        },
        {
            "id": 6,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": [
                "donate",
                "compare",
                "campaign",
                "flashy"
            ],
            "type": "multi",
            "correctAnswer": [0, 3],
            "point": 1
        },
        {
            "id": 7,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": ["access", "afford", "brochure", "casual"],
            "type": "single",
            "correctAnswer": [0],
            "point": 1
        },
        {
            "id": 8,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": [
                "behaviour",
                "determined",
                "counselor",
                "decisive"
            ],
            "type": "single",
            "correctAnswer": [0],
            "point": 1
        },
        {
            "id": 9,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": [
                "donate",
                "compare",
                "campaign",
                "flashy"
            ],
            "type": "multi",
            "correctAnswer": [0, 3],
            "point": 1
        },
        {
            "id": 10,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": ["access", "afford", "brochure", "casual"],
            "type": "single",
            "correctAnswer": [0],
            "point": 1
        },
        {
            "id": 11,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": [
                "behaviour",
                "determined",
                "counselor",
                "decisive"
            ],
            "type": "single",
            "correctAnswer": [0],
            "point": 1
        },
        {
            "id": 12,
            "question": "Choose the word which is stressed differently from the rest.",
            "answer": [
                "donate",
                "compare",
                "campaign",
                "flashy"
            ],
            "type": "multi",
            "correctAnswer": [0, 3],
            "point": 1
        },
    ],
    file: null
}
const options: SelectProps['options'] = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
};
const CreateExam = (props: Props) => {
    let [isNewQuestion, setIsNewQuestion] = useState<boolean>(false)
    const dispatch: DispatchType = useDispatch()
    let { t } = useTranslation("contest")
    const formik = useFormik({
        initialValues: ExamDetailDefaultValue,
        onSubmit: (formValue) => {
            // let formData = new FormData();
            // for (let key in formValue) {

            //     if (key === 'file') {
            //         if (formValue.file) {
            //             formData.append('File', formValue.file, formValue.file?.name)
            //         }
            //     } else {
            //         formData.append(key, formValue[key])
            //     }
            // }
            dispatch(createExamApi(formValue))
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('detail.name is required')),
            description: Yup.string().required(t('detail.description is required')),
            category: Yup.array().required(t('detail.category is required')).min(1, t('detail.category is required')),
            duration: Yup.number().typeError(t('detail.duration must be number')).required(t('detail.duration is required')).min(MIN_DURATION_EXAM, t('detail.minium duration is {{duration}} min', { duration: MIN_DURATION_EXAM })).max(MAX_DURATION_EXAM, t('detail.maxium duration is {{duration}} min', { duration: MAX_DURATION_EXAM })),
            question: Yup.array().min(MIN_QUESTION_EXAM, t('exam.Each exam have at least {{number}} question', { number: MIN_QUESTION_EXAM })).max(MAX_QUESTION_EXAM, t('exam.Each exam have at max {{number}} question', { number: MAX_QUESTION_EXAM })),
            file: Yup.mixed().required(t('detail.file is required')),
        })
    })
    const setLstQuestion = (value: QuestionRowModel[]) => {
        return formik.setFieldValue('question', value)
    }
    const disbaleSubmit = () => {
        let status: boolean = false
        if (isNewQuestion) {
            return true
        }
        for (let error in formik.errors) {
            if (error) {
                status = true;
                break;
            }
        }
        return status
    }
    useEffect(() => {
        // dispatch(getCategoryOptionApi())
    }, [])
    return (
        <div className='size__component py-4' style={{ minHeight: '70vh' }}>
            <h1 className='text-center font-bold text-2xl m-4'>{t('exam.Create exam')}</h1>
            <Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={16}>
                        <Form.Item label={t('detail.name')} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                            <Input name='name' onChange={formik.handleChange} value={formik.values.name} />
                            <p className='mt-1 text-red-500'>{formik.errors.name}</p>
                        </Form.Item>
                        <Form.Item label={t('detail.description')} labelCol={{ span: 4 }} wrapperCol={{ span: 22 }}>
                            <TextArea
                                rows={5}
                                name='description'
                                onChange={formik.handleChange}
                                value={formik.values.description} />
                            <p className='mt-1 text-red-500'>{formik.errors.description}</p>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={8}>
                        <Form.Item label={t('detail.category')} >
                            <Select
                                style={{ width: '100%' }}
                                mode='multiple'
                                allowClear
                                showSearch
                                placeholder="Please select"
                                value={formik.values.category}
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={(value) => {
                                    formik.setFieldValue('category', value)
                                }}
                                options={[
                                    {
                                        value: '1',
                                        label: 'Not Identified',
                                    },
                                    {
                                        value: '2',
                                        label: 'Closed',
                                    },
                                    {
                                        value: '3',
                                        label: 'Communicated',
                                    },
                                    {
                                        value: '4',
                                        label: 'Identified',
                                    },
                                    {
                                        value: '5',
                                        label: 'Resolved',
                                    },
                                    {
                                        value: '6',
                                        label: 'Cancelled',
                                    },
                                ]}
                            />
                            <p className='mt-1 text-red-500'>{formik.errors.category}</p>
                        </Form.Item>
                        <Form.Item label={t('detail.duration')}>
                            <InputNumber
                                style={{ maxWidth: 150 }}
                                addonAfter={t('detail.minutes')}
                                name='duration'
                                min={MIN_DURATION_EXAM}
                                value={formik.values.duration}
                                onChange={(value) => {
                                    formik.setFieldValue('duration', value)
                                }}
                            />
                            <p className='mt-1 text-red-500'>{formik.errors.duration}</p>
                        </Form.Item>
                        <Form.Item label={t('detail.thumbnail')}>
                            <Upload name='file'
                                accept='.png,.jpg,.jpeg,.gif'
                                multiple={false}
                                maxCount={1}
                                onChange={(file) => {
                                    formik.setFieldValue('file', file.file)
                                }}
                                onRemove={(file) => {
                                    formik.setFieldValue('file', null)
                                }} >
                                <Button icon={<UploadOutlined className='-translate-y-1' />}>{t('detail.click to Upload thumbnail')}</Button>
                            </Upload>
                            <p className='mt-1 text-red-500'>{formik.errors.file}</p>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ span: 24 }}>
                    <CreateQuestion
                        questionList={formik.values.question}
                        setLstQuestion={setLstQuestion}
                        questionError={formik.errors.question}
                        isNewQuestion={isNewQuestion}
                        setIsNewQuestion={setIsNewQuestion}
                    />
                </Form.Item>
                <Form.Item className='text-center' wrapperCol={{ span: 24 }}>
                    <Button disabled={disbaleSubmit()} className='btn__contest' onClick={() => {
                        formik.handleSubmit()
                    }}>{t('exam.Send exam')}</Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default CreateExam