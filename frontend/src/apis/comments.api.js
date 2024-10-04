import axios from "axios";
import toast from "react-hot-toast";
import { API } from "@/constants";


export const getBlogComments = async (blogId,page) => {
    try {
        const {data} = await API.get(`/blogapi/v1/comments/${blogId}?page=${page}`);
        console.log(data?.message);
        
        return data?.data?.docs;
    } catch (error) {
        
        throw error?.response?.data?.message;
    }
}

export const addComment = async (blogId, content) => {
    try {
        const {data} = await API.post(`/blogapi/v1/comments/${blogId}`, content);
        toast.success(data?.message);
        return data.data;
    } catch (error) {
        toast.error("Failed to add comment");
        throw error?.response?.data?.message;
    }
}

export const deleteComment = async (commentId) => {
    try {
        const {data} = await API.delete(`/blogapi/v1/comments/${commentId}`);
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error("Failed to delete comment");
        throw error?.response?.data?.message;
    }
}