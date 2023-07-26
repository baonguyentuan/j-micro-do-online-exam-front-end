import axios from "axios";
import Constants from "../constants/Constants";
import { getLocalStorage } from "./local-storage";
import ApiEndpoint from "../constants/ApiEndpoint";

const clientService = axios.create({
  baseURL: ApiEndpoint.domain
});


clientService.interceptors.request.use((config) => {
  let token = getLocalStorage(Constants.localStorageKey.accessToken);
  
  if(getLocalStorage(Constants.localStorageKey.userExamToken) !== null){
    switch (config.url){
      case ApiEndpoint.contest.GET_CONTEST_FOR_USER:
      case ApiEndpoint.exam.FETCH_DETAIL:
      case ApiEndpoint.exam.SUBMIT_EXAM:
      case ApiEndpoint.feedback.GET_STATUS_USER_FEEDBACK:
      case ApiEndpoint.feedback.CREATE_EXAM_FEEDBACK:
        token = getLocalStorage(Constants.localStorageKey.userExamToken);
        break;
      default:
    }
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientService;