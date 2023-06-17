import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog, BlogState } from '../../../_core/Blog';

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    fetchBlogsStart(state) {
      state.loading = true;
    },
    fetchBlogsSuccess(state, action: PayloadAction<Blog[]>) {
      state.loading = false;
      state.error = null;
      state.blogs = action.payload;
    },
    fetchBlogsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const { fetchBlogsStart, fetchBlogsSuccess, fetchBlogsFailure } = blogSlice.actions;

// Export reducer
export default blogSlice.reducer;

// Selectors
export const selectAllBlogs = (state: { blogSlice: BlogState }) => state.blogSlice.blogs;
