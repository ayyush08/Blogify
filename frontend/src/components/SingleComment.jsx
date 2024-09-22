import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { useDeleteComment } from '@/hooks/comments.hook';
const SingleComment = ({comment}) => {
    return (
        <div className="p-3 border rounded-md bg-white dark:bg-teal-900 shadow-sm">
                            <div className="flex items-center mb-2">
                                <img
                                    src={comment.ownerDetails.avatar}
                                    alt={comment.ownerDetails.username}
                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                />
                                <span className="font-semibold text-teal-900 dark:text-teal-300">{comment.ownerDetails.username}</span>
                            </div>
                            <p className="text-teal-800 dark:text-teal-200">{comment.comment}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-teal-600 dark:text-teal-400">{new Date(comment.createdAt).toLocaleString()}</span>
                                <button className="text-red-500 dark:text-red-400">
                                    <RiDeleteBinLine />
                                </button>
                        </div>
                        </div>  
    )
}

export default SingleComment
