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
    <div className="min-h-screen p-4 md:p-8 font-motserrat bg-teal-50 dark:bg-teal-900 transition duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-teal-800 p-6 rounded-lg shadow-lg shadow-teal-500/50">
        <h1 className="text-3xl text-teal-700 dark:text-teal-200 font-bold mb-6 text-center italic">
          Write a new Blog
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-teal-900 dark:text-teal-100">
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
                } bg-teal-50 dark:bg-teal-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-500`}
              placeholder="Enter your blog title"
            />
            {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          {/* Blog Description */}
          <div>
            <label htmlFor="description" className="block text-lg font-semibold text-teal-900 dark:text-teal-100">
              Blog Description
            </label>
            <textarea
              id="description"
              {...register('description', {
                required: { value: true, message: 'Description is required' },
                minLength: { value: 50, message: 'Description should be atleast 50 characters' }
              })}
              className={`w-full mt-2 p-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-teal-300 dark:border-teal-600'
                } bg-teal-50 dark:bg-teal-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-500`}
              rows="3"
              placeholder="Write a short description"
            />
            {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          {/* Blog Thumbnail */}
          <div>
            <label htmlFor="thumbnail" className="block text-lg font-semibold text-teal-900 dark:text-teal-100">
              Blog Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              {...register('thumbnail', {
                required: { value: true, message: 'Thumbnail is required' },
                validate: (value) => value[0].size < 2000000 || 'Thumbnail size should be less than 2MB'
              })}
              className={`mt-2 block w-full text-sm text-teal-900 dark:text-teal-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm ${errors.thumbnail
                  ? 'file:bg-red-500 dark:file:bg-red-700'
                  : 'file:bg-teal-100 dark:file:bg-teal-700'
                } file:text-teal-700 dark:file:text-teal-300 hover:file:bg-teal-200 dark:hover:file:bg-teal-600`}
              onChange={handleThumbnailChange}
            />
            {errors.thumbnail && <p className="text-red-500 mt-1">{errors.thumbnail.message}</p>}
            {thumbnail && (
              <div className="mt-4">
                <img src={pageThumbnail} alt="Thumbnail Preview" className="w-full h-48 object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div>
            <label htmlFor="content" className="block text-lg font-semibold text-teal-900 dark:text-teal-100">
              Blog Content
            </label>
            <textarea
              id="content"
              {...register('content', { required: {
                value: true, message: 'Content is required' ,
              },
              minLength: { value: 200, message: 'Content should be atleast 200 characters' }
             })}
              className={`w-full mt-2 p-3 rounded-lg border ${errors.content ? 'border-red-500' : 'border-teal-300 dark:border-teal-600'
                } bg-teal-50 dark:bg-teal-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-300 dark:focus:ring-teal-500`}
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
