import React from 'react'
import {Card, Rate} from 'antd';

type Props = {
    feedback: {
        id: number,
        userID: number,
        img: any,
        feedback: string,
        rate: number
    }
}
export default function CardFeedback({feedback}: Props) {
    return (
        <Card
            className='card__border__gradient pb-4'
            size="small"
            title={<div className='m-4 text-xl whitespace-normal flex items-center'
                        style={{height: 120, color: '#584dc4'}}>
                <p>{feedback.feedback}</p>
            </div>}
        >
            <div className='grid grid-cols-2 gap-2 w-4/5 m-auto text-lg'>
                <div className='flex items-center'>
                    <img style={{height: '90px', width: '90px', borderRadius: '50%'}} src={feedback.img}/>
                </div>
                <Rate className='flex items-center' disabled defaultValue={feedback.rate}/>
            </div>
        </Card>
    )
}

