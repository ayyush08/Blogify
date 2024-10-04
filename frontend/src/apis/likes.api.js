import axios from "axios";
import toast from "react-hot-toast";
import { API } from "@/constants";
export const getBlogLikes = async (blogId) => {
    try {
        const {data} = await API.get(`/blogapi/v1/likes/bloglikes/${blogId}`);
        console.log(data?.message);
        
        if(data?.data.length === 0){
            return 0;
        }
        
        return data?.data[0].likes;
    } catch (error) {
        throw error?.response?.data?.message;
    }
}
export const getCommentLikes = async (commentId) => {
    try {
        const {data} = await API.get(`/blogapi/v1/likes/commentlikes/${commentId}`);
        if(data?.data.length === 0){
            return 0;
        }
        return data?.data[0].likes;
    } catch (error) {
        throw error?.response?.data?.message;
    }
}

export const toggleBlogLike = async (blogId) => {
    try {
        const {data} = await API.post(`/blogapi/v1/likes/bloglikes/${blogId}`);
        toast.success(data?.message);
        return data;
    } catch (error) {
        throw error?.response?.data?.message;
    }
}

export const toggleCommentLike = async (commentId) => {
    try {
        const {data} = await API.post(`/blogapi/v1/likes/commentlikes/${commentId}`);
        toast.success(data?.message);
        return data;
    } catch (error) {
        throw error?.response?.data?.message;
    }
}