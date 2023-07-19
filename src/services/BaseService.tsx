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

  putAdmin(url: string, model: any) {
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

  putByCondition(url: string, model: Object, params: Object) {
    if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'PUT',
        data: model,
        params: params,
        headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
      })
    } else {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'PUT',
        data: model,
        params: params,
      })
    }
  }
  post(url: string, model: any) {
    //if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'POST',
        data: model,
        headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imh1eW5ndXllbiIsImp0aSI6Imh1eW5ndXllbkBnbWFpbC5jb20iLCJzdWIiOiJVU0VSIiwiYXVkIjoiMiIsImlhdCI6MTY4OTMyODcyNCwiZXhwIjoxNjg5MzMwNTI0fQ.tRIwTc6ayS-FfqoXehKWjNxz2qDg6wURQcE7Wh972yY" }
      })
    // } else {
    //   return axios({
    //     url: `${ApiEndpoint.domain}/${url}`,
    //     method: 'POST',
    //     data: model,
    //   })
    // }
  }
  postAdmin(url: string, model: any) {
    if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'POST',
        params: model,
        headers: { "Authorization": "Bearer " + localStorage.getItem(Constants.localStorageKey.accessToken) }
      })
    } else {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'POST',
        params: model,
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
   // if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'GET',
        params: model,
        headers: { "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imh1eW5ndXllbiIsImp0aSI6Imh1eW5ndXllbkBnbWFpbC5jb20iLCJzdWIiOiJVU0VSIiwiYXVkIjoiMiIsImlhdCI6MTY4OTMyODcyNCwiZXhwIjoxNjg5MzMwNTI0fQ.tRIwTc6ayS-FfqoXehKWjNxz2qDg6wURQcE7Wh972yY" }
      })
    // } else {
    //   return axios({
    //     url: `${ApiEndpoint.domain}/${url}`,
    //     method: 'GET',
    //     params: model,
    //   })
    // }
  }

  getByParams(url: string, model: any) {
    // if (localStorage.getItem(Constants.localStorageKey.accessToken)) {
      return axios({
        url: `${ApiEndpoint.domain}/${url}`,
        method: 'GET',
        params: model,
        headers: { "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imh1eW5ndXllbiIsImp0aSI6Imh1eW5ndXllbkBnbWFpbC5jb20iLCJzdWIiOiJVU0VSIiwiYXVkIjoiMiIsImlhdCI6MTY4OTMyODcyNCwiZXhwIjoxNjg5MzMwNTI0fQ.tRIwTc6ayS-FfqoXehKWjNxz2qDg6wURQcE7Wh972yY"}
      })
    // } else {
    //   return axios({
    //     url: `${ApiEndpoint.domain}/${url}`,
    //     method: 'GET',
    //     params: model,
    //   })
    // }

  }
  getOrderBy(url: string, model: string) {
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