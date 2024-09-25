import { getUserBlogs, getAllBlogs, updateBlog, uploadBlog, deleteBlog,getBlogById } from "../apis/blogs.api";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";


export const useGetUserBlogs = (userId,page=1,limit=10) => {
    return useQuery({
        queryKey: ['current-user-blogs',userId,page,limit],
        queryFn: ()=>getUserBlogs(userId,page,limit),
        staleTime: 1000*60*5,
        cacheTime: 1000*60*5,
        keepPreviousData: true,
        
    })
};

export const useGetAllBlogs = (page=1,limit=10) => {
    return useQuery({
        queryKey: ['all-blogs',page,limit],
        queryFn: ()=>getAllBlogs(page,limit),
        staleTime: 1000*60*5,
        cacheTime: 1000*60*5
    });
};

export const useUpdateBlog = (blogId) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: (blogData) => updateBlog(blogId, blogData),
            onMutate: async (blogData) => {
                await queryClient.cancelQueries('current-user-blogs');
                const previousData = queryClient.getQueryData('current-user-blogs');
                queryClient.setQueryData('current-user-blogs', (oldBlogs) => {
                    return oldBlogs.map((blog) => {
                        if (blog._id === blogId) {
                            return blogData;
                        }
                        return blog;
                    });
                });
                return { previousData };
            },
            onError: (_error, _newData, context) => {
                queryClient.setQueryData('current-user-blogs', context.previousData);
            },
            onSettled: () => {
                queryClient.invalidateQueries('current-user-blogs');
        }
    }
    )
}

export const useUploadBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (blogData) => uploadBlog(blogData),
        onMutate: async (blogData) => {
            await queryClient.cancelQueries('current-user-blogs');
            const previousData = queryClient.getQueryData('current-user-blogs');
            console.log('Previous data:', previousData);
            if(previousData){
                queryClient.setQueryData('current-user-blogs', (oldBlogs) => {
                    return [blogData, ...oldBlogs];})
            }else{
                queryClient.setQueryData('current-user-blogs', [blogData]);
            }
            return { previousData };
        },
        onError: (error) => {
            console.log('Error while uploading blog', error);
            
        },
        onSettled: () => {
            queryClient.invalidateQueries('current-user-blogs');
        }
    }
    )
}

export const useDeleteBlog = (blogId) => {
    const queryClient = useQueryClient();

    return useMutation(
        () => deleteBlog(blogId),
        {
            onMutate: async (blogId) => {
                await queryClient.cancelQueries('current-user-blogs');
                const previousData = queryClient.getQueryData('current-user-blogs');
                queryClient.setQueryData('current-user-blogs', (oldBlogs) => {
                    return oldBlogs.filter((blog) => blog._id !== blogId);
                });
                return { previousData };
            },
            onError: (_error, _newData, context) => {
                queryClient.setQueryData('current-user-blogs', context.previousData);
            },
            onSettled: () => {
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
    });
};