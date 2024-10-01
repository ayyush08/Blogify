import { getUserBlogs, getAllBlogs, updateBlog, uploadBlog, deleteBlog,getBlogById } from "../apis/blogs.api";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";


export const useGetUserBlogs = (userId,page=1,limit=10) => {
    return useQuery({
        queryKey: ['current-user-blogs',userId,page,limit],
        queryFn: ()=>getUserBlogs(userId,page,limit),
        staleTime: 1000*60*5,
        cacheTime: 1000*60*5,
        enabled: !!userId
        
    })
};

export const useGetAllBlogs = (page=1,limit=10) => {
    return useQuery({
        queryKey: ['all-blogs',page,limit],
        queryFn: ()=>getAllBlogs(page,limit),
        staleTime: 1000*60*5,
        cacheTime: 1000*60*5,
        
    });
};



export const useUploadBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (blogData) => uploadBlog(blogData),
        onSuccess: () => {
            queryClient.invalidateQueries('current-user-blogs');
    }}
    )
}

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: (blogId) => deleteBlog(blogId),
            onSuccess: () => {
                queryClient.invalidateQueries('current-user-blogs');
            }
            }
    )
}

export const useGetBlogById = (blogId) => {
    return useQuery({
        queryKey: ['current-user-blog', blogId],
        queryFn: () => getBlogById(blogId),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
        enabled: !!blogId
    });
};