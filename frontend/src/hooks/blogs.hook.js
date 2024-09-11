import { getUserBlogs, getAllBlogs, updateBlog, uploadBlog, deleteBlog } from "../apis/blogs.api";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

// const queryClient = useQueryClient();

export const useGetUserBlogs = (userId) => {
    return useMutation(
        () => getUserBlogs(userId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('current-user-blogs');
            },
            onError: (error) => {
                console.error('Error while fetching user blogs', error);
            }
        },
    )
};

export const useGetAllBlogs = (page=1,limit=10) => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ['all-blogs',page,limit],
        queryFn: ()=>getAllBlogs(page,limit),
    });
};

export const useUpdateBlog = (blogId) => {
    const queryClient = useQueryClient();
    return useMutation(
        (newData) => updateBlog(blogId, newData), {
        onMutate: async (newData) => {
            await queryClient.cancelQueries('current-user-blog');
            const previousData = queryClient.getQueryData('current-user-blog');
            queryClient.setQueryData('current-user-blog', (oldBlogs) => {
                return oldBlogs.map((blog) =>
                    blog._id === blogId ? { ...blog, ...newData } : blog
                );
            });
            return { previousData };
        },
        onError: (_error, _newData, context) => {
            queryClient.setQueryData('current-user-blog', context.previousData);
        },
        onSettled: () => {
            queryClient.invalidateQueries('current-user-blog');
        }
    }
    );
}

export const useUploadBlog = () => {
    const queryClient = useQueryClient();
    const userId = queryClient.getQueryData('current-user')._id;
    return useMutation(
        (blogData) => uploadBlog(userId, blogData),
        {
            onMutate: async (blogData) => {
                await queryClient.cancelQueries('current-user-blogs');
                const previousData = queryClient.getQueryData('current-user-blogs');
                queryClient.setQueryData('current-user-blogs', (oldBlogs) => {
                    return [...oldBlogs, blogData];
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