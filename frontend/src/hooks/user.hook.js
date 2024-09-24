import {useQuery,useQueryClient,useMutation} from '@tanstack/react-query'
import { registerUser,loginUser,logoutUser,getUserProfile,validateSession } from '../apis/user.api'



export const useSessionValidator = ()=>{
    return useQuery({
        queryKey: ['session-validator'],
        queryFn: () => validateSession(),
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
    });
}
export const useRegisterUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newUser) => registerUser(newUser),
        onError: (error) => {
            console.error('Error while registering', error);
        },
        onMutate: async (newUser) => {
            await queryClient.cancelQueries('current-user');
            const previousData = queryClient.getQueryData('current-user');
            queryClient.setQueryData('current-user', newUser);
            return { previousData };
        }
        });
}

export const useLoginUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (userData)=>loginUser(userData),
        onSuccess: (userData) => {
            queryClient.invalidateQueries('current-user');
        },
        onMutate: async (userData) => {
            await queryClient.cancelQueries('current-user');
            const previousData = queryClient.getQueryData('current-user');
            queryClient.setQueryData('current-user', userData);
            return { previousData };
        },
        retry:0
    });
}  

export const useLogoutUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:()=> logoutUser(),
        onSuccess: () => {
            queryClient.removeQueries('current-user');
        },
        retry:0,
        onError: (error) => {
            console.error('Error while logging out',error);
        }
    });
}


export const useUserProfile = (userId) => {
    return useQuery({
        queryKey: ['fetched-user', userId],
        queryFn: () => getUserProfile(userId),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
    });
}