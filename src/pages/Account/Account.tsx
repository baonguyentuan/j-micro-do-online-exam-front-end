import { Tabs } from 'antd';
import React from 'react'
import type { TabsProps } from 'antd';
import UserInfo from '../../components/User/UserInfo';
import ListExamUser from '../../components/Exam/ListExamUser';
import ListContestUser from '../../components/Contest/ListContestUser';

type Props = {}

function Account({ }: Props) {
    let itemsTab:TabsProps['items']=[
        {
            label:'Information',
            key:'information',
            children:<UserInfo/>
        },
        {
            label:'Exam',
            key:'exam',
            children:<ListExamUser/>
        },
        {
            label:'Contest',
            key:'contest',
            children:<ListContestUser/>
        },
    ]
    return (
        <div className='size__component py-4' style={{ height: '70vh' }}>
            <h1 className='text-center font-bold text-2xl m-4'>Your Account Information</h1>
            <Tabs
            type='card'
                tabPosition='left'
                items={itemsTab}
            />
        </div>
    )
}

export default Account