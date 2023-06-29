import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CategoryModel, CategoryStateModel } from '../../../_core/CategoryModel';
import { setLoading } from '../loading/loadingSlice';
import { DispatchType } from '../../configStore';
import { openNotificationWithIcon } from '../../../utils/operate';
import { categoryService } from '../../../services/CategoryService';
import { STATUS_CODE } from '../../../utils/config';

const initialState:CategoryStateModel = {
    lstCategory:[]
}

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    getAllCategory:(state: CategoryStateModel, action: PayloadAction<{ lstCategory: CategoryModel[] }>)=>{
        state.lstCategory=action.payload.lstCategory
    }
  }
});

export const {getAllCategory} = categorySlice.actions

export default categorySlice.reducer
export const getCategoryOptionApi = () => {
    return async (dispatch: DispatchType) => {
      await dispatch(setLoading({ isLoading: true }))
      try {
        const result = await categoryService.getAllCategory()
        if (result.status === STATUS_CODE.SUCCESS) {
          dispatch(getAllCategory(result.data.content))
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
      await dispatch(setLoading({ isLoading: false }))
    }
  }
  export const updateCategoryByIdApi = (idCategory:string) => {
    return async (dispatch: DispatchType) => {
      await dispatch(setLoading({ isLoading: true }))
      try {
        const result = await categoryService.updateCategoryById(idCategory)
        if (result.status === STATUS_CODE.SUCCESS) {
          dispatch(getCategoryOptionApi())
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
      await dispatch(setLoading({ isLoading: false }))
    }
  }