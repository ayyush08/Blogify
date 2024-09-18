import React from 'react';
import Card from './Card';
const UserProfileDashboard = ({ user, blogs }) => {
    // console.log(user, blogs);
    const handleCardClick = (id) => {
        
        navigate(`/blog/${id}`);
        console.log('card clicked', id);
        
    }
    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4">
            <div className="container mx-auto">
                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-center space-x-4">
                        <img className="h-20  w-20 rounded-full" src={user.avatar} alt="User Profile" />
                        <div>
                            <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400">{user.username}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Blogs Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-teal-600 dark:text-teal-400">User Blogs</h3>
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
