import { useQueryClient,useMutation,useQuery } from "@tanstack/react-query";
import { getBlogLikes,toggleBlogLike,toggleCommentLike,getCommentLikes } from "../apis/likes.api";

export const useToggleBlogLike = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn:(blogId)=>toggleBlogLike(blogId),
            onSuccess: () => {
                queryClient.invalidateQueries(['current-blog-likes']);
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
    return useQuery({
        queryKey:['current-blog-likes',blogId],
        queryFn:()=>getBlogLikes(blogId),
        refetchOnWindowFocus:false,
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