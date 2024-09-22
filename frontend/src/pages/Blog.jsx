import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BlogSkeleton from '@/components/ui/BlogSkeleton';
import { useGetBlogById } from '@/hooks/blogs.hook';
import CommentSection from '@/components/CommentSection';
import { Toaster } from 'react-hot-toast';
const Blog = () => {
    const { id } = useParams();
    const { data, error, isLoading, isFetching } = useGetBlogById(id);
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

   
    return (
        
        <div id='blog' className="bg-teal-100  dark:bg-teal-700 p-5 min-h-full">
            <Toaster />
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl md:text-5xl uppercase tracking-wide font-extrabold  text-teal-900 dark:text-teal-300 text-center mb-5 font-mono">{title}</h1>
                    <div className="flex items-center  mb-5 p-2 rounded-md transition-all hover:bg-gray-400/30 hover:cursor-pointer dark:hover:bg-gray-50/10 ">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden mr-4">
                            <img className="w-full h-full object-cover" src={ownerDetails.avatar} alt={ownerDetails.username} />
                        </div>
                        <p className="text-teal-900  dark:text-teal-300 font-semibold font-motserrat  cursor-pointer">{ownerDetails.username}</p>
                    </div>
                    <img className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-5" src={thumbnail} alt={title} />
                    <p className="text-xl md:text-2xl text-slate-900 font-bold italic dark:text-teal-50 text-center mb-5">{description}</p>
                    <div className="prose dark:prose-dark max-w-none text-gray-900 dark:text-white text-lg">
                        {content}
                    </div>
                    {/* Comment Section */}
                    <CommentSection blogId={id}/>
                </div>
            </div>
    
        </div>
    );
};

export default Blog
