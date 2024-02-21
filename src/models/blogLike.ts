import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import { ILike } from '../utils/blogType'

const blogLike=new mongoose.Schema<ILike>({
    blogId:ObjectId,
    userId:ObjectId,
    blogLike:Boolean,
    },
{
    timestamps:true
}
)

export default mongoose.model<ILike>("userLike",blogLike)