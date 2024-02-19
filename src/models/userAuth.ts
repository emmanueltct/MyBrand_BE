import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb";

export interface IUser extends Document {
    _id:ObjectId
    names:string;
    email:string;
    password:string;
    userType:string
}


const userSchema=new mongoose.Schema<IUser>({
    names:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        default:'user'
    }

},
{timestamps:true}
)


export default mongoose.model<IUser>("Users",userSchema)
//export default userAuth;