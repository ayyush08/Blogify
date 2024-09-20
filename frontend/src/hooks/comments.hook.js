import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { getBlogComments,addComment,deleteComment } from "../apis/comments.api.js";

export const useGetComments = (blogId) => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ['current-blog-comments',blogId],
        queryFn: () => getBlogComments(blogId),
        staleTime: 1000*60*5,
        cacheTime: 1000*60*5,
        onError: (error) => {
            console.error('Error while fetching comments', error);
        },
        keepPreviousData: true,
    })
}

export const useAddComment = (blogId) => {
    return useMutation({
        mutationFn: (commentData) => addComment(blogId, commentData),
        onError: (error) => {
            console.error('Error while adding comment', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['current-blog-comments',blogId]);
        }
    })
}

export const useDeleteComment = () => {
    return useMutation(
        {
            mutationFn: ({commentId}) => deleteComment(commentId),
            onSuccess: () => {
                queryClient.invalidateQueries(['current-blog-comments',commentId]);
            },
            onError: (error) => {
                console.error('Error while deleting comment', error);
            }
        }
    )
}

