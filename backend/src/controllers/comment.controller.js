import { Comment } from "../models/comments.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { isValidObjectId } from "mongoose"
import { Blogs } from "../models/blogs.model.js"



const getBlogComments = asyncHandler(async (req, res) => {
    const {blogId} = req.params;
    const {page,limit} = req.query;
    if(!isValidObjectId(blogId)){
        throw new ApiError(400,'Invalid blog id')
    }
    const blog = await Blogs.findById(blogId);
    if(!blog){
        throw new ApiError(404,'Blog not found')
    }
    const commentsAggregate = await Comment.aggregate([
        {
            $match:{
                blog:blog._id
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
                _id:1,
                comment:1,
                owner:{
                    _id:1,
                    name:1,
                    email:1,
                    avatar:1
                },
                createdAt:1
            }
        }
    ])
    if(!commentsAggregate){
        throw new ApiError(404,'Comments not found')
    }
    const options = {
        page:parseInt(page,10) || 1,
        limit:parseInt(limit,10) || 10
    }
    const paginatedComments = await Comment.aggregatePaginate(commentsAggregate,options)
    if(!paginatedComments){
        throw new ApiError(404,'Comments pagination error')
    }
    return res
    .status(200)
    .json(new ApiResponse(200,paginatedComments,'Comments retrieved successfully'))
})

const addComment = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    const { content } = req.body
    if (!isValidObjectId(blogId)) {
        throw new ApiError(400, "Invalid video id")
    }
    if (!content) {
        throw new ApiError(400, "Comment is required")
    }
    const blog = Blogs.findById(blogId)
    if (!blog) {
        throw new ApiError(404, "Video not found")
    }
    const comment = await Comment.create({
        blog: videoId,
        content,
        owner: req.user._id,
    });
    if (!comment) throw new ApiError(400, 'Error while adding comment');
    res
        .status(201)
        .json(new ApiResponse(201, content, "Comment added successfully"))
})


const deleteComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
    }
    const comment = await Comment.findById(commentId)
    if (comment?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "only comment owner can delete their comment");
    }
    await Comment.findByIdAndDelete(commentId);
    res
    .status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully"));
})

export {
    addComment,
    deleteComment,
    getBlogComments
}