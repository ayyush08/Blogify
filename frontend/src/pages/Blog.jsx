import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetBlogById } from '@/hooks/blogs.hook';
const Blog = () => {
    const {id} = useParams();
    const {data, error, isLoading,isFetching} = useGetBlogById(id);
    // const {title, content,description,thumbnail} = data;
    if(isLoading || isFetching){
        return <div>Loading...</div>;
    }
    if(error){
        return <div>An error occurred while fetching blog.</div>;
    }
    console.log(data);
    
    return (
        <div>
            <h1>Blog Page</h1>
        </div>
    )
}

export default Blog
