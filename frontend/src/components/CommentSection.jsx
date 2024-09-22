import React, { useEffect, useState } from 'react'
import { useGetComments, useAddComment } from '@/hooks/comments.hook';
import toast from 'react-hot-toast';
import SingleComment from './SingleComment';
import { set, useForm } from 'react-hook-form';
const CommentSection = ({ blogId }) => {
    const [page, setPage] = useState(1);
    const [comments, setComments] = useState([]);
    const { data: commentsData, error: commentsError, isLoading: commentsLoading } = useGetComments(blogId,page);
    const { register, handleSubmit, reset, isSubmitting, formState: { errors } } = useForm()
    const { mutateAsync: addComment, isPending:isAdding, isError } = useAddComment();
    const handleCommentSubmit = async (data) => {
        const {commentText} = data;
        const comment = await addComment({ blogId, commentText });
        console.log('Comment submitted', comment);
    }
    if (commentsLoading) {
        console.log('Comments are loading');

    }
    useEffect(() => {
        if (commentsData) {
            if (page === 1) {
                // For the initial page, replace the comments
                setComments(commentsData);
            } else {
                // For subsequent pages, append the new comments
                if (commentsData.length > 0) {
                    setComments(prevComments => [...prevComments, ...commentsData]);
                } else {
                    toast.success("That's all 😀");
                }
            }
        }
    }, [commentsData, page]);
    const handleShowMore = (e) => {
        e.preventDefault();
        console.log('Show more clicked');
        setPage(prevPage => prevPage + 1);
    }
    return (
        <div className="w-full mt-10 p-4 bg-teal-50 dark:bg-teal-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-teal-900 dark:text-teal-300 mb-4">Comments</h2>
            <form onSubmit={handleSubmit(handleCommentSubmit)} className="mb-6">
                <textarea
                    {...register('commentText', { required: true, minLength: 1 })}
                    placeholder="Write a comment..."
                    className="w-full p-3 rounded-lg border border-teal-300 dark:border-teal-600 dark:bg-teal-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows="4"
                />
                {errors.commentText && <p className="text-red-500 font-bold">Comment cannot be empty</p>}
                <button
                    type="submit"
                    className="mt-3 px-6 py-2 bg-teal-600 text-white rounded-md shadow-md hover:bg-teal-700 transition"
                    disabled={isAdding}
                >
                    {isAdding ? 'Posting...' : 'Post Comment'}
                </button>
            </form>

            {/* Display Recent Comments */}
            <div className="space-y-4">
                {comments?.length  >0 ? (
                    comments.map((comment) => (
                        <SingleComment key={comment._id} comment={comment} />
                    ))
                ) : (
                    <p className="text-teal-900 dark:text-teal-300">No comments yet. Be the first to comment!</p>
                )}
            </div>
            {commentsData?.length >0  && <div className='flex justify-center '>
                <button 
                    onClick={handleShowMore} 
                    className='px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700 transition duration-300'
                    disabled={commentsLoading}
                >
                    {commentsLoading ? 'Loading...' : 'Show More'}
                </button>
            </div>}
        </div>
    )
}

export default CommentSection
