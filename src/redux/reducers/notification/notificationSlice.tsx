import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {NotifyModel, NotifyState} from '../../../_core/NotificationModel';


const initialState: NotifyState = {
  haveNewNotify: false,
  arrNotify: [
    {
      id: 1,
      message: 'welcome to th EX',
      readStatus: true
    },
    {
      id: 2,
      message: 'You recieved score of Math exam',
      readStatus: true
    },
    {
      id: 3,
      message: 'You recieved score of IELTS exam',
      readStatus: false
    },
    {
      id: 4,
      message: 'You recieved score of PM exam',
      readStatus: true
    },
  ],
}

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {
    setNotifyBadge: (state: NotifyState, action: PayloadAction<{ status: boolean }>) => {
      state.haveNewNotify = action.payload.status
    },
    setNotifyReaded: (state: NotifyState, action: PayloadAction<{ notify: NotifyModel }>) => {
      let notyfyIndex = state.arrNotify.findIndex(noti => noti.id === action.payload.notify.id)
      if (notyfyIndex !== -1) {
        state.arrNotify[notyfyIndex].readStatus = true
      }
    }
  }
});

export const {setNotifyBadge, setNotifyReaded} = notificationSlice.actions

export default notificationSlice.reducer