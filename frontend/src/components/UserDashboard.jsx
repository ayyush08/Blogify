import React from 'react';

const UserProfileDashboard = ({ user, blogs }) => {
    // console.log(user, blogs);
    
    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-4">
            <div className="container mx-auto">
                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        <img className="w-16 h-16 rounded-full" src={user.avatar} alt="User Profile" />
                        <div>
                            <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400">{user.username}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Blogs Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-teal-600 dark:text-teal-400">User Blogs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow">
                                <h4 className="text-lg font-semibold mb-2">{blog.title}</h4>
                                <p className="text-gray-700 dark:text-gray-300">{blog.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileDashboard;
