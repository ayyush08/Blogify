import { Blogs } from "../models/blogs.model";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { isValidObjectId } from "mongoose";


const uploadBlog = asyncHandler(async(req,res)=>{
    const {userId} = req.params;
    const {title,content} = req.body;

    if(!isValidObjectId(userId)){
        throw new ApiError(400,'Invalid user id')
    }

    if(!title || !content){
        throw new ApiError(400,'Please fill all fields')
    }
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404,'User not found')
    }
    const blogpost = await Blogs.create({
        owner:userId,
        title,
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





export {
    uploadBlog,
    updateBlogContent
}