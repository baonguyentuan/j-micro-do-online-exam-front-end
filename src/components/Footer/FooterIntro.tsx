import React, { useRef } from 'react'
import { MessageOutlined, UpSquareOutlined } from '@ant-design/icons'
import { Badge, Button } from 'antd'
import { NavLink } from 'react-router-dom'
import ChatBox from '../ChatBox/ChatBox'
import '../../assets/css/footer/footer.css'
import '../../assets/css/chat/chat.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/configStore'
import { setChatBoxShow, setReadMessageStatus } from '../../redux/reducers/chat/chatSlice'
import { useTranslation } from 'react-i18next'
import { backToPosition } from '../../utils/operate'
type Props = {}

export default function FooterIntro({ }: Props) {
    const { t } = useTranslation('footer')
    const { chatboxShow,unReadMessage } = useSelector((state: RootState) => state.chatSlice)
    const dispatch = useDispatch()
    return (
        <div className='footer__intro bg-slate-100 py-4'>
            <div className=' grid sm:grid-cols-3 grid-cols-1 gap-4 size__component'>
                <ul className='flex flex-col'>
                    <NavLink to={'/home'} className='py-1 font-semibold'>{t('uploadFile')}</NavLink>
                    <NavLink to={'/home'} className='py-1 font-semibold'>{t('examProvider')}</NavLink>
                </ul>
                <ul className='flex flex-col'>
                    <NavLink to={'/contact'} className='py-1 font-semibold'>{t('contact')}</NavLink>
                    <NavLink to={'/home'} className='py-1 font-semibold'>{t('faq')}</NavLink>
                    <NavLink to={'/blog'} className='py-1 font-semibold'>{t('blog')}</NavLink>
                </ul>
                <ul className='flex flex-col'>
                    <NavLink to={'/home'} className='py-1 font-semibold'>{t('facebook')}</NavLink>
                    <NavLink to={'/home'} className='py-1 font-semibold'>{t('privacyPolicy')}</NavLink>
                    <NavLink to={'/home'} className='py-1 font-semibold'>{t('termsConditions')}</NavLink>
                </ul>
            </div>
            <div className='support__area'>
                <Button type='link' className='btn__sup' onClick={() => {
                    dispatch(setChatBoxShow({chatboxShow:!chatboxShow} ))
                    if(unReadMessage>0){
                        dispatch(setReadMessageStatus())
                    }
                }}>
                    <Badge count={unReadMessage} size='default'>
                        <MessageOutlined className='sup__icon' />
                    </Badge>
                </Button>
                <ChatBox chatboxShow={chatboxShow} />
                <Button type='link' className='btn__sup' onClick={() => {
                    backToPosition(0)
                }}><UpSquareOutlined className='sup__icon' /></Button>
            </div>

        </div>
    )
}