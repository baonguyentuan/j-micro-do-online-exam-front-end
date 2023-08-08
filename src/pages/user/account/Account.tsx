import { Tabs } from 'antd';
import React from 'react'
import type { TabsProps } from 'antd';
import UserInfo from '../../../components/User/UserInfo';
import ListExamUser from '../../../components/exams/private/ListExamUser';
import ListContestUser from '../../../components/Contest/ListContestUser';
import PaymentUser from "../../../components/exams/private/PaymentUser";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../../redux/configStore';
import { useDispatch } from 'react-redux';
import { setDefaultTabAccountKey } from '../../../redux/reducers/menu/menuSlice';
import { getLocalStorage } from '../../../utils/local-storage';

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
    disabled: getLocalStorage('account') === 'ADMIN',
    children: <ListExamUser />
  },
  {
    label: 'Contest',
    key: 'contest',
    disabled: getLocalStorage('account') === 'ADMIN',
    children: <ListContestUser />
  }, {
    label: 'Payment',
    key: 'payment',
    children: <PaymentUser />
  },
]

function Account({ }: Props) {
  let { defaultTabAccountKey } = useSelector((state: RootState) => state.menuSlice)
  const dispatch: DispatchType = useDispatch();
  return (
    <div>
      <AccountWrapper className='size__component rounded py-4 mb-20 bg-slate-50' style={{ minHeight: '90vh' }}>
        <h1 className='font-medium text-2xl mt-4 mb-8'>Your Account Information</h1>
        <Tabs
          type='card'
          tabPosition='left'
          onChange={(key) => {
            dispatch(setDefaultTabAccountKey({ key }))
          }}
          defaultActiveKey={defaultTabAccountKey}
          items={itemsTab}
        />
      </AccountWrapper>
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

  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
`

export default Account