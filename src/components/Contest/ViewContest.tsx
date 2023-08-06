import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import dayjs, { Dayjs } from "dayjs";
import Constants from '../../constants/Constants';
import { useTranslation } from 'react-i18next';
type Props = {}

const ViewContest = (props: Props) => {
    const { contestInfoDetail } = useSelector((state: RootState) => state.contestSlice)
    let { t } = useTranslation("contest");
    return (
        <div className='mx-4 mb-4'>
            <h1 className='text-2xl font-bold'>Contest infomation</h1>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <p className='text-base my-4 grid grid-cols-4'><span className=' font-bold col-span-1'>{t('detail.Contest name')}</span><span className='col-span-3'>: {contestInfoDetail.name}</span></p>
                    <p className='text-base my-4 grid grid-cols-4'><span className=' font-bold col-span-1'>{t('detail.Exam name')}</span><span className='col-span-3'>: {contestInfoDetail.examName}</span></p>
                    <p className='text-base my-4 grid grid-cols-4'><span className=' font-bold col-span-1'>{t('detail.Owner')}</span><span className='col-span-3'>: {contestInfoDetail.ownerName}</span></p>
                    <p className='text-base my-4 grid grid-cols-4'><span className=' font-bold col-span-1'>{t('detail.start at')}</span><span className='col-span-3'>: {dayjs(contestInfoDetail.startAt).format(Constants.formatFullDate)}</span></p>
                    <p className='text-base my-4 grid grid-cols-4'><span className=' font-bold col-span-1'>{t('detail.end at')}</span><span className='col-span-3'>: {dayjs(contestInfoDetail.endAt).format(Constants.formatFullDate)}</span></p>
                </div>
                <div className='border-2 border-dotted rounded px-4 py-2'>
                    <p className=' font-bold'>{t('detail.description')} :</p>
                    <p>{contestInfoDetail.description}</p>
                </div>
            </div>

            <div className='text-base my-4'>
                <p className=' text-base font-bold'>{t('detail.Participants')} :</p>
                <div className='m-4'>
                    <div className='grid grid-cols-6 gap-2 border-b-2 py-2  bg-blue-800 text-white'>
                        <p className='col-span-1 px-2 font-semibold'>{t('detail.Numeric order')}</p>
                        <p className='col-span-2 px-2 font-semibold'>{t('detail.Account')}</p>
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