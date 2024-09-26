import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    likedComments: [],

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
    },
});

export default likesSlice.reducer;
export const { setLikedComments } = likesSlice.actions;