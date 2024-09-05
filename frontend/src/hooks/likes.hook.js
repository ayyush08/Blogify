import { useQueryClient,useMutation,useQuery } from "@tanstack/react-query";
import { getBlogLikes,toggleBlogLike,toggleCommentLike } from "../apis/likes.api";

export const useToggleBlogLike = (blogId) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn:()=>toggleBlogLike(blogId),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey:['current-blog-likes',blogId]});
            },
        }
    )
}

export const useToggleCommentLike = (commentId) => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn:()=>toggleCommentLike(commentId),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey:['current-comment-likes',commentId]});
            },
        }
    )
}

export const useGetBlogLikes = (blogId) => {
    const queryClient = useQueryClient();
    return useQuery(
        ['current-blog-likes',blogId],
        ()=>getBlogLikes(blogId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey:['current-blog-likes',blogId]});
            },
            onError: (error) => {
                console.error('Error while fetching blog likes', error);
            }
        }
    )
}