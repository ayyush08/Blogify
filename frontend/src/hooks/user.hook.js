import {useQuery,useQueryClient,useMutation} from '@tanstack/react-query'
import { registerUser,loginUser,logoutUser,getUserProfile } from '../apis/user.api'


const queryClient = useQueryClient()


export const useRegisterUser = () => {
    return useMutation(registerUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('current-user');
        },
        onError: (error) => {
            console.error('Error while registering a user',error);
        }
    });
}

export const useLoginUser = () => {
    return useMutation(loginUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('current-user');
        },
        onError: (error) => {
            console.error('Error while logging in a user',error);
        }
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