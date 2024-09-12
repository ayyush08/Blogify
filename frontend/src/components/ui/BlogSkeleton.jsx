import React from 'react';

const BlogSkeleton = () => {
    return (
        <div className="p-10 bg-teal-50 dark:bg-black h-full animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
        </div>
    );
};

export default BlogSkeleton;
