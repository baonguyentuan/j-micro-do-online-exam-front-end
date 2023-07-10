import axios from 'axios'
import ApiEndpoint from "../constants/ApiEndpoint";
import Constants from "../constants/Constants";

export class BaseService {

  put(url: string, model: any) {
    return axios({
      url: `${ApiEndpoint.domain}/${url}`,
      method: 'PUT',
      data: model,
      headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
    })
  }

  putByCondition(url: string, model: Object, params: Object) {
    return axios({
      url: `${ApiEndpoint.domain}/${url}`,
      method: 'PUT',
      data: model,
      params: params,
      headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
    })
  }

  post(url: string, model: any) {
    return axios({
      url: `${ApiEndpoint.domain}/${url}`,
      method: 'POST',
      data: model,
      headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
    })
  }

  postAdmin(url: string, model: any) {
    return axios({
      url: `${ApiEndpoint.domain}/${url}`,
      method: 'POST',
      params: model,
      headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
    })
  }

  get(url: string) {
    return axios({
      url: `${ApiEndpoint.domain}/${url}`,
      method: 'GET',
      headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
    })
  }

  getOrderBy(url: string, model: string) {
    return axios({
      url: `${ApiEndpoint.domain}/${url}`,
      method: 'GET',
      params: model,
      headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
    })
  }

  getByCondition(url: string, model: Object) {
    return axios({
      url: `${ApiEndpoint.domain}/${url}`,
      method: 'GET',
      params: model,
      headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
    })
  }

  getByParams(url: string, model: any) {
    return axios({
      url: `${ApiEndpoint.domain}/${url}`,
      method: 'GET',
      params: model,
      headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
    })
  }

  delete(url: string, id: number) {
    return axios({
      url: `${ApiEndpoint.domain}/${url}?id=${id}`,
      method: 'DELETE',
      headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
    })
  }
}