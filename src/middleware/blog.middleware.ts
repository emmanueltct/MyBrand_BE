import { Express, Request, Response, NextFunction } from 'express';
import blogComment from '../models/blogComment'
import blogLike from "../models/blogLike"
import Blog from '../models/blog';
import {blogValidation} from '../validation/blog.validation';

export const isValidBlog=async(req:any,res:any,next:NextFunction)=>{
        const valid=blogValidation(req.body)
        if(valid.error){
            const errors=valid.error;
            const err=errors?.details[0].message
            const inputError=err.replace(/['"]+/g, '')
            res.status(403).json({ error:inputError});
            //console.log(errors?.details[0].message)
        }else{
            next()
            
        }   
}

export const isExistBlog=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const isExistBlog=await Blog.findOne({_id:req.params.id})
        if(isExistBlog) {
            next()
        } else{
            res.status(404).json({error:"the blog you are looking is not exist please check and try again"})
        }
    } catch (error:any) {
        res.status(401).json({error:"Something went wrong with your blog link please try again"})
    } 
} 

export const isExistTitle=async(req:Request,res:Response,next:NextFunction)=>{
    const titleBlog=await Blog.findOne({title:req.body.title})
    if(titleBlog) {
        res.status(409).json({
            error:"This blog title is already exist please update it or change title ",
            })
    }
     else{
        next()
    }
}

export const isHavingComment=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const isExistComment=await blogComment.find({ blogId:req.params.id})
        if(isExistComment) {
            await blogComment.deleteMany({blogId:req.params.id})
           
        } 
        next()
    } catch (error:any) {
        res.status(401).json({error:"Something went wrong to remove comments of this blog"})
    }
    
} 

export const isHavingLikes=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const isExistComment=await blogLike.find({ blogId:req.params.id})
        if(isExistComment) {
            await blogLike.deleteMany({blogId:req.params.id}) 
        } 
        next()
    } catch (error:any) {
        res.status(401).json({error:"Something went wrong to remove likes of this blog"})
    } 
}

