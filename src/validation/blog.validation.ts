import Joi from "joi";
import {Client, User, Comment,NewBlog}from "../utils/blogType"
//import querries from "../models/querries";

export const blogValidation=(blogs:NewBlog)=>{

    const blogsValidationSchema=Joi.object<NewBlog>({
       title:Joi.string().min(20).max(100).required(),
       blogIntro:Joi.string().min(50).max(200).required(),
       content:Joi.string().min(300).required()
    })
    return blogsValidationSchema.validate(blogs)
}

