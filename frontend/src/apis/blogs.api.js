import axios from 'axios';
import toast from 'react-hot-toast';

export const getUserBlogs = async (userId) => {
    try {
        const {data} = await axios.get(`/api/blogs/user/${userId}`);
        toast.success(data.message);
        return data?.docs;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}

export const uploadBlog = async (userId, blogData) => {
    try {
        const {data} = await axios.post(`/api/blogs/upload/${userId}`, blogData);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}

export const updateBlog = async (blogId, blogData) => {
    try {
        const {data} = await axios.put(`/api/blogs/${blogId}`, blogData);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}

export const deleteBlog = async (blogId) => {
    try {
        const {data} = await axios.delete(`/api/blogs/${blogId}`);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}

export const getAllBlogs = async () => {
    try {
        const {data} = await axios.get(`/api/blogs/fetchBlogs`);
        toast.success(data.message);
        return data?.docs;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}