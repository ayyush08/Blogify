import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/constants';
const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});
API.interceptors.response.use(
    (response) => response, // For successful requests, just return the response
    async (error) => {
        console.log("error occured", error);
        const originalRequest = error.config;
        // Check if the error is due to an expired JWT and we haven't already retried the request
        if (
            error?.response?.data?.error === "jwt expired" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true; // Mark this request as retried
            try {
                console.log("this refresh access token called");
                const { accessToken } = await refreshAccessToken();
                console.log("new access token", accessToken);
                // Assume this function refreshes the token and returns the new one
                // Update the authorization header with the new token
                API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return API(originalRequest); // Retry the original request with the new token
            } catch (refreshError) {
                // If the token refresh fails, reject the promise
                return Promise.reject(refreshError);
            }
        }
        // For all other errors, just return the promise rejection
        return Promise.reject(error);
    }
);
export const registerUser = async (userData) => {
    try {
        const {data} = await API.post('/blogapi/v1/users/register', userData);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const loginUser = async (userData) => {
    try {
        const {data} = await API.post('/blogapi/v1/users/login', userData);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const logoutUser = async () => {
    try {
        const {data} = await API.post('/blogapi/v1/users/logout');
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const getUserProfile = async () => {
    try {
        const {data} = await API.get('/blogapi/v1/users/profile');
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

const refreshAccessToken = async () => {
    console.log("refresh access token called");
    try {
        const { data } = await API.post("/blogapi/v1/users/refresh-token");
        console.log(data);
        return data?.data;
    } catch (error) {
        throw error?.response?.data?.error;
    }
};