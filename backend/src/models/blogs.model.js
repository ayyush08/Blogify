import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const blogsSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,

    }
},{
    timestamps:true
}) 


blogsSchema.plugin(mongooseAggregatePaginate)

export const Blogs = mongoose.model('Blogs',blogsSchema)