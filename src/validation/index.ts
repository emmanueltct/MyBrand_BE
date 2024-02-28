import Joi from "joi";
import {Client, User, Comment,NewBlog}from "../utils/blogType"
//import querries from "../models/querries";

export const blogValidation=(blogs:NewBlog)=>{

    const blogsValidationSchema=Joi.object<NewBlog>({
       title:Joi.string().min(20).max(50).required(),
       image:Joi.string().required(),
       blogIntro:Joi.string().min(50).max(100).required(),
       content:Joi.string().min(300).required()
    })

    return blogsValidationSchema.validate(blogs)
}

export const querriesValidation=(querries:Client)=>{
  
    const validationRules=Joi.object<Client>({
        names:Joi.string().min(3).required(),
        email:Joi.string().email().required(),
        location:Joi.string().min(5).required(),
        budget:Joi.string().required(),
        message:Joi.string().min(20).max(300).required()
    })

    return validationRules.validate(querries)
}

export const validateComment=(comment:Comment)=>{
    const userValidationSChema=Joi.object<User &{message:string}>({
        names:Joi.string().min(3).required(),
        email:Joi.string().email().required(),
        message:Joi.string().min(20).max(200).required()
    }) 

    const validationRules=Joi.object<Comment>({
      
        user:userValidationSChema,
       
    })

    return  validationRules.validate(comment)
}