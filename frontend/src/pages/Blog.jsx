import React from 'react'
import { useParams } from 'react-router-dom'
import BlogSkeleton from '@/components/ui/BlogSkeleton';
import { useGetBlogById } from '@/hooks/blogs.hook';
const Blog = () => {
    const {id} = useParams();
    const {data, error, isLoading,isFetching} = useGetBlogById(id);
    console.log(data);
    
    const {title, content,description,thumbnail,ownerDetails} = {...data};
    if(isLoading || isFetching){
        return <div>Loading...</div>;
    }
    if(error){
        return <div>An error occurred while fetching blog.</div>;
    }

    
    return (
        <div className="bg-teal-100 dark:bg-[#03524c] p-5 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl md:text-5xl uppercase tracking-wide font-extrabold  text-teal-900 dark:text-teal-300 text-center mb-5 font-mono">{title}</h1>
                    <div className="flex items-center mb-5">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden mr-4">
                            <img className="w-full h-full object-cover" src={ownerDetails.avatar} alt={ownerDetails.username} />
                        </div>
                        <p className="text-teal-900 dark:text-teal-300 font-motserrat hover:underline cursor-pointer">{ownerDetails.username}</p>
                    </div>
                    <img className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-5" src={thumbnail} alt={title} />
                    <p className="text-lg md:text-xl text-teal-900 font-bold italic dark:text-teal-300 text-center mb-5">{description}</p>
                    <div className="prose dark:prose-dark max-w-none text-gray-900 dark:text-teal-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea recusandae, deleniti repudiandae quia obcaecati quaerat officiis? Provident voluptates dolorem nostrum expedita voluptatem at beatae illum autem et veniam quaerat consectetur eveniet praesentium necessitatibus vero facere totam, laborum nesciunt voluptatibus! Ratione, ipsa esse, amet autem, nisi molestias fuga beatae est quisquam iste rerum praesentium eligendi reiciendis aut omnis quam. Deleniti dolores quasi atque iusto nisi, ad quaerat ipsa dolorum dolore eligendi fugit rerum et eum quis, expedita molestias repudiandae amet eaque, facilis tempora earum culpa. Doloribus dolore libero nobis, animi repudiandae voluptates commodi, at saepe et aliquam voluptatibus error accusamus ex?
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog
