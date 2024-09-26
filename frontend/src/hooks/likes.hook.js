import { useQueryClient,useMutation,useQuery } from "@tanstack/react-query";
import { getBlogLikes,toggleBlogLike,toggleCommentLike,getCommentLikes } from "../apis/likes.api";

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

export const useToggleCommentLike = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn:(commentId)=>toggleCommentLike(commentId),
            onSuccess: () => {
                queryClient.invalidateQueries(['current-blog-comments']);
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

export const useGetCommentLikes = (commentId) => {
    return useQuery({
        queryKey:['current-comment-likes',commentId],
        queryFn:()=>getCommentLikes(commentId),
}
    )
}