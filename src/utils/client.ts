import axios from "axios";
import ApiEndpoint from "../constants/ApiEndpoint";

const clientService = axios.create({
  baseURL: ApiEndpoint.domain
});

//export const TOKEN = getLocalStorage(Constants.localStorageKey.accessToken); 
export const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imh1eW5ndXllbiIsImp0aSI6Imh1eW5ndXllbkBnbWFpbC5jb20iLCJzdWIiOiJVU0VSIiwiYXVkIjoiMiIsImlhdCI6MTY4OTMyODcyNCwiZXhwIjoxNjg5MzMwNTI0fQ.tRIwTc6ayS-FfqoXehKWjNxz2qDg6wURQcE7Wh972yY";

clientService.interceptors.request.use((config) => {
  //const token = TOKEN;
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imh1eW5ndXllbiIsImp0aSI6Imh1eW5ndXllbkBnbWFpbC5jb20iLCJzdWIiOiJVU0VSIiwiYXVkIjoiMiIsImlhdCI6MTY4OTMyODcyNCwiZXhwIjoxNjg5MzMwNTI0fQ.tRIwTc6ayS-FfqoXehKWjNxz2qDg6wURQcE7Wh972yY";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clientService;