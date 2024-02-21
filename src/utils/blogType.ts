import { DateSchema } from "joi"
import { Schema } from "mongoose"

export interface NewBlog{
    title:string,
    image:string,
    blogIntro:string,
    content:string,
}

export interface User{
    names:string
    email:string
}

export interface Client{
    client_info:User &{location:string}
    client_budget:string
    client_message:string

}

export interface Comment{
 user:User&{_id:Schema.Types.ObjectId}
 blogId:Schema.Types.ObjectId
  message:string 
}

export interface ILike{
    [x: string]: any
    _id:Schema.Types.ObjectId
    userId:Schema.Types.ObjectId
    blogId:Schema.Types.ObjectId
    blogLike:boolean 
    createdAt:DateSchema
    updatedAt:DateSchema 
}
