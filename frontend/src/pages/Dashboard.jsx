import React, { useEffect } from 'react';
import { useGetUserBlogs } from '@/hooks/blogs.hook';
import Card from '@/components/Card';
import { useNavigate } from 'react-router-dom';
import authSlice from '@/store/authSlice';
import { useUserProfile } from '@/hooks/user.hook';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const authorized = useSelector((state) => state.auth);
  if(authorized.status){
    console.log('User is authorized');
  }
  else{
    console.log('User is not authorized');
  }
  const { data: user } = useUserProfile();
  // console.log(user);

  const { mutateAsync: fetchEM,variables,status,isPending} = useGetUserBlogs();
  // const navigate = useNavigate();

  const fetchBlogs = async () => {
    if (user?.data?._id) {
      console.log(user?.data?._id);
      const userId = user?.data?._id;
      const trp = await fetchEM(userId,1,10);
      if(trp)
      console.log(trp);
      console.log(variables);
      
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      This is dashboard
    </div>
  );
};

export default Dashboard;
