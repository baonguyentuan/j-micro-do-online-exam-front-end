import { Space, Table } from 'antd';
import React from 'react'

type Props = {}

function ListExamAdmin({ }: Props) {
    const columns = [
        {
            title: 'Numeric order',
            dataIndex: 'numericOrder',
            key: 'numericOrder',
            width: '5%',
            render: (text: string, record: any, index: number) => <a>{index + 1}</a>,
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: '5%',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '35%',
            render: (text: string) => <a>{text}</a>,
        },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '15%',
    },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: '10%',
        },
        {
            title: 'Duration (min)',
            dataIndex: 'duration',
            key: 'duration',
            width: '5%',
        },
        {
            title: 'Time start',
            dataIndex: 'timeStart',
            key: 'timeStart',
            width: '10%',
        },
        {
            title: 'Quantity of Question',
            dataIndex: 'address',
            key: 'address',
            width: '5%',
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

    const data: any = [];
    return (
        <div>
            <Table rowKey={'id'} columns={columns} dataSource={data} />
        </div>
    )
}

export default ListExamAdmin