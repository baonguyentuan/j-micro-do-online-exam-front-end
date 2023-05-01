import React from 'react'
import { Card } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import '../../assets/css/card/card.css'
type Props = {
    skills:{
        id:number,
        img:string,
        tiltle:string
        skills:string[]
    }
}
const CardSkills = (props: Props) => {
    return (
        <Card
            className='card__border__gradient pb-4'
            style={{height:450}}
            size="small"
            title={<div className='m-4' style={{height:200,backgroundImage:`url('${props.skills.img}')`,backgroundRepeat:'none',backgroundPosition:'center 0',backgroundSize:'cover'}}>
            </div>}
        >
            <p className='pb-2 text-xl font-bold' style={{height:60}}>{props.skills.tiltle}</p>
            <div className='grid grid-cols-2 gap-2 text-base'>
                {props.skills.skills.map((skillItem,index)=>{
                    return <p key={index} className='flex items-center mb-2 mr-2 p py-1 font-semibold bg-blue-200 rounded-lg'><AimOutlined className=' text-lg ml-2' style={{ transform: 'translate(0,-3px)' }} /> <span className='ml-2'>{skillItem}</span></p>
                })}
            </div>
        </Card>
    )
}
export default CardSkills