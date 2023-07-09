import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ChatState} from '../../../_core/ChatModel';

const initialState: ChatState = {
  chatboxShow: false,
  arrMessage: [
    {
      isUser: true,
      message: '12345'
    },
    {
      isUser: false,
      message: 'abc'
    },
    {
      isUser: true,
      message: 'ght'
    },
    {
      isUser: false,
      message: '9867'
    },
    {
      isUser: true,
      message: 'dcim'
    },
    {
      isUser: false,
      message: 'what'
    }
  ],
  unReadMessage: 2
}

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setChatBoxShow: (state: ChatState, action: PayloadAction<{ chatboxShow: boolean, }>) => {
      state.chatboxShow = action.payload.chatboxShow
    },
    setReadMessageStatus: (state: ChatState) => {
      state.unReadMessage = 0
    },
    sendMessage: (state: ChatState, action: PayloadAction<{ message: string }>) => {
      state.arrMessage.push({isUser: true, message: action.payload.message})
    }

  }
});

export const {setChatBoxShow, setReadMessageStatus, sendMessage} = chatSlice.actions

export default chatSlice.reducer