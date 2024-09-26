import React, { useEffect,useState } from 'react'
import { useGetAllBlogs } from '@/hooks/blogs.hook'
import Card from '@/components/Card'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const AllBlogs = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [blogs, setBlogs] = useState([]);
    const { data, error, isLoading,isFetching } = useGetAllBlogs(page,limit);
    const navigate = useNavigate();
    useEffect(() => {
        if (data?.docs) {
            if (page === 1) {
                // For the initial page, replace the blogs
                setBlogs(data.docs);
            } else {
                if(data?.docs.length>0)
                // For subsequent pages, append the new blogs
                setBlogs(prevBlogs => [...prevBlogs, ...data.docs]);
                else{
                    // setPage(1);
                    toast.success("That's all 😀")
                }
            }
        }       
    }, [data, page]);
    const handleShowMore = (e) => {
        console.log('Show more clicked');
        
        e.preventDefault();
        setPage(prevPage => prevPage + 1);
    };

    const handleCardClick = (id) => {
        
        navigate(`/blog/${id}`);
        console.log('card clicked', id);
        
    }
    if(error){
        console.log(error);
        return <div className="text-red-500">An error occurred while fetching blogs.</div>;
    }
    
    return (
        <section className='bg-teal-50 dark:bg-teal-800 p-5'>
        <div className='flex flex-col flex-wrap md:gap-5 gap-3 justify-center items-center md:flex-row p-10'> 
        {
            blogs.map((blog) => (
                
                <Card onClick={()=>handleCardClick(blog._id)} key={blog._id} {...blog} isFetching={isFetching} isLoading={isLoading} />))
            }

            </div>
            {data?.docs.length>0 && (<div className='flex justify-center '>
                <button 
                    onClick={handleShowMore} 
                    className='px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700 transition duration-300'
                    disabled={isFetching}
                >
                    {isFetching ? 'Loading...' : 'Show More'}
                </button>
            </div>)}
        </section>

    )
}

export default AllBlogs
