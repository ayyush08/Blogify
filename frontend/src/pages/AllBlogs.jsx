import React, { useEffect } from 'react'
import { useGetAllBlogs } from '@/hooks/blogs.hook'
import { data } from 'autoprefixer';
const AllBlogs = () => {
    const { data, error, isLoading,isFetching } = useGetAllBlogs();
    if(isFetching)
        console.log("Fetching");
    if(isLoading) console.log("Loading..");
    if(error){
        console.log(error);
        
    }
    console.log(data.docs);
    
    return (
        <div>
            These are all blogs
        </div>
    )
}

export default AllBlogs
