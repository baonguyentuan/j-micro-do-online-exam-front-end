import { Tabs } from 'antd';
import React from 'react'
import type { TabsProps } from 'antd';
import UserInfo from '../../../components/User/UserInfo';
import ListExamUser from '../../../components/exams/private/ListExamUser';
import ListContestUser from '../../../components/Contest/ListContestUser';
import PaymentUser from "../../../components/exams/private/PaymentUser";
import styled from "styled-components";
import DrawerModifier from '../../../components/Drawer/DrawerModifier';

type Props = {}
let itemsTab: TabsProps['items'] = [
  {
    label: 'Information',
    key: 'information',
    children: <UserInfo />
  },
  {
    label: 'Exam',
    key: 'exam',
    children: <ListExamUser />
  },
  {
    label: 'Contest',
    key: 'contest',
    children: <ListContestUser />
  }, {
    label: 'Payment',
    key: 'payment',
    children: <PaymentUser />
  },
]

function Account({ }: Props) {

  return (
    <div>
      <AccountWrapper className='size__component rounded py-4 mb-20 bg-slate-50' style={{ minHeight: '90vh' }}>
        <h1 className='font-medium text-2xl mt-4 mb-8'>Your Account Information</h1>
        <Tabs
          type='card'
          tabPosition='left'
          items={itemsTab}
        />
      </AccountWrapper>
      <DrawerModifier />
    </div>

  )
}

const AccountWrapper = styled.section`
  .ant-tabs-tab{
    font-size: 17px;
  }
  
  h1{
    position: relative;
    &::after{
      left: 0;
      width: 12%;
      content: '';
      height: 2px;
      bottom: -2px;
      position: absolute;
      background-color: #FFB84C;
    }
  }
  
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`

export default Account