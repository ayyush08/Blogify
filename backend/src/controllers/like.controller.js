import { User } from "../models/user.model.js";
import { Blogs } from "../models/blogs.model.js";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidObjectId } from "mongoose";
import mongoose from "mongoose";


const toggleBlogLike = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    const userId = req.user?._id;
    console.log(userId);

    if (!isValidObjectId(blogId)) {
        throw new ApiError(400, 'Invalid blog id')
    }
    const likedBlog = await Like.findOne({ blog: blogId, likedBy: userId });

    try {
        if (likedBlog) {
            await Like.findByIdAndDelete(likedBlog._id);
            return res
                .status(200)
                .json(new ApiResponse(200, {}, 'Blog unliked successfully'))
        }
        else {
            await Like.create({
                blog: blogId,
                likedBy: userId
            })
            return res
                .status(200)
                .json(new ApiResponse(200, {}, 'Blog liked successfully'))
        }
    } catch (error) {
        throw new ApiError(500, 'Internal server error on toggle Blog like')
    }

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user?._id;
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, 'Invalid comment id')
    }
    const likedComment = await Like.findOne({ comment: commentId, likedBy: userId });
    try {
        if (likedComment) {
            await Like.findByIdAndDelete(likedComment._id);
            return res
                .status(200)
                .json(new ApiResponse(200, {}, 'Comment unliked successfully'))
        }
        else {
            await Like.create({
                comment: commentId,
                likedBy: userId
            })
            return res
                .status(200)
                .json(new ApiResponse(200, {}, 'Comment liked successfully'))
        }
    } catch (error) {
        throw new ApiError(500, 'Internal server error on toggle Comment like')
    }
})

const getBlogLikes = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    if (!isValidObjectId(blogId)) {
        throw new ApiError(400, 'Invalid blog id')
    }
    const likes = await Like.aggregate([
        {
            $match: {
                blog: new mongoose.Types.ObjectId(blogId)
            }
        },
        {
            $lookup: {
                from: 'blogs',
                localField: 'blog',
                foreignField: '_id',
                as: 'result'
            }
        },
        {
            $unwind: '$result'
        },
        {
            $group: {
                _id: '$result._id',
                likes: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                likes: 1,
            }
        }
    ])

    if (!likes) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, 'No likes found'))
    }
    return res
        .status(200)
        .json(new ApiResponse(200, likes, 'Likes retrieved successfully'))
})

const getCommentLikes = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, 'Invalid comment id')
    }
    const likes = await Like.aggregate([
        {
            $match: {
                comment: new mongoose.Types.ObjectId(commentId)
            }
        },
        {
            $lookup: {
                from: 'comments',
                localField: 'comment',
                foreignField: '_id',
                as: 'result'
            }
        },
        {
            $unwind: '$result'
        },
        {
            $group: {
                _id: '$result._id',
                likes: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                likes: 1,
            }
        }
    ])
    if (!likes) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, 'No likes found'))
    }
    return res
        .status(200)
        .json(new ApiResponse(200, likes, 'Likes retrieved successfully'))
})


export {
    toggleBlogLike,
    toggleCommentLike,
    getBlogLikes,
    getCommentLikes
}