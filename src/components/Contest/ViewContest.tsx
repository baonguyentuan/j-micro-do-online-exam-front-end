import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import dayjs, { Dayjs } from "dayjs";
import Constants from '../../constants/Constants';
type Props = {}

const ViewContest = (props: Props) => {
    const { contestInfoDetail } = useSelector((state: RootState) => state.contestSlice)
    return (
        <div className='mx-4 mb-4'>
            <h1 className='text-2xl font-bold'>Contest infomation</h1>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <p className='text-base my-4'><span className=' prop__title '>Name</span>: <span>{contestInfoDetail.name}</span></p>
                    <p className='text-base my-4'><span className=' prop__title '>Exam</span>: <span>{contestInfoDetail.examName}</span></p>
                    <p className='text-base my-4'><span className=' prop__title '>Owner</span>: <span>{contestInfoDetail.ownerName}</span></p>
                    <p className='text-base my-4'><span className=' prop__title '>Start</span>: <span>{dayjs(contestInfoDetail.startAt).format(Constants.formatFullDate)}</span></p>
                    <p className='text-base my-4'><span className=' prop__title '>End</span>: <span>{dayjs(contestInfoDetail.endAt).format(Constants.formatFullDate)}</span></p>
                </div>
                <div className='border-2 border-dotted rounded px-4 py-2'>
                    <p className=' prop__title '>Description</p>
                    <p>{contestInfoDetail.description}</p>
                </div>
            </div>

            <div className='text-base my-4'>
                <p className=' prop__title '>Participants</p><span>:</span>
                <div className='m-4'>
                    <div className='grid grid-cols-6 gap-2 border-b-2 py-2  bg-blue-800 text-white'>
                        <p className='col-span-1 px-2 font-semibold'>Numeric order</p>
                        <p className='col-span-2 px-2 font-semibold'>Username</p>
                        <p className='col-span-3 px-2 font-semibold'>Email</p>
                    </div>
                    {contestInfoDetail.participants.map((current, index) => {
                        return <div className='grid grid-cols-6 border-b-2 py-2'>
                            <p className='col-span-1 px-2'>{index + 1}</p>
                            <p className='col-span-2 px-2'>{current.username}</p>
                            <p className='col-span-3 px-2'>{current.email}</p>
                        </div>
                    })}
                </div>
            </div>

        </div>
    )
}

export default ViewContest