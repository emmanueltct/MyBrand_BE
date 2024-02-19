import { Schema } from "mongoose";

export interface TOKENRESPONSE{
    user:{
        _id:Schema.Types.ObjectId,
        email:string,
        names:string
    }
 
    expireIn:number,
    iat:number
}