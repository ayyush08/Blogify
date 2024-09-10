import axios from 'axios';
import toast from 'react-hot-toast';
import {API} from '../utils/axiosInterceptor.js';

export const getUserBlogs = async (userId) => {
    try {
        const {data} = await API.get(`/blogapi/v1/blogs/user/${userId}`,
                { withCredentials:true}
        );
        toast.success(data?.message);
        // console.log(data?.docs);
        
        return data?.docs;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const uploadBlog = async (userId, blogData) => {
    try {
        const {data} = await API.post(`/blogapi/v1/blogs/upload/${userId}`, blogData);
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const updateBlog = async (blogId, blogData) => {
    try {
        const {data} = await API.put(`/blogapi/v1/blogs/${blogId}`, blogData);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const deleteBlog = async (blogId) => {
    try {
        const {data} = await API.delete(`/blogapi/v1/blogs/${blogId}`);
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const getAllBlogs = async () => {
    try {
        const {data} = await API.get('/blogapi/v1/blogs/fetchBlogs',{
            withCredentials:true
        });
        toast.success(data?.message);
        console.log(data?.data);       
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}