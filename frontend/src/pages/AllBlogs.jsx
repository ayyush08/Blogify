import React, { useEffect } from 'react'
import { useGetAllBlogs } from '@/hooks/blogs.hook'
const AllBlogs = () => {
    const { data, error, isLoading,isFetching } = useGetAllBlogs();
    if(isFetching)
        return <div>Fetching...</div>
    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        console.log(error);
        
    }
    // const {docs} = data
    console.log(data.docs);
    
    return (
        <div>
            These are all blogs
        </div>
    )
}

export default AllBlogs
