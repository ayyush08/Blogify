import axios from 'axios';
import toast from 'react-hot-toast';

//NEED TO CONFIGURE TOKEN SESSIONS so that after expiration, user is logged out

export const registerUser = async (userData) => {
    try {
        const {data} = await axios.post('/api/users/register', userData);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}

export const loginUser = async (userData) => {
    try {
        const {data} = await axios.post('/api/users/login', userData);
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}

export const logoutUser = async () => {
    try {
        const {data} = await axios.post('/api/users/logout');
        toast.success(data.message);
        return data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error.response.data.message;
    }
}