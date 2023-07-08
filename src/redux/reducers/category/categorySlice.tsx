import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
  CategoryDetailModel,
  CategoryGetModel,
  CategoryOptionModel,
  CategoryStateModel,
  defaultCategoryGet
} from '../../../_core/CategoryModel';
import {setLoading} from '../loading/loadingSlice';
import {DispatchType} from '../../configStore';
import {openNotificationWithIcon} from '../../../utils/operate';
import {categoryService} from '../../../services/CategoryService';
import Constants from "../../../constants/Constants";

const initialState: CategoryStateModel = {
  lstCategoryOption: [],
  lstCategory: [],
  currentFilterCategory: defaultCategoryGet,
  currentCategoryDetail: {
    createAt: '',
    thumbnail: '',
    id: -1,
    name: ''
  }
}

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    getCategoryOption: (state: CategoryStateModel, action: PayloadAction<{ lstCategoryOption: CategoryOptionModel[] }>) => {
      state.lstCategoryOption = action.payload.lstCategoryOption
    },
    getLstCategory: (state: CategoryStateModel, action: PayloadAction<{ lstCategory: CategoryDetailModel[] }>) => {
      state.lstCategory = action.payload.lstCategory
    },
    getCurrentCategory: (state: CategoryStateModel, action: PayloadAction<{ categoryDetail: CategoryDetailModel }>) => {
      state.currentCategoryDetail = action.payload.categoryDetail
    },
  }
});
export const {getCategoryOption, getLstCategory, getCurrentCategory} = categorySlice.actions
export default categorySlice.reducer

export const getCategoryOptionApi = () => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({isLoading: true}))
    try {
      const result = await categoryService.getCategoryOption()
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        await dispatch(getCategoryOption({lstCategoryOption: result.data.data}))
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
    await dispatch(setLoading({isLoading: false}))
  }
}

export const getCategoryByConditionApi = (condition: CategoryGetModel) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({isLoading: true}))
    try {
      const result = await categoryService.getCategoryByCondition(condition)
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        await dispatch(getLstCategory({lstCategory: result.data.data}))
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
    await dispatch(setLoading({isLoading: false}))
  }
}

export const deleteCategoryApi = (idCategory: number) => {
  return async (dispatch: DispatchType) => {
    await dispatch(setLoading({isLoading: true}))
    try {
      const result = await categoryService.deleteCategory(idCategory)
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        await dispatch(getCategoryByConditionApi(categorySlice.getInitialState().currentFilterCategory))
        openNotificationWithIcon('success', 'Delete category successful', '', 1)
      } else {
        console.log(result);
        openNotificationWithIcon('error', 'Delete category failed', '', 1)
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Delete category failed', '', 1)
    }
    await dispatch(setLoading({isLoading: false}))
  }
}

export const getCategoryDetailApi = (idCategory: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await categoryService.getCategoryDetail({id: idCategory})
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        await dispatch(getCurrentCategory({categoryDetail: result.data.data}))
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export const createCategoryApi = (categoryModel: FormData) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await categoryService.createCategory(categoryModel)
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        openNotificationWithIcon('success', 'Create category successful', '', 1)
      } else {
        console.log(result);
        openNotificationWithIcon('error', 'Create category failed', '', 1)
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Create category failed', '', 1)
    }
  }
}

export const updateCategoryNameApi = (nameModel: FormData) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await categoryService.updateCategoryName(nameModel)
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        openNotificationWithIcon('success', 'Update category successful', '', 1)
      } else {
        console.log(result);
        openNotificationWithIcon('error', 'Update category failed', '', 1)
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Update category failed', '', 1)
    }
  }
}

export const updateCategoryThumbnailApi = (thumbnailModel: FormData) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await categoryService.updateCategoryThumbnail(thumbnailModel)
      if (result.status === Constants.httpStatusCode.SUCCESS) {
        openNotificationWithIcon('success', 'Update category successful', '', 1)
      } else {
        console.log(result);
        openNotificationWithIcon('error', 'Update category failed', '', 1)
      }
    } catch (err) {
      console.log(err);
      openNotificationWithIcon('error', 'Update category failed', '', 1)
    }
  }
}