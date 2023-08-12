import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Navigate, NavLink } from 'react-router-dom'
import { DispatchType } from '../../../redux/configStore'
import { useDispatch } from 'react-redux'
import { createTransactionAPI } from '../../../redux/reducers/payment'
import AppRoutes from '../../../constants/AppRoutes'
import { Statistic } from 'antd'

type Props = {}
interface TransactionInfoModel {
    vnp_Amount: number,
    vnp_BankCode: string,
    vnp_BankTranNo: string,
    vnp_CardType: string,
    vnp_OrderInfo: string,
    vnp_ResponseCode: string,
    vnp_TransactionNo: string,
    vnp_TransactionStatus: string,
    vnp_TxnRef: string,
}
const PaymentInfo = (props: Props) => {
    const [params] = useSearchParams()
    let [timing, setTiming] = useState(5)
    let navigate = useNavigate()
    const dispatch: DispatchType = useDispatch()
    let timeWaiting = () => {
        setInterval(() => {
            if (timing > 0) {
                setTiming(timing - 1)
            }
        }, 1000);
        if (timing > 0) {
            return <NavLink className='underline' to={AppRoutes.private.user.account}>{`Quay trở lại trang tài khoản (tự động chuyển trang sau ${timing})s`}</NavLink>
        } else {
            return <Navigate to={AppRoutes.private.user.account} />
        }
    }
    let renderHtml = () => {
        if (params.get('vnp_Amount') &&
            params.get('vnp_BankCode') &&
            params.get('vnp_BankTranNo') &&
            params.get('vnp_CardType') &&
            params.get('vnp_OrderInfo') &&
            params.get('vnp_ResponseCode') &&
            params.get('vnp_TransactionNo') &&
            params.get('vnp_TransactionStatus') &&
            params.get('vnp_TxnRef')) {
            return <div style={{ maxWidth: 500 }} className='border-2 border-blue-600 p-4 rounded-lg w-full'>
                <h1 className='py-2 text-2xl font-bold'>Thông tin thanh toán</h1>
                <p className='py-2 grid grid-cols-3'>
                    <span className='font-semibold col-span-1'>Số tiền</span>
                    <span className='col-span-2'>: {Number(params.get('vnp_Amount')).toLocaleString()} VND</span>
                </p>
                <p className='py-2 grid grid-cols-3'>
                    <span className='font-semibold col-span-1'>Mã giao dịch</span>
                    <span className='col-span-2'>: {params.get('vnp_BankTranNo')}</span>
                </p>
                <p className='py-2 grid grid-cols-3'>
                    <span className='font-semibold col-span-1'>Mô tả</span>
                    <span className='col-span-2'>: {params.get('vnp_OrderInfo')}</span>
                </p>
                {timeWaiting()}
            </div>
        } else {
            return <Navigate to={AppRoutes.public.home} />
        }
    }
    useEffect(() => {
        if (params.get('vnp_Amount') &&
            params.get('vnp_BankCode') &&
            params.get('vnp_BankTranNo') &&
            params.get('vnp_CardType') &&
            params.get('vnp_OrderInfo') &&
            params.get('vnp_ResponseCode') &&
            params.get('vnp_TransactionNo') &&
            params.get('vnp_TransactionStatus') &&
            params.get('vnp_TxnRef')) {
            let transactionInfo = {
                vnp_Amount: params.get('vnp_Amount'),
                vnp_BankCode: params.get('vnp_BankCode'),
                vnp_BankTranNo: params.get('vnp_BankTranNo'),
                vnp_CardType: params.get('vnp_CardType'),
                vnp_OrderInfo: params.get('vnp_OrderInfo'),
                vnp_ResponseCode: params.get('vnp_ResponseCode'),
                vnp_TransactionNo: params.get('vnp_TransactionNo'),
                vnp_TransactionStatus: params.get('vnp_TransactionStatus'),
                vnp_TxnRef: params.get('vnp_TxnRef'),
            }
            dispatch(createTransactionAPI(transactionInfo))
        }
    }, [])

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            {renderHtml()}
        </div>
    )
}

export default PaymentInfo