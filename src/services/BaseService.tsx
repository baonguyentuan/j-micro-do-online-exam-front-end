import axios from 'axios'
import { DOMAIN, TOKEN } from '../utils/config'
export class BaseService{
    constructor(){

    }
    put(url:string, model:any) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
    post(url:string, model:any) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
    get(url:string) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
    getByCondition(url:string,model:any) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            data: model,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
    delete(url:string,id:number) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            data: id,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
}