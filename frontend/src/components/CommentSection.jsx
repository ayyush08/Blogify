import React, { useEffect, useState } from 'react'
import { useGetComments,useAddComment } from '@/hooks/comments.hook';
const CommentSection = ({blogId}) => {
    const { data: commentsData, error: commentsError, isLoading: commentsLoading } = useGetComments(blogId);
    const [commentText, setCommentText] = useState('');
    const {mutateAsync:addComment,isPending,isError} = useAddComment();
    const handleCommentSubmit = async(e) => {
        e.preventDefault();
        console.log(commentText);
        const comment = await addComment({blogId,commentText}); 
        console.log('Comment submitted',comment);
    }
    if (commentsData) console.log(commentsData.map((comm) => comm.comment));
    if(commentsLoading) {
        console.log('Comments are loading');
        
    }
    useEffect(()=>{
        console.log('Comments are pending',isPending);

        
    },[isPending])
    return (
        <div className="w-full mt-10 p-4 bg-teal-50 dark:bg-teal-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-teal-900 dark:text-teal-300 mb-4">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-3 rounded-lg border border-teal-300 dark:border-teal-600 dark:bg-teal-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows="4"
                />
                <button
                    type="submit"
                    className="mt-3 px-6 py-2 bg-teal-600 text-white rounded-md shadow-md hover:bg-teal-700 transition"
                >
                    Post Comment
                </button>
            </form>

            {/* Display Recent Comments */}
            <div className="space-y-4">
                {commentsData?.length ? (
                    commentsData.map((comment) => (
                        <div key={comment._id} className="p-3 border rounded-md bg-white dark:bg-teal-900 shadow-sm">
                            <div className="flex items-center mb-2">
                                <img
                                    src={comment.ownerDetails.avatar}
                                    alt={comment.ownerDetails.username}
                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                />
                                <span className="font-semibold text-teal-900 dark:text-teal-300">{comment.ownerDetails.username}</span>
                            </div>
                            <p className="text-teal-800 dark:text-teal-200">{comment.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-teal-900 dark:text-teal-300">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    )
}

export default CommentSection
