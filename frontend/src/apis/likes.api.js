import axios from "axios";
import toast from "react-hot-toast";
import {API} from "../utils/axiosInterceptor";

export const getBlogLikes = async (blogId) => {
    try {
        const {data} = await API.get(`/blogapi/v1/likes/${blogId}`);
        toast.success(data?.message);
        return data?.likes;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const toggleBlogLike = async (blogId) => {
    try {
        const {data} = await API.post(`/blogapi/v1/likes/${blogId}`);
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}

export const toggleCommentLike = async (commentId) => {
    try {
        const {data} = await API.post(`/blogapi/v1/likes/${commentId}`);
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data?.message;
    }
}