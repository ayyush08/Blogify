import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants";

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});


API.interceptors.response.use(
    (response) => response,
    async(error)
)
