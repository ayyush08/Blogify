import axios from 'axios';
import toast from 'react-hot-toast';
import { API } from '../utils/axiosInterceptor.js';
import { useAxiosInterceptors } from '../utils/axiosInterceptor.js';
useAxiosInterceptors();
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