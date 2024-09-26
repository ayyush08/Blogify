import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUploadBlog } from '@/hooks/blogs.hook';
import toast from 'react-hot-toast';
const BlogWriter = () => {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(null);
  const [pageThumbnail, setPageThumbnail] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutateAsync: uploadBlog, isPending } = useUploadBlog();
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPageThumbnail(URL.createObjectURL(file));
      setThumbnail(file)
    }
  };

  const onSubmit = async (data) => {
    const blogData = new FormData();
    blogData.append('title', data.title);
    blogData.append('description', data.description);
    blogData.append('content', data.content);
    if (thumbnail) {
      blogData.append('thumbnail', thumbnail)
    }
    else {
      blogData.append('thumbnail', null)
    }
    console.log('Form data:', blogData);
    try {
      const uploadedBlog = await uploadBlog(blogData);
      console.log('inside try');

      if (isPending) {
        toast.loading('Uploading...')
      }
      if (uploadedBlog) {
        console.log(uploadedBlog);

        navigate(`/blog/${uploadedBlog._id}`);
        reset();
        setThumbnail(null);
      }
      else {
        console.log('inside else');

      }
    }
    catch (error) {
      toast.error('Failed to upload');
    }
    // Reset form after submission

    // Reset the thumbnail preview
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-motserrat bg-teal-50 dark:bg-teal-700 transition duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-600/50 p-6 rounded-lg shadow-lg shadow-teal-500/50">
        <h1 className="text-3xl text-teal-700 dark:text-teal-50 font-bold mb-6 text-center italic">
          Write a new Blog
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-teal-900 text-center dark:text-white">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              {...register('title', {
                required: { value: true, message: 'Title is required' },
                maxLength: { value: 100, message: 'Title should be less than 100 characters' }
              })}
              className={`w-full mt-2 p-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-teal-300 dark:border-teal-600'
                } bg-teal-50 dark:bg-teal-100 dark:placeholder:text-gray-500 font-mono dark:text-black focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-500`}
              placeholder="Enter your blog title"
            />
            {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          {/* Blog Description */}
          <div>
            <label htmlFor="description" className="block text-lg font-semibold text-center text-teal-900 dark:text-white">
              Blog Description
            </label>
            <textarea
              id="description"
              {...register('description', {
                required: { value: true, message: 'Description is required' },
                minLength: { value: 50, message: 'Description should be atleast 50 characters' }
              })}
              className={`w-full mt-2 p-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-teal-300 dark:border-teal-600'
                } bg-teal-50  dark:bg-teal-100 dark:text-black dark:placeholder:text-gray-500 font-mono focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-500`}
              rows="3"
              placeholder="Write a short description"
            />
            {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          {/* Blog Thumbnail */}
          <div>
            <label htmlFor="thumbnail" className="block text-lg font-semibold text-center text-teal-900 dark:text-white">
              Blog Thumbnail
            </label>
            {!thumbnail && (

              <div className="relative mt-4 w-full max-w-xs mx-auto ">
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                {...register('thumbnail', {
                  required: { value: true, message: 'Thumbnail is required' },
                  validate: (value) => value[0]?.size < 2000000 || 'Thumbnail size should be less than 2MB'
                })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleThumbnailChange}
              />
              <label
                htmlFor="thumbnail"
                className={` w-full h-48 border-2 border-dashed rounded-lg 
    flex items-center justify-center cursor-pointer
    ${errors.thumbnail ? 'border-red-500' : 'border-teal-500'}`}
    >
                <div className="flex flex-col items-center">
                  <svg
                    className="w-10 h-10 text-teal-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14M5 12h14" />
                  </svg>
                  <p className="mt-2 text-sm text-teal-500">Choose a file</p>
                </div>
              </label>
            </div>
                  )}


            {errors.thumbnail && <p className="text-red-500 mt-1">{errors.thumbnail.message}</p>}
            {thumbnail && (
              <div className="mt-4">
                <img src={pageThumbnail} alt="Thumbnail Preview" className="w-full h-48 object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div>
            <label htmlFor="content" className="block text-lg font-semibold text-center text-teal-900 dark:text-white">
              Blog Content
            </label>
            <textarea
              id="content"
              {...register('content', {
                required: {
                  value: true, message: 'Content is required',
                },
                minLength: { value: 200, message: 'Content should be atleast 200 characters' }
              })}
              className={`w-full mt-2 p-3 rounded-lg border ${errors.content ? 'border-red-500' : 'border-teal-300 dark:border-teal-600'
                } bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-500 dark:bg-teal-100 dark:text-black dark:placeholder:text-gray-500 font-mono `}
              rows="10"
              placeholder="Write your blog content here"
            />
            {errors.content && <p className="text-red-500 mt-1">{errors.content.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogWriter;
