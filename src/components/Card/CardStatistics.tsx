import React from 'react'
import {Card} from 'antd';
import CountUp from 'react-countup'
import '../../assets/css/card/card.css'
import {useTranslation} from 'react-i18next';

type Props = {
    statistics: {
        id: number,
        icon: JSX.Element,
        stats: number,
        desc: string
    }
}
const CardStatistics = (props: Props) => {
    const {t} = useTranslation('card')
    return (
        <Card
            className='card__border__gradient py-4'
            size="small"
            title={<div className='flex justify-center items-center' style={{height: 100}}>
                <div className='icon__box mb-2'>
                    {props.statistics.icon}
                </div>
            </div>}
        >
            <div className='text-center m-auto' style={{height: 100}}>
                <p className='pb-2 text-3xl font-bold cursor-text'><CountUp end={props.statistics.stats}/>+</p>
                <p className='pb-2 text-xl text-orange-400 italic cursor-text'>{props.statistics.desc}</p>
            </div>
        </Card>
    )
}
export default CardStatistics