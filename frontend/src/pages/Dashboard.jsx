import React, { useEffect, useState } from 'react';
import { useGetUserBlogs } from '@/hooks/blogs.hook';
import Card from '@/components/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserProfile } from '@/hooks/user.hook';
import { useSelector } from 'react-redux';
import { MdEditSquare } from "react-icons/md";
import toast from 'react-hot-toast';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
const Dashboard = () => {
  const queryClient = new QueryClient();
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
  const [userBlogs,setUserBlogs] = useState(null)
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);
  const { data, isLoading, isError } = useUserProfile(!isLoggedInUser?routedUserId:null);
  const { data: blogs, isLoading: blogsLoading } = useGetUserBlogs(userIdToFetch, page, limit);
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
    
  }, []);
  useEffect(() => {
    if (blogs?.docs) {
      setUserBlogs((prevBlogs) => (page === 1 ? blogs.docs : [...prevBlogs, ...blogs.docs]));
      if (blogs.docs.length === 0 && page > 1) {
        toast.success("That's all 😀");
        setPage((prevPage) => Math.max(prevPage - 1, 1)); // Prevents decrementing beyond page 1
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
  // Fetch user blogs
  // Loading state
  if (userLoading || blogsLoading) {
    return <div>Loading...</div>;
  }

  // No blogs 
  if (!blogs) {
    return <div>No blogs found</div>;
  }



  return (
    (user&&userBlogs) && (
      <div className="min-h-screen w-full">
        <div className="bg-teal-100 dark:bg-teal-900 text-gray-900 dark:text-gray-100 min-h-screen p-6 md:p-10">
          <div className="container mx-auto">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-6 relative">
              <div className="flex flex-col md:flex-row items-center justify-center p-5 rounded-lg bg-white dark:bg-gray-800 w-full md:w-[20vw] space-x-0 md:space-x-5">
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
              <button className="absolute hover:shadow-xl transition-all md:left-[54.7%] p-1 rounded-lg scale-90 top-[-12px] font-bold dark:text-white bg-cyan-400 flex gap-1 justify-center items-center dark:bg-emerald-700">
                Edit Profile <MdEditSquare />
              </button>
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
              {userBlogs.length > 0 && (

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
