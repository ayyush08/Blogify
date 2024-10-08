import { Comment } from "../models/comments.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { isValidObjectId } from "mongoose"
import { Blogs } from "../models/blogs.model.js"

import mongoose from "mongoose"
import { User } from "../models/user.model.js"

const getBlogComments = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { page = 1, limit = 3 } = req.query;
    if (!isValidObjectId(blogId)) {
        throw new ApiError(400, 'Invalid blog id')
    }
    const blog = await Blogs.findById(blogId);
    if (!blog) {
        throw new ApiError(404, 'Blog not found')
    }
    const commentsAggregate = [
        {
            $match: {
                blog: new mongoose.Types.ObjectId(blogId)
            }
        },
        {
            $lookup: {
                from: "blogs",
                localField: "blog",
                foreignField: "_id",
                as: "blogDetails"
            }
        },

        {
            $unwind: "$blogDetails"
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'ownerDetails'
            }
        },
        {
            $unwind: "$ownerDetails"
        },
        {
            $project: {
                _id: 1,
                comment: 1,
                blogDetails: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    owner: 1
                },
                ownerDetails: {
                    _id: 1,
                    username: 1,
                    avatar: 1,
                    fullName: 1
                },
                createdAt: 1
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ]
    if (!commentsAggregate) {
        throw new ApiError(404, 'Comments not found')
    }
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10
    }
    const paginatedComments = await Comment.aggregatePaginate(Comment.aggregate(commentsAggregate), options)
    if (!paginatedComments) {
        throw new ApiError(404, 'Comments pagination error')
    }
    
    return res
        .status(200)
        .json(new ApiResponse(200, paginatedComments, 'Comments retrieved successfully'))
})

const addComment = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    const userId = req.user._id
    const { content } = req.body
    if (!isValidObjectId(blogId)) {
        throw new ApiError(400, "Invalid video id")
    }
    const user = User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    if (!content) {
        throw new ApiError(400, "Comment is required")
    }
    const blog = Blogs.findById(blogId)
    if (!blog) {
        throw new ApiError(404, "Video not found")
    }
    const comment = await Comment.create({
        blog: blogId,
        comment: content,
        owner: userId,
    });
    
    if (!comment) throw new ApiError(400, 'Error while adding comment');
    res
        .status(201)
        .json(new ApiResponse(201, comment, "Comment added successfully"))
})


const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
    }
    const comment = await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404, 'Comment not found');
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