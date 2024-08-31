import axios from "axios";
import toast from "react-hot-toast";


export const getBlogLikes = async (blogId) => {
    try {
        const {data} = await axios.get(`/api/likes/${blogId}`);
        toast.success(data.message);
        return data?.likes;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}

export const toggleBlogLike = async (blogId) => {
    try {
        const {data} = await axios.post(`/api/likes/${blogId}`);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}

export const toggleCommentLike = async (commentId) => {
    try {
        const {data} = await axios.post(`/api/likes/${commentId}`);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}