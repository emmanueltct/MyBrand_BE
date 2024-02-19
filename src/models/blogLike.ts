import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const blogLike=new mongoose.Schema({
    blogId:ObjectId,
    userId:ObjectId,
    blogLike:Boolean,
    },
{
    timestamps:true
}
)

export default mongoose.model("userLike",blogLike)