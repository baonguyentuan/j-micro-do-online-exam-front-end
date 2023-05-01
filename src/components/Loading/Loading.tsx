import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import {LoadingOutlined} from '@ant-design/icons'
type Props = {}

const Loading = (props: Props) => {
    let { isLoading } = useSelector((state: RootState) => state.loadingSlice)
    return (
        <div className={`fixed ${isLoading ? 'w-screen h-screen': 'w-0 h-0'} flex justify-center items-center`} style={{
            zIndex: 99,
            backgroundColor: 'rgba(0,0,0,0.5'
        }} >
            {isLoading ?
                <LoadingOutlined className='text-8xl text-blue-400'/>
                : ''
            }
        </div>
    )
}

export default Loading