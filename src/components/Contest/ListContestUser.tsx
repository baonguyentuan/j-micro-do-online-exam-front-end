import { Space, Table } from 'antd'
import React from 'react'

type Props = {}

const ListContestUser = (props: Props) => {
    const columns = [
        {
            title: 'Numeric order',
            dataIndex: 'numericOrder',
            key: 'numericOrder',
            width: '5%',
            render: (text: string, record: any, index: number) => <a>{index + 1}</a>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '60%',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Duration (min)',
            dataIndex: 'duration',
            key: 'duration',
            width: '15%',
        },
        {
            title: 'Time start',
            dataIndex: 'timeStart',
            key: 'timeStart',
            width: '10%',
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: () => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data:any = [];
  return (
    <div>
    <Table rowKey={'id'} columns={columns} dataSource={data} />
</div>
  )
}

export default ListContestUser