import { Blogs } from "../models/blogs.model";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { isValidObjectId } from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadBlog = asyncHandler(async(req,res)=>{
    const {userId} = req.params;
    const {title,content,description,} = req.body;

    if(!isValidObjectId(userId)){
        throw new ApiError(400,'Invalid user id')
    }

    if(!title || !content || !description){
        throw new ApiError(400,'Please fill all fields')
    }
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404,'User not found')
    }
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    const blogpost = await Blogs.create({
        owner:userId,
        title,
        thumbnail:thumbnail.url,
        description,
        content
    })
    return res
    .status(200)
    .json(new ApiResponse(200,blogpost,'Blog created successfully'))
})


const updateBlogContent = asyncHandler(async(req,res)=>{
    const {blogId} = req.params;
    const {content} = req.body;
    if(!isValidObjectId(blogId)){
        throw new ApiError(400,'Invalid blog id')
    }
    const blog = await Blogs.findById(blogId);
    if(!blog){
        throw new ApiError(404,'Blog not found')
    }
    if(blog?.owner.toString()!==req.user?._id.toString()){
        throw new ApiError(403,"You are not authorized to update this blog")
    }
    const updatedBlog = await Blogs.findByIdAndUpdate(blogId,
        {
            $set:{
                content
            }
        },
        {new:true}
    )
    if(!updatedBlog){
        throw new ApiError(500,'Error updating blog')
    }
    return res
    .status(200)
    .json(new ApiResponse(200,updatedBlog,'Blog updated successfully'))
})

const deleteBlog  = asyncHandler(async(req,res)=>{
    const {blogId} = req.params;
    if(!isValidObjectId(blogId)){
        throw new ApiError(400,'Invalid blog id')
    }
    const blog = await Blogs.findById(blogId);
    if(blog?.owner.toString()!==req.user?._id.toString()){
        throw new ApiError(403,"You are not authorized to delete this blog")
    }
    const deletedBlog = await Blogs.findByIdAndDelete(blogId);
    if(!deletedBlog){
        throw new ApiError(500,'Error deleting blog')
    }
    return res
    .status(200)
    .json(new ApiResponse(200,deletedBlog,'Blog deleted successfully'))
})

const getUserBlogs = asyncHandler(async(req,res)=>{
    const {userId} = req.params;
    if(!isValidObjectId(userId)){
        throw new ApiError(400,'Invalid user id')
    }
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404,'User not found')
    }
    const blogs = await Blogs.aggregate([
        {
            $match:{
                owner:user._id
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'owner',
                foreignField:'_id',
                as:'owner'
            }
        },
        {
            $unwind:'$owner'
        },
        {
            $project:{
                title:1,
                content:1,
                description:1,
                '$owner.username':1,
                '$owner.avatar':1,
                
            }
        }
    ]);
    
    return res
    .status(200)
    .json(new ApiResponse(200,blogs,'User blogs retrieved successfully'))
})


export {
    uploadBlog,
    updateBlogContent,
    deleteBlog,
    getUserBlogs
}