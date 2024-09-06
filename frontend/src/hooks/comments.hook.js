import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { getComments,addComment,deleteComment } from "../apis/comments.api.js";

const queryClient = useQueryClient();

export const useGetComments = (blogId) => {
    return useMutation(
        {
            queryKey: ['current-blog-comments',blogId],
            queryFn: () => getComments(blogId),
            onSuccess: () => {
                queryClient.invalidateQueries(['comments',blogId]);
            },
            onError: (error) => {
                console.error('Error while fetching comments', error);
            }
        }
    )
}

export const useAddComment = (blogId) => {
    return useMutation(
        (commentData) => addComment(blogId,commentData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['current-blog-comments',blogId]);
            },
            onError: (error) => {
                console.error('Error while adding comment', error);
            }
        }
    )
}

export const useDeleteComment = (commentId) => {
    return useMutation(
        {
            mutationFn: () => deleteComment(commentId),
            onSuccess: () => {
                queryClient.invalidateQueries(['current-blog-comments',commentId]);
            },
            onError: (error) => {
                console.error('Error while deleting comment', error);
            }
        }
    )
}

