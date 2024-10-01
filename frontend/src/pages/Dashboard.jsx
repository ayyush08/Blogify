import React, { useEffect, useState } from 'react';
import { useGetUserBlogs } from '@/hooks/blogs.hook';
import Card from '@/components/Card';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useUserProfile } from '@/hooks/user.hook';
import { useSelector } from 'react-redux';

import toast from 'react-hot-toast';
import UniversalLoader from '@/components/ui/UniversalLoader';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { DialogDemo } from '@/components/Dialog';
const Dashboard = () => {
  const { userId: routedUserId } = useParams();
  const location = useLocation();
  
  const navigate = useNavigate()
  const storedUser = useSelector(state => state.auth);
  const loggedInUser = storedUser?.userData?._id;
  const currentUserData = storedUser?.userData;
  
  const isLoggedInUser = routedUserId === loggedInUser;
  const userIdToFetch = isLoggedInUser ? loggedInUser : routedUserId;
  console.log(userIdToFetch);
  const [page, setPage] = useState(1);
  const [userBlogs, setUserBlogs] = useState(null)
  const { data: otherUser, isLoading, isError } = useUserProfile(!isLoggedInUser ? routedUserId : null);
  const { data: blogs, isLoading: blogsLoading } = useGetUserBlogs(userIdToFetch, page);
  const user = isLoggedInUser ? currentUserData : otherUser?.data;
  console.log(user);
  console.log(location.pathname,loggedInUser);

  useEffect(() => {
    if (blogs?.docs) {
      if (page === 1) {
        // For the initial page, replace the blogs
        setUserBlogs(blogs.docs);
      } else {
        if (blogs?.docs.length > 0)
          // For subsequent pages, append the new blogs
          setUserBlogs(prevBlogs => [...prevBlogs, ...blogs.docs]);
        else {
          // setPage(1);
          toast.success("That's all 😀")
        }
      }
    }
  }, [blogs, page]);
  const handleShowMore = (e) => {
    e.preventDefault();
    console.log('Show more clicked');

    setPage(prevPage => prevPage + 1);
  };
  const handleCardClick = (id) => {

    navigate(`/blog/${id}`);
    console.log('card clicked', id);

  }

  if (blogsLoading) {
    return <div className='flex justify-center items-center min-h-screen'><UniversalLoader /></div>;
  }

  // No blogs 
  if (!blogs) {
    return <div>No blogs found</div>;
  }



  return (
    (user && userBlogs) && (
      <div className="min-h-screen w-full">
        <div className="bg-teal-100 dark:bg-teal-900 text-gray-900 dark:text-gray-100 min-h-screen p-6 md:p-10">
          <div className="container mx-auto">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-6 relative">
              <div className="flex flex-col md:flex-row items-center justify-center p-5 rounded-lg bg-white dark:bg-gray-800 w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] space-x-0 md:space-x-5 relative">
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src={user?.avatar}
                  alt="User Profile"
                />
                <div className="mt-3 md:mt-0">
                  <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400 font-motserrat text-center md:text-left">
                    {user.fullName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 font-motserrat text-sm text-center md:text-left">
                    @{user.username}
                  </p>
                </div>
              </div>
              {location.pathname === `/dashboard/${loggedInUser}` && (
                <div className="absolute top-[-14px] right-4 sm:right-[5.5rem] md:right-[8.5rem] lg:right-[22rem] lg:top-[-1rem]">
                  <DialogDemo
                    title={"Edit Profile"}
                    username={currentUserData.username}
                    email={currentUserData.email}
                    fullName={currentUserData.fullName}
                  />
                </div>
              )}


            </div>

            {/* Blogs Section */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-4 text-teal-600 dark:text-teal-400 text-center font-motserrat">
                {user.fullName}'s Blogs
              </h3>
              {userBlogs.length === 0 && <p className="text-center mt-10">Nothing yet... Maybe start writing?</p>}
              <div className="flex flex-col flex-wrap md:gap-5 gap-3 justify-center items-center md:flex-row p-10">
                {userBlogs.map((blog) => (
                  <Card
                    onClick={() => handleCardClick(blog._id)}
                    key={blog._id}
                    {...blog}
                    isFetching={blogsLoading}
                    isLoading={blogsLoading}
                  />
                ))}
              </div>
              {blogs?.docs.length > 0 && (

                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleShowMore}
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700 transition duration-300 w-full md:w-auto"
                    disabled={blogsLoading}
                  >
                    {blogsLoading ? 'Loading Blogs...' : 'Show More'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
