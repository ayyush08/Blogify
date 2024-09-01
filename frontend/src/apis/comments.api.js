import axios from "axios";
import toast from "react-hot-toast";
import {API} from "../utils/axiosInterceptor";
export const getBlogComments = async (blogId) => {
    try {
        const {data} = await API.get(`/blogapi/v1/comments/${blogId}`);
        toast.success(data.message);
        return data?.docs;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const addComment = async (blogId, commentData) => {
    try {
        const {data} = await API.post(`/blogapi/v1/comments/${blogId}`, commentData);
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const deleteComment = async (commentId) => {
    try {
        const {data} = await API.delete(`/blogapi/v1/comments/${commentId}`);
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}