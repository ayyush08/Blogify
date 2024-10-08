import axios from 'axios';
import toast from 'react-hot-toast';
import { API } from '@/constants.js';

export const getUserBlogs = async (userId,page,limit) => {
    try {
        const {data} = await API.get(`/blogapi/v1/blogs/user/${userId}?page=${page}&limit=${limit}`);
        console.log(data?.message);
        
        return data?.data;
    } catch (error) {
        toast.error("Failed to fetch user blogs");
        throw error?.response?.data?.message;
    }
}

export const uploadBlog = async (blogData) => {
    try {
        const {data} = await API.post('/blogapi/v1/blogs/upload', blogData);
        toast.success(data?.message);
        return data?.data;
    } catch (error) {
        toast.error("Failed to upload blog");
        throw error?.response?.data?.message;
    }
}

export const updateBlog = async (blogId, blogData) => {
    try {
        const {data} = await API.put(`/blogapi/v1/blogs/${blogId}`, blogData);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error("Failed to update blog");
        throw error?.response?.data?.message;
    }
}

export const deleteBlog = async (blogId) => {
    try {
        const {data} = await API.delete(`/blogapi/v1/blogs/${blogId}`);
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error("Failed to delete blog");
        throw error?.response?.data?.message;
    }
}

export const getAllBlogs = async (page=1,limit=10) => {
    try {
        const {data} = await API.get(`/blogapi/v1/blogs/fetchBlogs?page=${page}&limit=${limit}`);
        console.log(data?.message);
        return data?.data;
    } catch (error) {
        toast.error("Failed to fetch blogs");
        throw error?.response?.data?.message;
    }
}

export const getBlogById = async (blogId) => {
    try {
        const {data} = await API.get(`/blogapi/v1/blogs/${blogId}`);
        console.log(data?.message);
        return data?.data;
    } catch (error) {
    
        throw error?.response?.data?.message;
    }
}