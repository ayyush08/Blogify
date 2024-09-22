// CommentSkeleton.jsx
import React from 'react';

const CommentSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2 p-4 rounded-lg bg-gray-100 dark:bg-teal-700">
      {/* User Avatar Placeholder */}
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-teal-500"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-teal-500 rounded"></div>
          <div className="h-3 w-1/4 bg-gray-300 dark:bg-teal-600 rounded"></div>
        </div>
      </div>
      {/* Comment Text Placeholder */}
      <div className="space-y-2 mt-2">
        <div className="h-3 w-full bg-gray-300 dark:bg-teal-600 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-300 dark:bg-teal-600 rounded"></div>
        <div className="h-3 w-4/6 bg-gray-300 dark:bg-teal-600 rounded"></div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
