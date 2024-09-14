import {useQuery,useQueryClient,useMutation} from '@tanstack/react-query'
import { registerUser,loginUser,logoutUser,getUserProfile } from '../apis/user.api'




export const useRegisterUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newUser) => registerUser(newUser)
    });
}

export const useLoginUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (userData)=>loginUser(userData),
        onSuccess: (userData) => {
            queryClient.invalidateQueries('current-user');
        },
        retry:0
    });
}  

export const useLogoutUser = () => {
    return useMutation(logoutUser, {
        onSuccess: () => {
            queryClient.cancelQueries('current-user');
        },
        onError: (error) => {
            console.error('Error while logging out a user',error);
        }
    });
}


export const useUserProfile = () => {
    return useQuery('current-user', getUserProfile, {
        onError: (error) => {
            console.error('Error while fetching user profile',error);
        }
    });
}