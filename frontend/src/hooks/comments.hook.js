import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { getBlogComments,addComment,deleteComment } from "../apis/comments.api.js";

export const useGetComments = (blogId,page) => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ['current-blog-comments',blogId,page],
        queryFn: () => getBlogComments(blogId,page),
        staleTime: 1000*60*5,
        cacheTime: 1000*60*5,
        onError: (error) => {
            console.error('Error while fetching comments', error);
        },
        onSuccess: (data) => {
            if (data.docs.length === 0) {
                queryClient.setQueryData(['current-blog-comments',blogId,page],(oldData)=>({
                    ...oldData,
                    docs: []
                }))
            }
        },
        enabled: !!blogId
    })
}

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({blogId,commentText}) => addComment(blogId, {content: commentText}),
        onError: (error) => {
            console.error('Error while adding comment', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['current-blog-comments']);
        }
    })
}

export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: ({commentId}) => deleteComment(commentId),
            onSuccess: () => {
                queryClient.invalidateQueries(['current-blog-comments']);
            },
            onError: (error) => {
                console.error('Error while deleting comment', error);
            }
        }
    )
}

