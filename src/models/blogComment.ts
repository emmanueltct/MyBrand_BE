
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
const blogComment=new mongoose.Schema({
    blogId:ObjectId,
    user:{
        names:String,
        email:String,
        message:String
    }
},
{
    timestamps:true
}
)

export default mongoose.model("userComment",blogComment)