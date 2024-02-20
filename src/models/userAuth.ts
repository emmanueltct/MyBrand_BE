import mongoose from "mongoose";

import { IUser } from "../utils/userType";



const userSchema=new mongoose.Schema<IUser>({
    names:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
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