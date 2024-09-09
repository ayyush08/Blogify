import React, { useEffect } from 'react'
import { useGetAllBlogs } from '@/hooks/blogs.hook'
import { data } from 'autoprefixer';
const AllBlogs = () => {
    const { data, error, isLoading } = useGetAllBlogs();
    console.log(data);
    
    return (
        <div>
            These are all blogs
        </div>
    )
}

export default AllBlogs
