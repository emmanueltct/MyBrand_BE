
import mongoose from 'mongoose'
const blogComment=new mongoose.Schema({
    blogId:String,
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