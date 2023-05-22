import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CommentState, ContestCommentModel } from '../../../_core/CommentModel';

const initialState: CommentState = {
  lstComment: [
  ]
}

const contestCommentSlice = createSlice({
  name: 'contestCommentSlice',
  initialState,
  reducers: {
    getLstContestComment: (state: CommentState, action: PayloadAction<{ lstComment: ContestCommentModel[] }>) => {
      state.lstComment = action.payload.lstComment
    },
    sendContestComment: (state: CommentState, action: PayloadAction<{ comment: string, userId: number, vote: number }>) => {
      state.lstComment.push({
        cmtID: Date.now(),
        comment: action.payload.comment,
        userId: action.payload.userId,
        vote: action.payload.vote
      })
    }
  }
});

export const { getLstContestComment,sendContestComment } = contestCommentSlice.actions

export default contestCommentSlice.reducer