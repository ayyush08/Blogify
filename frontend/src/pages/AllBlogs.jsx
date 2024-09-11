import React, { useEffect,useState } from 'react'
import { useGetAllBlogs } from '@/hooks/blogs.hook'
import Card from '@/components/Card'
const AllBlogs = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data, error, isLoading,isFetching } = useGetAllBlogs(page,limit);
    if(isFetching)
        return <div>Fetching...</div>
    if(isLoading){
        return <div>Loading...</div>
    }
    if(error){
        console.log(error);
        
    }

    console.log(data);
    
    return (
        <>
        {
            data?.docs?.map((blog) => (
                <Card key={blog._id} {...blog} />))
        }
        </>

    )
}

export default AllBlogs
