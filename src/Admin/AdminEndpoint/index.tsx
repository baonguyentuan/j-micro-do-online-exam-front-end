import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { getEndpointApi } from '../../redux/reducers/endpoint/endpointSlice';
import Endpoints from './components/Endpoints';

function AdminEndpoint() {
    const endpoints = useSelector((state: RootState) => state.endpointSlice?.data);
    let dispatch: DispatchType = useDispatch()
    useEffect(() => {
        dispatch(getEndpointApi());
    }, []);

    return (
        <div>
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Endpoint Management</h1>
            <Endpoints endpoints={endpoints} />
        </div>
    );
}


export default AdminEndpoint;
