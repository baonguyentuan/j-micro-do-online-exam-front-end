import React from 'react'
import { Card } from 'antd';
import CountUp from 'react-countup'
import '../../assets/css/card/card.css'
import { useTranslation } from 'react-i18next';
type Props = {
    statistics:{
        id:number,
        icon:JSX.Element,
        stats:number,
        desc:string
    }
}
const CardStatistics = (props: Props) => {
    const {t}=useTranslation('card')
    return (
        <Card
            className='card__border__gradient pb-4'
            size="small"
            title={<div className='flex justify-center items-center' style={{ height: 100 }}>
                <div className='icon__box'>
                    {props.statistics.icon}
                </div>
            </div>}
        >
            <div className='w-4/5 text-center m-auto' style={{ height: 100 }}>
                <p className='pb-2 text-2xl font-bold cursor-text'><CountUp end={props.statistics.stats} />+</p>
                <p className='pb-2 text-xl font-bold text-gray-400 cursor-text'>{props.statistics.desc}</p>
            </div>
        </Card>
    )
}
export default CardStatistics