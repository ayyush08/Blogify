import React from 'react';
import Card from './Card';
import { useLocation } from 'react-router-dom';
import { MdEditSquare } from "react-icons/md";
const UserProfileDashboard = ({ user, blogs }) => {
    const handleCardClick = (id) => {
        
        navigate(`/blog/${id}`);
        console.log('card clicked', id);
        
    }
    return (
        <div className="bg-teal-100 dark:bg-teal-900 text-gray-900 dark:text-gray-100 min-h-screen p-4">
            <div className="container mx-auto">
                
                {/* Profile Section */}
                <div className="flex items-center justify-center mb-6 relative">
                    <div className="flex items-center justify-center p-5 rounded-lg bg-white dark:bg-gray-800 w-[20vw]  space-x-5">
                        <img className="h-20  w-20 rounded-full" src={user.avatar} alt="User Profile" />
                        <div>
                            <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400 font-motserrat">{user.fullName}</h2>
                            <p className="text-gray-600 dark:text-gray-500 font-motserrat text-sm">@{user.username}</p>
                        </div>
                    </div>
                    <button className='absolute left-[54.7%] p-1 rounded-lg scale-90 top-[-12px] font-bold dark:text-white bg-cyan-400 flex gap-1 justify-center items-center dark:bg-emerald-700'>Edit Profile<MdEditSquare/></button>
                </div>

                {/* Blogs Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-teal-600 dark:text-teal-400 text-center font-motserrat">{user.fullName}'s Blogs</h3>
                    <div className="flex flex-col flex-wrap md:gap-5 gap-3 justify-center items-center md:flex-row p-10">
                        {
                            blogs.map((blog) => (
                                
                                <Card onClick={()=>handleCardClick(blog._id)} key={blog._id} {...blog} />))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileDashboard;
