import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { deleteExamApi, getExamOptionApi } from '../../redux/reducers/exam/examSlice';
import { useSelector } from 'react-redux';
import { ExamOptionModel } from '../../_core/ExamModel';
type Props = {}

const ListExamUser = (props: Props) => {
    let { lstOptionExam } = useSelector((state: RootState) => state.examSlice)
    let dispatch: DispatchType = useDispatch()
    const columns = [
        {
            title: 'Numeric order',
            dataIndex: 'numericOrder',
            key: 'numericOrder',
            width: '5%',
            render: (text: string, record: ExamOptionModel, index: number) => <p>{index + 1}</p>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '85%',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text: string, record: ExamOptionModel, index: number) => (
                <Space size="middle">
                    <Button>Edit</Button>
                    <Popconfirm
                        placement="topRight"
                        title={"Are you sure to delete this exam"}
                        onConfirm={()=>{
                            dispatch(deleteExamApi(record.id))
                        }}
                        okType='danger'
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        dispatch(getExamOptionApi())
    }, [])
    return (
        <div>
            <Table rowKey={'id'} columns={columns} dataSource={lstOptionExam} />
        </div>
    )
}

export default ListExamUser