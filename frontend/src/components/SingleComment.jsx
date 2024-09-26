import React, { useEffect, useState } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { useDeleteComment } from '@/hooks/comments.hook';
import { useToggleCommentLike,useGetCommentLikes } from '@/hooks/likes.hook';
import { useSelector,useDispatch } from 'react-redux';
import CommentSkeleton from './ui/CommentSkeleton';
import { setLikedComments} from '@/store/likesSlice';
import Popup from './Popup';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Tooltip from './ui/Tooltip';
import { set } from 'react-hook-form';
const SingleComment = ({ comment, commentsLoading }) => {
    const {data:commentLikes,isLoading:likesLoading} = useGetCommentLikes(comment._id);
    const dispatch = useDispatch();
    const authStatus = useSelector(state => state.auth);
    const likedCheck = useSelector(state => state.likes);
    const checkLike = likedCheck.likedComments.map((like) => like.commentId).includes(comment._id);
    console.log('Comment Likes', likedCheck.likedComments);
    
    const commenter = comment.ownerDetails._id;
    const [isLiked, setIsLiked] = useState(null);
    const isAuthorized = authStatus?.userData?.data?.user?._id === commenter;
    console.log('Is Authorized', isAuthorized);
    const { mutateAsync: deleteComment, isPending, isError } = useDeleteComment();
    const { mutateAsync: likeComment, isPending: liking, isError: likeError } = useToggleCommentLike();
    const handleDeleteComment = async e => {
        e.preventDefault();
        try {
            const deletedComment = await deleteComment({ commentId: comment._id });
            console.log('Deleted comment', deletedComment);
        } catch (error) {
            console.log('Error while deleting comment', error);
            
        }
    }
    if (commentsLoading) {
        return <CommentSkeleton />
    }
    const handleLike =async e => {
        e.preventDefault();

        try {
            const liked = await likeComment(comment._id);
            if(!isLiked){
                dispatch(setLikedComments({commentId:comment._id,type:'add',commenter:authStatus.userData.data.user._id}));
                setIsLiked(true);
            }
            else{
                dispatch(setLikedComments({commentId:comment._id,type:'remove',commenter:authStatus.userData.data.user._id}));
                setIsLiked(false);
            }

        } catch (error) {
            console.error('Error while liking comment', error);
            setIsLiked(false);
        }
    

    }
    useEffect(() => {
        setIsLiked(checkLike);
    }, [checkLike,commentLikes])
    return (
        <div className="p-3 border rounded-md bg-white dark:bg-teal-900 shadow-sm font-motserrat">
            <div className="flex items-center justify-between mb-2">
                <div className='flex items-center gap-2'>

                    <img
                        src={comment.ownerDetails.avatar}
                        alt={comment.ownerDetails.username}
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <span className="font-medium text-teal-900 dark:text-white font-motserrat">{comment.ownerDetails.username}</span>
                </div>
                <div className='flex gap-2'>
                    <Tooltip text={isLiked ? "Unlike this comment" : "Like this comment"}>
                        <div> {/* Wrapper div to avoid nesting button inside button */}
                            <button
                                onClick={handleLike}
                                className="text-teal-600 dark:text-white transition-all scale-125"
                                
                            >
                                {isLiked ? <AiFillLike /> : <AiOutlineLike />}
                            </button>
                        </div>
                    </Tooltip>
                    {likesLoading ? <span>Loading...</span>:<span>{commentLikes}</span>}

                </div>

            </div>
            <p className="text-teal-800 dark:text-white text-lg font-semibold text-center font-sans">{comment.comment}</p>

            <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-teal-600 cursor-pointer dark:text-white">Created At:  {new Date(comment.createdAt).toLocaleString()}</span>
                {isAuthorized && (
                    <Popup
                        trigger={
                            <Tooltip text="Delete this comment">
                                <RiDeleteBinLine className='text-red-500' />
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
