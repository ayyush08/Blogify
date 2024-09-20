import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BlogSkeleton from '@/components/ui/BlogSkeleton';
import { useGetBlogById } from '@/hooks/blogs.hook';
import { Toaster } from 'react-hot-toast';
const Blog = () => {
    const comments = ["comment1", "comment2", "comment3"];
    const { id } = useParams();
    const { data, error, isLoading, isFetching } = useGetBlogById(id);
    if (data)
        console.log(data);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);
    const { title, content, description, thumbnail, ownerDetails } = { ...data };
    if (isLoading || isFetching) {
        return <BlogSkeleton />;
    }
    if (error) {
        return <div>An error occurred while fetching blog.</div>;
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        console.log('Comment submitted');
    }
    return (

        <div id='blog' className="bg-teal-100 dark:bg-teal-700 p-5 min-h-full">
            <Toaster />
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl md:text-5xl uppercase tracking-wide font-extrabold  text-teal-900 dark:text-teal-300 text-center mb-5 font-mono">{title}</h1>
                    <div className="flex items-center mb-5 p-1 rounded-md transition-all hover:cursor-pointer hover:bg-teal-300 ">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden mr-4">
                            <img className="w-full h-full object-cover" src={ownerDetails.avatar} alt={ownerDetails.username} />
                        </div>
                        <p className="text-teal-900 dark:hover:text-black dark:text-teal-300 font-semibold font-motserrat hover:underline cursor-pointer">{ownerDetails.username}</p>
                    </div>
                    <img className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-5" src={thumbnail} alt={title} />
                    <p className="text-xl md:text-2xl text-slate-900 font-bold italic dark:text-teal-50 text-center mb-5">{description}</p>
                    <div className="prose dark:prose-dark max-w-none text-gray-900 dark:text-white text-lg">
                        {content}
                    </div>
                    {/* Comment Section */}
                    <div className="w-full mt-10 p-4 bg-teal-50 dark:bg-teal-800 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-teal-900 dark:text-teal-300 mb-4">Comments</h2>
                        <form onSubmit={handleCommentSubmit} className="mb-6">
                            <textarea
                                // value={commentText}
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
                            {comments?.length ? (
                                comments.map((comment) => (
                                    <div key={comment._id} className="p-3 border rounded-md bg-white dark:bg-teal-900 shadow-sm">
                                        <div className="flex items-center mb-2">
                                            <img
                                                // src={comment.uploader.avatar}
                                                // alt={comment.uploader.username}
                                                className="w-8 h-8 rounded-full mr-2 object-cover"
                                            />
                                            <span className="font-semibold text-teal-900 dark:text-teal-300">comment.uploader.username</span>
                                        </div>
                                        <p className="text-teal-800 dark:text-teal-200">comment.text</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-teal-900 dark:text-teal-300">No comments yet. Be the first to comment!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog
