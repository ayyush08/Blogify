import React, { useEffect,useState } from 'react';
import { useGetUserBlogs } from '@/hooks/blogs.hook';
import Card from '@/components/Card';
import { useNavigate } from 'react-router-dom';
import authSlice from '@/store/authSlice';
import { useUserProfile } from '@/hooks/user.hook';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [userBlogs, setUserBlogs] = useState([]);
  const authorized = useSelector((state) => state.auth);
  const { data: user } = useUserProfile();
  const userId = user?.data?._id;
  console.log(userId);
  
  const { data: blogs, isLoading } = useGetUserBlogs(userId, page, limit);

  // Update userBlogs state when blogs data changes
  useEffect(() => {
    if (blogs) {
      setUserBlogs(blogs?.data?.docs);     
    }
    else{
      setUserBlogs([]);
    }
  }, [blogs]);

  // Authorization check
  useEffect(() => {
    if (authorized) {
      console.log('User is authorized');
    } else {
      console.log('User is not authorized');
    }
  }, [authorized]);
  console.log(user);
  if(isLoading){
    return <div>Loading...</div>
  }
  if(!blogs){
    return <div>No blogs found</div>
  }
  return (
    <div className='min-h-screen w-full'>
      {
        user.data.username
      }
    </div>
  );
};

export default Dashboard;
