import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants";

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

const useAxiosInterceptors = () => {
    API.interceptors.request.use(
        
    );
};

export { API, useAxiosInterceptors };