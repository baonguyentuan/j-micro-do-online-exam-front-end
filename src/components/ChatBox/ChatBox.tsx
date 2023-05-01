import React, { useRef, useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { sendMessage, setChatBoxShow } from '../../redux/reducers/chat/chatSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/configStore'
import { useTranslation } from 'react-i18next'

type Props = {
    chatboxShow: boolean
}

const ChatBox = ({ chatboxShow }: Props) => {
    const {t}=useTranslation('chat')
    const { arrMessage } = useSelector((state: RootState) => state.chatSlice)
    const messageEl = useRef<HTMLDivElement>(null);
    let [message, setMessage] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        if (messageEl) {
            messageEl.current?.scrollTo({
                top: messageEl.current.scrollHeight,
                behavior: 'smooth'
            });  
        }
    },[arrMessage])
    return (
        <div className={`chat__box ${chatboxShow ? ' scale-100' : ' scale-0'} `}>
            <div className='chat__title'>
                <div className='flex justify-between items-center text-xl pb-2'>
                    <p>Our Examination</p>
                    <Button className='btn__chathide' type='link' onClick={() => {
                        dispatch(setChatBoxShow( {chatboxShow:!chatboxShow} ))
                    }}><DownOutlined /></Button>
                </div>
                <div>
                    <p>{t('welcome to Our Examination Chatbox')}</p>
                    <p>{t('happy to support you!')}</p>
                    <p>{t('how can we support you?')}</p>
                </div>
            </div>
            <div className='chat__area'>
                <div className='chat__type'>
                    <Button className='btn__chattype' size='large'>Chat with facebook</Button>
                    <Button className='btn__chattype' size='large'>Normal Chat</Button>
                </div>
                <div className='chatbox__message '>
                    <div id='chat__message' className='chat__message' ref={messageEl}>
                        <ul>
                            {arrMessage.map((mesItem, index) => {
                                return <li key={index} className={mesItem.isUser ? 'user_mes' : 'admin_mes'}>
                                    <span className='message__chat'>{mesItem.message}</span>
                                </li>
                            })}
                        </ul>
                    </div>
                    <Form onSubmitCapture={(e) => {
                        dispatch(sendMessage({ message }))
                        setMessage('')
                    }} className='chat__typing'>
                        <Input onChange={(e) => {
                            setMessage(e.target.value)
                        }} value={message} placeholder='Typing chat here' />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ChatBox