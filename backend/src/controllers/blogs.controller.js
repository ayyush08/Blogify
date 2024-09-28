import { Blogs } from "../models/blogs.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose ,{ isValidObjectId } from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const uploadBlog = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
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
    const {page=1,limit=10} = req.query;
    if(!isValidObjectId(userId)){
        throw new ApiError(400,'Invalid user id')
    }
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404,'User not found')
    }
    const aggregation = [
        {
            $match:{
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'owner',
                foreignField:'_id',
                as:'ownerDetails'
            }
        },
        {
            $unwind:'$ownerDetails'
        },
        {
            $project:{
                title:1,
                content:1,
                description:1,
                'ownerDetails._id':1,
                'ownerDetails.username':1,
                'ownerDetails.avatar':1,
                createdAt:1
            }
        },
        {
            $sort:{
                createdAt:-1
            }
        }
    ]
    const options = {
        page:parseInt(page,10) || 1,
        limit:parseInt(limit,10) || 10
    }
    const blogs = await Blogs.aggregatePaginate(Blogs.aggregate(aggregation),options);
    
    if(!blogs){
        throw new ApiError(404,'User blogs not found')
    }
    return res
    .status(200)
    .json(new ApiResponse(200,blogs,'User blogs retrieved successfully'))
})

const getAllBlogs = asyncHandler(async(req,res)=>{
    const {page=1,limit=10} = req.query;
    const aggregation = [
        {
            $lookup:{
                from:'users',
                localField:'owner',
                foreignField:'_id',
                as:'ownerDetails'
            }
        },
        {
            $unwind:'$ownerDetails'
        },
        {
            $project:{
                _id:1,
                title:1,
                content:1,
                description:1,
                'ownerDetails.username':1,
                'ownerDetails.avatar':1,
                createdAt:1
            }
        },
        {
            $sort:{
                createdAt:-1
        }
    }
    ]
    
    const options = {
        page:parseInt(page,10),
        limit:parseInt(limit,10)
    }
    const allBlogs = await Blogs.aggregatePaginate(Blogs.aggregate(aggregation),options)

    
    if(!allBlogs){
        throw new ApiError(404,'Blogs not paginated')}
    return res
    .status(200)
    .json(new ApiResponse(200,allBlogs,'Blogs retrieved successfully'))
})

const getBlogById = asyncHandler(async(req,res)=>{
    const {blogId} = req.params;
    if(!isValidObjectId(blogId)){
        throw new ApiError(400,'Invalid blog id')
    }
    const aggregate = [
        {
            $match:{
                _id: new mongoose.Types.ObjectId(blogId)
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'owner',
                foreignField:'_id',
                as:'ownerDetails'
            }
        },
        {
            $unwind:'$ownerDetails'
        },
        {
            $project:{
                title:1,
                content:1,
                description:1,
                'ownerDetails.username':1,
                'ownerDetails.avatar':1,
                'ownerDetails._id':1,
                createdAt:1,
                thumbnail:1
            }
        }
    ]
    const blog = await Blogs.findById(blogId);
    if(!blog){
        throw new ApiError(404,'Blog not found')
    }
    const blogDetails = await Blogs.aggregate(aggregate);
    return res
    .status(200)
    .json(new ApiResponse(200,blogDetails[0],'Blog retrieved successfully'))
})

export {
    uploadBlog,
    updateBlogContent,
    deleteBlog,
    getUserBlogs,
    getAllBlogs,
    getBlogById
}