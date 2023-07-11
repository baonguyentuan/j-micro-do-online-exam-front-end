import axios from 'axios'
import ApiEndpoint from "../constants/ApiEndpoint";
import Constants from "../constants/Constants";

export class BaseService {

  put(url: string, model: any) {
    if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'PUT',
        data: model,
        headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
      })
    } else {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'PUT',
        data: model,
      })
    }
  }
  putByParam(url: string, model: any) {
    if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'PUT',
        params: model,
        headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
      })
    } else {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'PUT',
        params: model,
      })
    }
  }
  post(url: string, model: any) {
    if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'POST',
        data: model,
        headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
      })
    } else {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'POST',
        data: model,
      })
    }
  }

  get(url: string) {
    if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'GET',
        headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
      })
    } else {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'GET',
      })
    }

  }

  getByCondition(url: string, model: Object) {
    if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'GET',
        params: model,
        headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
      })
    } else {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'GET',
        params: model,
      })
    }

  }

  getByParams(url: string, model: any) {
    if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'GET',
        params: model,
        headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
      })
    } else {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'GET',
        params: model,
      })
    }

  }

  delete(url: string, id: number) {
    if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}?id=${id}`,
        method: 'DELETE',
        headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
      })
    } else {
      return axios({
        url: `${ApiEndpoint.domain}/${url}?id=${id}`,
        method: 'DELETE',
      })
    }
  }
}