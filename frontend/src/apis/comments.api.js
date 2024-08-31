import axios from "axios";
import toast from "react-hot-toast";

export const getBlogComments = async (blogId) => {
    try {
        const {data} = await axios.get(`/api/comments/${blogId}`);
        toast.success(data.message);
        return data?.docs;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}

export const addComment = async (blogId, commentData) => {
    try {
        const {data} = await axios.post(`/api/comments/${blogId}`, commentData);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}

export const deleteComment = async (commentId) => {
    try {
        const {data} = await axios.delete(`/api/comments/${commentId}`);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}