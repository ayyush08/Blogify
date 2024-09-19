import React, { useEffect, useState } from 'react';
import { useGetUserBlogs } from '@/hooks/blogs.hook';
import Card from '@/components/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserProfile } from '@/hooks/user.hook';
import { useSelector } from 'react-redux';
import { MdEditSquare } from "react-icons/md";
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { userId: routedUserId } = useParams();
  const navigate = useNavigate()
  const storedUser = useSelector(state => state.auth);
  const loggedInUser = storedUser?.userData?.data?.user?._id;
  const isLoggedInUser = routedUserId === loggedInUser;
  const userIdToFetch = isLoggedInUser ? loggedInUser : routedUserId;
  console.log(userIdToFetch);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);
  const { data, isLoading, isError } = useUserProfile(!isLoggedInUser?routedUserId:null);
  useEffect(() => {
    if (!isLoggedInUser) {
      const fetchUserProfile = () => {
        try {
          if(isLoading)
            setUserLoading(isLoading);
            setUser(data?.user);

        } catch (error) {
          setUserError(error);
        }
      };

      fetchUserProfile();
    } else {
      setUser(storedUser?.userData?.data?.user);
      setUserLoading(false);
    }
    
  }, [isLoggedInUser, routedUserId, storedUser?.userData?.data?.user]);
  const [userBlogs,setUserBlogs] = useState(null)
  useEffect(() => {
    if (blogs?.docs) {
      if (page === 1) {
        // For the initial page, replace the blogs
        setUserBlogs(blogs.docs);
      } else {
        if (blogs.docs.length > 0) {
          // For subsequent pages, append the new blogs
          setUserBlogs(prevBlogs => [...prevBlogs, ...blogs.docs]);
        } else {
          // If no data on the next page, revert to the previous page
          setPage(1);
          console.log('Thats all');
          
          toast.success("That's all")
        }
      }
    }
  }, [userBlogs, page]);
  const handleShowMore = (e) => {
      console.log('Show more clicked');
      
      e.preventDefault();
      setPage(prevPage => prevPage + 1);
  };
  const handleCardClick = (id) => {
      
      navigate(`/blog/${id}`);
      console.log('card clicked', id);
      
  }
  // Fetch user blogs
  const { data: blogs, isLoading: blogsLoading } = useGetUserBlogs(userIdToFetch, page, limit);
  // Loading state
  if (userLoading || blogsLoading) {
    return <div>Loading...</div>;
  }

  // No blogs found
  if (!blogs) {
    return <div>No blogs found</div>;
  }



  return (
    user && <div className='min-h-screen w-full'>
      <div className="bg-teal-100 dark:bg-teal-900 text-gray-900 dark:text-gray-100 min-h-screen p-10">
        <div className="container mx-auto">

          {/* Profile Section */}
          <div className="flex items-center justify-center mb-6 relative">
            <div className="flex items-center justify-center p-5 rounded-lg bg-white dark:bg-gray-800 w-[20vw]  space-x-5">
              <img className="h-20  w-20 rounded-full object-cover" src={user?.avatar} alt="User Profile" />
              <div>
                <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400 font-motserrat">{user.fullName}</h2>
                <p className="text-gray-600 dark:text-gray-400 font-motserrat text-sm">@{user.username}</p>
              </div>
            </div>
            <button className='absolute left-[54.7%] p-1 rounded-lg scale-90 top-[-12px] font-bold dark:text-white bg-cyan-400 flex gap-1 justify-center items-center dark:bg-emerald-700'>Edit Profile<MdEditSquare /></button>
          </div>

          {/* Blogs Section */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-teal-600 dark:text-teal-400 text-center font-motserrat">{user.fullName}'s Blogs</h3>
            <div className="flex flex-col flex-wrap md:gap-5 gap-3 justify-center items-center md:flex-row p-10">
              {
                blogs?.docs.map((blog) => (

                  <Card onClick={() => handleCardClick(blog._id)} key={blog._id} {...blog} />))
              }
            </div>
            <div className='flex justify-center '>
              <button
                onClick={handleShowMore}
                className='px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700 transition duration-300'
                disabled={blogsLoading}
              >
                {blogsLoading ? 'Loading BLogs...' : 'Show More'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
