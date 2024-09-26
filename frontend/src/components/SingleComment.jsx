import React, { useEffect, useState } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { useDeleteComment } from '@/hooks/comments.hook';
import { useSelector } from 'react-redux';
import CommentSkeleton from './ui/CommentSkeleton';
import Popup from './Popup';
import Tooltip from './ui/Tooltip';
const SingleComment = ({ comment, commentsLoading }) => {
    const authStatus = useSelector(state => state.auth);
    const commenter = comment.ownerDetails._id;
    const isAuthorized = authStatus?.userData?.data?.user?._id === commenter;
    console.log('Is Authorized', isAuthorized);
    const { mutateAsync: deleteComment, isPending, isError } = useDeleteComment();
    const handleDeleteComment = () => {
        const deletedComment = deleteComment({ commentId: comment._id });
        console.log('Deleted comment', deletedComment);
    }
    if (commentsLoading) {
        return <CommentSkeleton />
    }
    useEffect(()=>{
        if (isError) {
            console.error('Error while deleting comment', isError);
        }
        if (isPending) {
            console.log('Deleting comment...');
        }

    },[isError,comment,isPending,deleteComment])
    return (
        <div className="p-3 border rounded-md bg-white dark:bg-teal-900 shadow-sm font-motserrat">
            <div className="flex items-center mb-2">
                <img
                    src={comment.ownerDetails.avatar}
                    alt={comment.ownerDetails.username}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <span className="font-medium text-teal-900 dark:text-white font-motserrat">{comment.ownerDetails.username}</span>
            </div>
            <p className="text-teal-800 dark:text-white text-lg font-semibold text-center font-sans">{comment.comment}</p>

            <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-teal-600 cursor-pointer dark:text-white">Created At:  {new Date(comment.createdAt).toLocaleString()}</span>
                {isAuthorized && (
                    <Popup 
                    trigger={
                        <Tooltip text="Delete this comment"> {/* Tooltip wrapping the button */}
                            <button
                                className="text-red-500 dark:text-red-400"
                                
                            >
                                <RiDeleteBinLine />
                            </button>
                        </Tooltip>
                    }
                    title={"Are you sure, you want to delete this comment?"}
                    description={"This action cannot be undone."}
                    action={"Delete"}
                    cancel={"Cancel"}
                    handleDeleteComment={handleDeleteComment}
                    >
                            </Popup>
                )}
            </div>
        </div>
    )
}

export default SingleComment
