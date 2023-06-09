import Constants from "../constants/Constants"
import { PaginationModel } from "./common/Common"

export interface CategoryOptionModel {
    id: number,
    name: string
}
export interface CategoryGetModel {
    name: string | null,
    from_date: string | null,
    to_date: string | null,
    page_size: number,
    page_index: number,
    order_by: number
}

export interface CategoryDetailModel {
    id: number,
    name: string,
    createAt: string,
    thumbnail: string
}
export interface CategoryStateModel {
    lstCategoryOption: CategoryOptionModel[],
    lstCategory: CategoryDetailModel[],
    currentFilterCategory: CategoryGetModel,
    currentCategoryDetail: CategoryDetailModel,
    pagination:PaginationModel
}

export let defaultCategoryGet: CategoryGetModel = {
  name: null,
  from_date: null,
  to_date: null,
  page_size: -1,
  page_index: 1,
  order_by: -1
}
export const defaultCategoryDetail: CategoryDetailModel = {
  createAt: '',
  thumbnail: Constants.defaultThumbnail,
  id: -1,
  name: ''
}
