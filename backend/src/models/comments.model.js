import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
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

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model('Comment',commentSchema)