import React, { useEffect, useState } from 'react'
import { QueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import { useGetBlogLikes, useToggleBlogLike } from '@/hooks/likes.hook';
import Tooltip from '@/components/ui/Tooltip';
import { setLikedBlogs } from '@/store/likesSlice';
import { updateDetails } from '@/store/authSlice';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import BlogSkeleton from '@/components/ui/BlogSkeleton';
import { useGetBlogById, useDeleteBlog } from '@/hooks/blogs.hook';
import CommentSection from '@/components/CommentSection';
import { Toaster, toast } from 'react-hot-toast';
import { RiDeleteBin5Fill } from "react-icons/ri";
import UniversalLoader from '@/components/ui/UniversalLoader';
import Popup from '@/components/Popup';
const Blog = () => {
    const { id } = useParams();
    const { data, error, isLoading: blogLoading, isFetching } = useGetBlogById(id);
    const { data: blogLikes, isLoading: likesLoading } = useGetBlogLikes(id);
    const { mutateAsync: likeBlog } = useToggleBlogLike();
    const { mutateAsync: deleteBlog, isPending: deletingBlog } = useDeleteBlog();
    const likedCheck = useSelector(state => state.likes);
    const currentUserId = useSelector(state => state.auth?.userData?._id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = new QueryClient();
    const checkLike = likedCheck.likedBlogs.some(like => like.blogId === id && like.liker === currentUserId);
    const [isLiked, setIsLiked] = useState(checkLike);
    const [blogLikeCount, setBlogLikeCount] = useState(blogLikes || 0);
    const { title, content, description, thumbnail, ownerDetails } = { ...data };

    const handleLike = async () => {
        try {
            await likeBlog(id);
            if (!isLiked) {
                setIsLiked(true);
                setBlogLikeCount((prevCount) => prevCount + 1);
                dispatch(setLikedBlogs({ blogId: id, type: 'add', liker: currentUserId }));
            }
            else {
                setIsLiked(false);
                setBlogLikeCount((prevCount) => prevCount - 1);
                dispatch(setLikedBlogs({ blogId: id, type: 'remove', liker: currentUserId }));
            }
        } catch (error) {
            console.error('Error while liking blog', error);
            setIsLiked(false);

        }

    }
    const handleDeleteBlog = async () => {
        try {
            toast.loading('Deleting blog...');
            await deleteBlog(id);
            toast.dismiss();
            toast.success('Blog deleted successfully');

            // Invalidate blog queries
            queryClient.invalidateQueries(['current-user-blog', id]);
            
            navigate(`/dashboard/${currentUserId}`, { replace: true });
        } catch (error) {
            console.error('Error while deleting blog', error);
            toast.error('Failed to delete blog');
        }

    }
    useEffect(() => {
        let isMounted = true;
        if (id && isMounted) {
            window.scrollTo(0, 0);
        }
        const currentLikeStatus = likedCheck.likedBlogs.some(
            (like) => like.blogId === id && like.liker === currentUserId
        );
        if (isMounted) {
            setIsLiked(currentLikeStatus);

        }
        return () => {
            isMounted = false;
        }
    }, [id, currentUserId, dispatch, navigate]);

    if (blogLoading && isFetching) {
        return (<BlogSkeleton />)
    }
    if (error) {
        return <div>An error occurred while fetching blog.</div>;
    }

    return (

        <div id='blog' className="bg-teal-100  dark:bg-teal-700 p-5 min-h-full">
            <Toaster />
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl uppercase tracking-wide font-extrabold  text-teal-900 dark:text-teal-300 text-center mb-5 font-mono underline">{title}</h1>

                    <div className="flex items-center justify-between w-full mb-5 p-2 rounded-md transition-all hover:cursor-pointer ">
                        {/* User Avatar and Username on the left */}
                        <Tooltip text={`${ownerDetails.username}`}>

                            <Link to={`/dashboard/${ownerDetails._id}`} className="flex items-center hover:scale-110 transition-all hover:bg-gray-500/20 dark:hover:bg-gray-50/10 rounded-md p-1 font-motserrat">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                    <img className="w-full h-full object-cover" src={ownerDetails.avatar} alt={ownerDetails.username} />
                                </div>
                                <p className="text-teal-900 dark:text-teal-300 font-semibold">
                                    {ownerDetails.username}
                                </p>
                            </Link>
                        </Tooltip>

                        {/* Like Button on the far right */}
                        <div className="flex gap-5 items-center justify-center transition-all font-motserrat">
                            <div className='flex items-center gap-2 justify-center hover:scale-110 '>

                                <Tooltip text={isLiked ? "Unlike this blog" : "Like this blog"}>
                                    <button
                                        onClick={() => handleLike()}
                                        className="text-teal-600 dark:text-white transition-all transform  focus:outline-none"
                                    >
                                        {isLiked ? <AiFillLike size={24} /> : <AiOutlineLike size={24} />}
                                    </button>
                                </Tooltip>
                                {likesLoading ? <span>Loading...</span> : <span>{blogLikeCount}</span>}
                            </div>
                            {currentUserId === ownerDetails._id &&
                            <Popup trigger={
                             <Tooltip text="Delete this blog">
                                <button  className='text-red-500 bg-red-100/30 rounded-sm p-1  scale-125 hover:scale-150 transition-all'>
                                    <RiDeleteBin5Fill />
                                </button>
                            </Tooltip>}
                            title="Delete Blog"
                            description="Are you sure you want to delete this blog?"
                            cancel="Cancel"
                            action="Delete"
                            handleDelete={handleDeleteBlog}
                            ></Popup>}
                        </div>
                    </div>

                    <img className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-5" src={thumbnail} alt={title} />
                    <p className="text-xl md:text-2xl text-slate-900 font-bold italic dark:text-teal-50 text-center mb-5">{description}</p>
                    <div className="prose dark:prose-dark max-w-none text-gray-900 dark:text-white text-lg">
                        {content}
                    </div>
                    {/* Comment Section */}
                    <CommentSection blogId={id} />
                </div>
            </div>

        </div>
    );
};

export default Blog
