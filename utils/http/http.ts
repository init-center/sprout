import axios, { AxiosResponse } from "axios";
import { TOKEN_KEY } from "../../constants";

export type Response<T> = AxiosResponse<T>;

export interface ResponseData<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

// create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
  timeout: 20000,
  withCredentials: true,
});

// config interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(TOKEN_KEY);
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
