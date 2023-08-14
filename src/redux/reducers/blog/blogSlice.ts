import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog, BlogState } from '../../../_core/Blog';
import { thunkAction } from '../../../utils/redux-helpers';
import clientService from '../../../utils/client';
import ApiEndpoint from '../../../constants/ApiEndpoint';
import AppConfigs from '../../../config/AppConfigs';
import { openNotificationWithIcon } from '../../../utils/operate';

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  pagination: {
    index: AppConfigs.pagination.DEFAULT_PAGE_SIZE,
    pages: AppConfigs.pagination.DEFAULT_PAGE_INDEX,
    totals: 0
  }
};

const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    // fetchBlogsStart(state) {
    //   state.loading = true;
    // },
    // fetchBlogsSuccess(state, action: PayloadAction<Blog[]>) {
    //   state.loading = false;
    //   state.error = null;
    //   state.blogs = action.payload;
    // },
    // fetchBlogsFailure(state, action: PayloadAction<string>) {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  },
  extraReducers: (builder => {
    builder.addCase(getListArticlesAPI.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload.data;
      state.pagination = action.payload.pagination
      return state;
    });
  }),
});

// Export actions
export const { } = blogSlice.actions;

// Export reducer
export default blogSlice.reducer;

// Selectors
export const selectAllBlogs = (state: { blogSlice: BlogState }) => state.blogSlice.blogs;

export const getListArticlesAPI = createAsyncThunk(
  "articles/getListArcticle",
  thunkAction(async (params: object) => {
    try {
      let result = await clientService.get(ApiEndpoint.article.GET, { params });
      console.log(result.data);

      return result
    } catch (error) {
      console.log(error);

    }
  })
);
export const createArticlesAPI = createAsyncThunk(
  "articles/createArcticle",
  thunkAction(async (articleInfo: FormData, { dispatch }) => {
    try {
      let result = await clientService.post(ApiEndpoint.article.GET, articleInfo);
      await dispatch(getListArticlesAPI({
        title: '',
        author: '',
        from_date: '',
        to_date: '',
        page_size: AppConfigs.pagination.DEFAULT_PAGE_SIZE,
        page_index: AppConfigs.pagination.DEFAULT_PAGE_INDEX,
        order_by: -1
      }))
      openNotificationWithIcon("success", "Create blog successful", "", 1)

      return result
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", "Create blog failed", "", 1);

    }
  })
);