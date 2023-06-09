import React, {useEffect, useState} from 'react'
import type {SelectProps} from 'antd';
import {Button, Col, Form, Input, InputNumber, Row, Select, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import CreateQuestion from '../../components/exams/private/CreateQuestion';
import {DispatchType, RootState} from '../../redux/configStore';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {getCategoryOptionApi} from '../../redux/reducers/category/categorySlice';
import {ExamDetailFormModel, QuestionExamSubmitModel, QuestionRowModel} from "../../_core/exam";
import {createExamApi} from "../../redux/reducers/exam";
import AppConfigs from "../../config/AppConfigs";


const {TextArea} = Input
type Props = {}

const CreateExam = (props: Props) => {
  const optionsCategory: SelectProps['options'] = [];
  let [isNewQuestion, setIsNewQuestion] = useState<boolean>(false)
  const {lstCategoryOption} = useSelector((state: RootState) => state.categorySlice)
  const {userInfo} = useSelector((state: RootState) => state.userSlice)
  const dispatch: DispatchType = useDispatch()
  let {t} = useTranslation("contest")
  useEffect(() => {
    dispatch(getCategoryOptionApi())
  }, [])
  lstCategoryOption.map((categoryItem, index) => {
    optionsCategory.push({
      label: categoryItem.name,
      value: categoryItem.id,
    });
  })
  let ExamDetailDefaultValue: ExamDetailFormModel = {
    title: '',
    categoryId: null,
    examType: userInfo?.roles?.find(roleItem => roleItem === "ADMIN") ? 'FREE' : 'PRIVATE',
    description: '',
    duration: AppConfigs.exam.MIN_DURATION_EXAM,
    question: [
      {
        "id": 1,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": ["access", "afford", "brochure", "casual"],
        "questionType": "SINGLE",
        "correctAnswers": [0],
        "questionPoint": 1
      },
      {
        "id": 2,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": [
          "behaviour",
          "determined",
          "counselor",
          "decisive"
        ],
        "questionType": "SINGLE",
        "correctAnswers": [0],
        "questionPoint": 1
      },
      {
        "id": 3,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": [
          "donate",
          "compare",
          "campaign",
          "flashy"
        ],
        "questionType": "MULTI",
        "correctAnswers": [0, 3],
        "questionPoint": 1
      },
      {
        "id": 4,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": ["access", "afford", "brochure", "casual"],
        "questionType": "SINGLE",
        "correctAnswers": [0],
        "questionPoint": 1
      },
      {
        "id": 5,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": [
          "behaviour",
          "determined",
          "counselor",
          "decisive"
        ],
        "questionType": "SINGLE",
        "correctAnswers": [0],
        "questionPoint": 1
      },
      {
        "id": 6,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": [
          "donate",
          "compare",
          "campaign",
          "flashy"
        ],
        "questionType": "MULTI",
        "correctAnswers": [0, 3],
        "questionPoint": 1
      },
      {
        "id": 7,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": ["access", "afford", "brochure", "casual"],
        "questionType": "SINGLE",
        "correctAnswers": [0],
        "questionPoint": 1
      },
      {
        "id": 8,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": [
          "behaviour",
          "determined",
          "counselor",
          "decisive"
        ],
        "questionType": "SINGLE",
        "correctAnswers": [0],
        "questionPoint": 1
      },
      {
        "id": 9,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": [
          "donate",
          "compare",
          "campaign",
          "flashy"
        ],
        "questionType": "MULTI",
        "correctAnswers": [0, 3],
        "questionPoint": 1
      },
      {
        "id": 10,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": ["access", "afford", "brochure", "casual"],
        "questionType": "SINGLE",
        "correctAnswers": [0],
        "questionPoint": 1
      },
      {
        "id": 11,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": [
          "behaviour",
          "determined",
          "counselor",
          "decisive"
        ],
        "questionType": "SINGLE",
        "correctAnswers": [0],
        "questionPoint": 1
      },
      {
        "id": 12,
        "question": "Choose the word which is stressed differently from the rest.",
        "answers": [
          "donate",
          "compare",
          "campaign",
          "flashy"
        ],
        "questionType": "MULTI",
        "correctAnswers": [0, 3],
        "questionPoint": 1
      },
    ],
    file: null
  }
  const formik = useFormik({
    initialValues: ExamDetailDefaultValue,
    onSubmit: (formValue) => {
      let formData = new FormData();
      if (formValue.file) {
        formData.append('file', formValue.file, formValue.file?.name)
      }
      formData.append('title', formValue.title)
      formData.append('duration ', JSON.stringify(formValue.duration))
      formData.append('categoryId', JSON.stringify(formValue.categoryId))
      formData.append('description', formValue.description)
      formData.append('examType', formValue.examType)
      let lstCreateQuestion: QuestionExamSubmitModel[] = []
      formValue.question.map((questionItem, index) => {
        lstCreateQuestion.push({
          questionType: questionItem.questionType.toUpperCase(),
          questionPoint: questionItem.questionPoint,
          question: questionItem.question,
          answers: questionItem.answers,
          correctAnswers: questionItem.correctAnswers
        })
      })
      formData.append('questions', JSON.stringify(lstCreateQuestion
      ))
      dispatch(createExamApi(formData))
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(t('detail.name is required')),
      description: Yup.string().required(t('detail.description is required')),
      categoryId: Yup.number().typeError(t('detail.category is required')).required(t('detail.category is required')),
      duration: Yup.number().typeError(t('detail.duration must be number')).required(t('detail.duration is required')).min(AppConfigs.exam.MIN_DURATION_EXAM, t('detail.minium duration is {{duration}} min', {duration: AppConfigs.exam.MIN_DURATION_EXAM})).max(AppConfigs.exam.MAX_DURATION_EXAM, t('detail.maxium duration is {{duration}} min', {duration: AppConfigs.exam.MAX_DURATION_EXAM})),
      question: Yup.array().min(AppConfigs.exam.MIN_QUESTION_EXAM, t('exam.Each exam have at least {{number}} question', {number: AppConfigs.exam.MIN_QUESTION_EXAM})).max(AppConfigs.exam.MAX_QUESTION_EXAM, t('exam.Each exam have at max {{number}} question', {number: AppConfigs.exam.MAX_QUESTION_EXAM})),
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

  return (
    <div className='size__component py-4' style={{minHeight: '70vh'}}>
      <h1 className='text-center font-bold text-2xl m-4'>{t('exam.Create exam')}</h1>
      <Form labelAlign='left' labelCol={{span: 4}} wrapperCol={{span: 20}}>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={16}>
            <Form.Item label={t('detail.name')} labelCol={{span: 4}} wrapperCol={{span: 20}}>
              <Input name='title' onChange={formik.handleChange} value={formik.values.title}/>
              <p className='mt-1 text-red-500'>{formik.errors.title}</p>
            </Form.Item>
            <Form.Item label={t('detail.description')} labelCol={{span: 4}} wrapperCol={{span: 22}}>
              <TextArea
                rows={5}
                name='description'
                onChange={formik.handleChange}
                value={formik.values.description}/>
              <p className='mt-1 text-red-500'>{formik.errors.description}</p>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={8}>
            <Form.Item label={t('detail.category')}>
              <Select
                style={{width: '100%'}}
                showSearch
                placeholder="Please select"
                value={formik.values.categoryId}
                filterOption={(input, option) => (String(option?.label) ?? '').toLowerCase().includes(input)}
                filterSort={(optionA, optionB) =>
                  (String(optionA?.label) ?? '').toLowerCase().localeCompare((String(optionB?.label) ?? '').toLowerCase())
                }
                onChange={(value) => {
                  formik.setFieldValue('categoryId', value)
                }}
                options={optionsCategory}
              />
              <p className='mt-1 text-red-500'>{formik.errors.categoryId}</p>
            </Form.Item>
            <Form.Item label={'Exam type'}>
              <Select
                style={{width: 100}}
                value={formik.values.examType}
                onChange={(value) => {
                  formik.setFieldValue('examType', value)
                }
                }
                options={userInfo?.roles?.find(roleItem => roleItem === "ADMIN") ? [{
                  label: 'FREE',
                  value: 'FREE'
                }, {label: 'PREMIUM', value: 'PREMIUM'}] : [{label: 'PRIVATE', value: 'PRIVATE'}]}
              />
            </Form.Item>
            <Form.Item label={t('detail.duration')}>
              <InputNumber
                style={{maxWidth: 150}}
                addonAfter={t('detail.minutes')}
                name='duration'
                min={AppConfigs.exam.MIN_DURATION_EXAM}
                value={formik.values.duration}
                onChange={(value) => {
                  formik.setFieldValue('duration', value)
                }}
              />
              <p className='mt-1 text-red-500'>{formik.errors.duration}</p>
            </Form.Item>
            <Form.Item label={t('detail.thumbnail')}>
              <Upload
                name='file'
                accept='image/img, image/jpg, image/png, image/jpeg, image/gif'
                beforeUpload={() => {
                  return false
                }}
                listType="picture"
                multiple={false}
                onPreview={(file) => {
                }}
                maxCount={1}
                onChange={(file) => {
                  formik.setFieldValue('file', file.file)
                  console.log(formik.values.file);
                }}>
                <Button icon={<UploadOutlined/>}>Choose Image</Button>
              </Upload>
              <p className='mt-1 text-red-500'>{formik.errors.file}</p>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{span: 24}}>
          <CreateQuestion
            questionList={formik.values.question}
            setLstQuestion={setLstQuestion}
            questionError={formik.errors.question}
            isNewQuestion={isNewQuestion}
            setIsNewQuestion={setIsNewQuestion}
          />
        </Form.Item>
        <Form.Item className='text-center' wrapperCol={{span: 24}}>
          <Button disabled={disbaleSubmit()} className='btn__contest' onClick={() => {
            formik.handleSubmit()
          }}>{t('exam.Send exam')}</Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default CreateExam