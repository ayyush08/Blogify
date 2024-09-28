import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";


const initialState = {
    likedComments: [],
    likedBlogs: [],

}
const likesSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        setLikedComments: (state, action) => {
            const { commentId, type, commenter } = action.payload;
            
            if (type === "add") {
                const existingLike = state.likedComments.find(
                    (comment) => comment.commentId === commentId && comment.commenter === commenter
                );
                // If user hasn't liked it yet, push the new like
                if (!existingLike) {
                    state.likedComments.push({ commentId, commenter });
                }
            } else if (type === "remove") {
                // Remove the like by filtering it out
                state.likedComments = state.likedComments.filter(
                    (comment) => comment.commentId !== commentId || comment.commenter !== commenter
                );
            }
        },
        setLikedBlogs: (state, action) => {
            const { blogId, type,liker } = action.payload;
            if (type === "add") {
                // If user hasn't liked it yet, push the new like
                const existingLike = state.likedBlogs.find(
                    (blog) => blog.blogId === blogId && blog.liker === liker
                );
                if (!existingLike) {
                    state.likedBlogs.push({ blogId, liker });
                }
            } else if (type === "remove") {
                // Remove the like by filtering it out
                state.likedBlogs = state.likedBlogs.filter(
                    (blog) => blog.blogId !== blogId && blog.liker !== liker
                );
            }
        }
    },
});

export default likesSlice.reducer;
export const { setLikedComments,setLikedBlogs } = likesSlice.actions;