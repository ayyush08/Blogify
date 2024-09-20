import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { getComments,addComment,deleteComment } from "../apis/comments.api.js";

const queryClient = useQueryClient();

export const useGetComments = (blogId) => {
    return useMutation({
        mutationFn: () => getComments(blogId),
        onError: (error) => {
            console.error('Error while fetching comments', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['current-blog-comments',blogId]);
        }
    }
    )
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

