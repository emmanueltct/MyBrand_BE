import mongoose from 'mongoose'
const blogLike=new mongoose.Schema({
    blogId:String,
    userId:String,
    blogLike:Boolean,
    },
{
    timestamps:true
}
)

export default mongoose.model("userLike",blogLike)