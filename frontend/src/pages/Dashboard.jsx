import React, { useEffect,useState } from 'react';
import { useGetUserBlogs } from '@/hooks/blogs.hook';
import Card from '@/components/Card';
import { useNavigate, useParams } from 'react-router-dom';
import authSlice from '@/store/authSlice';
import { useUserProfile } from '@/hooks/user.hook';
import UserProfileDashboard from '@/components/UserDashboard';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const {userId:routedUserId} = useParams();
  const storedUser = useSelector(state=> state.auth);
  const loggedInUser = storedUser?.userData?.data?.user?._id;
  const isLoggedInUser = routedUserId === loggedInUser;
  const userIdToFetch = isLoggedInUser ? loggedInUser : routedUserId ;
  console.log(userIdToFetch);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);
  useEffect(() => {
    if (!isLoggedInUser) {
      const fetchUserProfile = () => {
        try {
          const { data, isLoading, isError } = useUserProfile(routedUserId);
          setUser(data?.user);
          setUserLoading(isLoading);
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
  // Fetch user blogs
  const { data: blogs, isLoading: blogsLoading } = useGetUserBlogs(userIdToFetch, page, limit);


  console.log(blogs);
  // console.log(storedUser?.userData?.data?.user);
  // Loading state
  if (userLoading || blogsLoading) {
    return <div>Loading...</div>;
  }

  // No blogs found
  if (!blogs) {
    return <div>No blogs found</div>;
  }
  
  
  
  return (
    <div className='min-h-screen w-full'>
      <UserProfileDashboard user={user} blogs={blogs?.docs} />
    </div>
  );
};

export default Dashboard;
