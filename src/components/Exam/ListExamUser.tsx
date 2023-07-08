import { Button, Popconfirm, Space, Table } from 'antd';
import React, { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { deleteExamApi, getExamOptionApi } from '../../redux/reducers/exam/examSlice';
import { useSelector } from 'react-redux';
import { ExamOptionModel } from '../../_core/ExamModel';
import { useNavigate } from 'react-router-dom';
type Props = {}

const ListExamUser = (props: Props) => {
    let { lstOptionExam } = useSelector((state: RootState) => state.examSlice)
    let navigate = useNavigate()
    let dispatch: DispatchType = useDispatch()
    const columns = [
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
                        onConfirm={() => {
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
            <div>
                <div className='my-4 flex justify-between items-center'>
                    <Button onClick={async () => {
                        navigate('/create_exam')
                    }}>Create Exam</Button>
                    <p className='mx-4 font-bold text-blue-600 text-base'><span>Total: </span><span>{lstOptionExam.length}</span></p>
                </div>
            </div>
            <Table rowKey={'id'} columns={columns} dataSource={lstOptionExam} />
        </div>
    )
}

export default ListExamUser