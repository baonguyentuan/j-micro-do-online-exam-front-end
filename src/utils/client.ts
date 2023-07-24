import axios from "axios";
import ApiEndpoint from "../constants/ApiEndpoint";
import Constants from "../constants/Constants";
import { getLocalStorage } from "./local-storage";

const clientService = axios.create({
  baseURL: ApiEndpoint.domain
});


clientService.interceptors.request.use((config) => {
  const token = getLocalStorage(Constants.localStorageKey.accessToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientService;