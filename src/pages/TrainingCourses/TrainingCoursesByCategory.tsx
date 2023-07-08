import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {DispatchType, RootState} from "../../redux/configStore";
import {useDispatch, useSelector} from "react-redux";
import {getExamDurationOptions, getExamOrderByOptions, getExamsApi} from "../../redux/reducers/examSlice/examSlice";
import CardContest from "../../components/Card/CardContest";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import {useTranslation} from "react-i18next";
import {InboxOutlined} from "@ant-design/icons";
import {Button, Checkbox, Input, Pagination, Radio, RadioChangeEvent, Typography} from 'antd';
import type {CheckboxValueType} from 'antd/es/checkbox/Group';
import styled from "styled-components";
import Constants from "../../constants/Constants";
import AppRoutes from "../../constants/AppRoutes";
const {Title} = Typography;

function TrainingCoursesByCategory() {
    let {category} = useParams();
    const {t} = useTranslation('card')
    const dispatch: DispatchType = useDispatch()
    const [searchExams, setSearchExams] = useState({
        name: Constants.EmptyString,
        category_ids: category || Constants.EmptyString,
        durations: Constants.EmptyString,
        from_date: Constants.EmptyString,
        to_date: Constants.EmptyString,
        page_index: 1,
        page_size: 10,
        order_by: -1
    })
    const {
        examsByCategory,
        examDurationOptions,
        examOrderByOptions
    } = useSelector((state: RootState) => state.examSlice)
    const items = [
        {name: t('nav.home'), link: AppRoutes.public.home},
        {name: t('nav.training_course'), link: AppRoutes.public.courses},
        {name: category},
    ];

    useEffect(() => {
        dispatch(getExamsApi(searchExams))
    }, [category, searchExams])

    useEffect(() => {
        dispatch(getExamDurationOptions())
        dispatch(getExamOrderByOptions())
    }, [])

    const handlePaginationChange = (page: any) => {
        setSearchExams({...searchExams, page_index: page})
    }
    const handleOnChangeDuration = (checkedValues: CheckboxValueType[]) => {
        setSearchExams({...searchExams, durations: checkedValues.toString()})
    }
    const handleOnChangeOrderBy = (e: RadioChangeEvent) => {
        setSearchExams({...searchExams, order_by: e.target.value})
    }
    const handleSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchExams({...searchExams, name: e.target.value});
    }
    const onClearSearchByName = () => {
        setSearchExams({...searchExams, name: Constants.EmptyString});
    }

    return (<>
            <TrainingCoursesByCategoryWrapper className='size__component mb-16'>
                <Breadcrumb items={items}/>
                {
                    examsByCategory !== undefined ?
                        (
                            <div className='mt-10'>
                                {/* SEARCH AREA*/}
                                <div className='search_area border-dashed border-2 border-indigo-200 rounded-sm p-5'>
                                    <div className='flex flex-wrap xl:flex-nowrap justify-between gap-5 mb-5'>
                                        <div>
                                            <Title level={4} className='mb-2'>Select duration times</Title>
                                            <Checkbox.Group className='font-medium' options={examDurationOptions}
                                                            defaultValue={['Apple']} onChange={handleOnChangeDuration}/>
                                        </div>
                                        <div>
                                            <Title level={4} className='mb-2'>Order by</Title>
                                            <Radio.Group className='font-medium' onChange={handleOnChangeOrderBy}
                                                         value={searchExams.order_by}>
                                                <Radio value={-1}>None</Radio>
                                                {
                                                    // eslint-disable-next-line array-callback-return
                                                    examOrderByOptions !== undefined ? examOrderByOptions?.map(function (item, index: number) {
                                                        for (const [key, value] of Object.entries(item)) {
                                                            return <Radio key={index} value={key}>
                                                                {value}
                                                            </Radio>
                                                        }
                                                    }) : Constants.EmptyString
                                                }

                                            </Radio.Group>
                                        </div>
                                    </div>
                                    <div className='relative'>
                                        <Input size="large" onChange={handleSearchByName} name="name"
                                               placeholder="Search by exam name..."/>
                                        <Button onClick={onClearSearchByName} className='absolute right-0.5 font-bold'
                                                type="text" size={"large"}>Clear</Button>

                                    </div>
                                </div>
                                {/* DATA EXAM AREA */}
                                <div
                                    className='grid sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-10'>
                                    {
                                        examsByCategory.data?.map((item, index) => {
                                            return <CardContest key={index} examCard={item}/>
                                        })
                                    }
                                </div>
                                {
                                    examsByCategory.pagination.pages > 2 && (<Pagination className='mt-10 text-center'
                                                                                         onChange={handlePaginationChange}
                                                                                         defaultCurrent={examsByCategory?.pagination.index}
                                                                                         defaultPageSize={10}
                                                                                         total={examsByCategory?.pagination.totals}/>)
                                }
                            </div>
                        )
                        : <div className='flex flex-col items-center justify-center w-full mt-5 py-8'>
                            <InboxOutlined className='text-5xl'/>
                            <h3 className='text-2xl'>Not found data</h3>
                        </div>
                }
            </TrainingCoursesByCategoryWrapper>
        </>
    );
}

const TrainingCoursesByCategoryWrapper = styled.div`
  .search_area {
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  .ant-checkbox-wrapper, .ant-radio-wrapper {
    font-size: 16px;
  }

  .ant-checkbox-wrapper span:nth-of-type(2) {
    position: relative;
    bottom: 3px;
  }
`

export default TrainingCoursesByCategory;