import mongoose,{Schema} from "mongoose";


const likeSchema = new Schema(
    {
        blog:{
            type:Schema.Types.ObjectId,
            ref:'Blogs',

        },
        comment:{
            type:Schema.Types.ObjectId,
            ref:'Comment',
        
        },
        likedBy:{
            type:Schema.Types.ObjectId,
            ref:'User',
        }
    },
    {
        timestamps:true
    }
)

export const Like = mongoose.model('Like',likeSchema)