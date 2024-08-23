import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blogs',
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export const Comment = mongoose.model('Comment',commentSchema)