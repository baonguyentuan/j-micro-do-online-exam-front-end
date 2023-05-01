import React from 'react'
import { Card, Avatar,Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';

type Props = {
    feedback:{
        id:number,
        userID:number,
        feedback:string,
        rate:number
    }
}
export default function CardFeedback({feedback }: Props) {
    return (
        <Card
            className='card__border__gradient pb-4'
            size="small"
            title={<div className='m-4 text-xl whitespace-normal flex items-center' style={{ height: 150, color:'#584dc4' }}>
                <p>{feedback.feedback}</p>
            </div>}
        >
            <div className='grid grid-cols-2 gap-2 w-4/5 m-auto text-lg'>
                <div className='flex items-center'>
                    <Avatar shape="square" size="large" icon={<UserOutlined />} />
                    <p className='ml-2 '>{feedback.userID}</p>
                </div>
                <Rate className='flex items-center' disabled defaultValue={feedback.rate}/>
            </div>
        </Card>
    )
}

