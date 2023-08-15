import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { thunkAction } from '../../utils/redux-helpers';
import clientService from '../../utils/client';
import ApiEndpoint from '../../constants/ApiEndpoint';
import { history } from '../..';
import { getUserInfo } from './user/userSlice';
import { setLocalStorage } from '../../utils/local-storage';
import Constants from '../../constants/Constants';

const initialState = {

}

const paymentSlice = createSlice({
    name: 'paymentSlice',
    initialState,
    reducers: {},
});

export const { } = paymentSlice.actions

export default paymentSlice.reducer

export const createPaymentAPI = createAsyncThunk(
    "payment/createPayment",
    thunkAction(async (price: number) => {
        try {
            console.log(price);
            
            let result = await clientService.get(ApiEndpoint.payment.CREATE_PAYMENT, { params: { totalPrice: price } });
            if (result.data.data.status === '00' && result.data.data.message === 'Success') {
                let win = window.open(result.data.data.url,"_parent")
                win?.focus()
            }
            return result
        } catch (error) {
            console.log(error);

        }
    })
);
export const createTransactionAPI = createAsyncThunk(
    "payment/createTransaction",
    thunkAction(async (transactionInfo: object,{dispatch}) => {
        try {
            console.log(transactionInfo);
            let result = await clientService.get(ApiEndpoint.payment.CREATE_TRANSACTION, { params: transactionInfo });
            if(result.data.message==='Create Transaction Success'  ){
                console.log(result.data);
                setLocalStorage(Constants.localStorageKey.accessToken,result.data.accessToken)
                await dispatch(getUserInfo())
            }else if(result.data.message==='Extend Success'){
                await dispatch(getUserInfo())
            }
            
            return result
        } catch (error) {
            console.log(error);

        }
    })
);