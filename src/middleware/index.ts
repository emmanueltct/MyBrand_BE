import { Express, Request, Response, NextFunction } from 'express';
import Blog from '../models/blog';

import {blogValidation, querriesValidation, validateComment} from '../validation';

const isExistBlog=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const isExistBlog=await Blog.findOne({_id:req.params.id})
        if(isExistBlog) {
            next()
        } else{
            res.status(400)
            res.send({message:"the blog you are looking is not exist please check and try again"})
        }
        
    } catch (error:any) {
        res.status(401)
        res.send({error:"invalid input please try again"})
    }
    
} 


const isValidBlog=async(req:Request,res:Response,next:NextFunction)=>{
    const valid=blogValidation(req.body)
    if(valid.error){
        const errors=valid.error;
        res.status(400)
        res.send({ error: errors?.details[0].message });
        //console.log(errors?.details[0].message)
    }else{
        next()
    }
    
}

const isExistTitle=async(req:Request,res:Response,next:NextFunction)=>{
    const titleBlog=await Blog.findOne({title:req.body.title})
    if(titleBlog) {
      
        res.status(400)
        res.send({
            
            Error:"This blog title is already exist please update it or change title ",
            
            })
    }
     else{

        next()
    }
}


const isValidQuerry=(req:Request,res:Response,next:NextFunction)=>{
    const data={
        client_info:req.body.client,
        client_budget:req.body.budget,
        client_message:req.body.message,

    }
    const valid =querriesValidation(data)
    if(valid.error){
        const errors=valid.error;
        res.status(400)
        res.send({ error: errors?.details[0].message });
        //console.log(errors?.details[0].message)
    }else{
        next()
    }
}

const isValidComment=(req:Request,res:Response,next:NextFunction)=>{
    const valid= validateComment(req.body)
    if(valid.error){
        const errors=valid.error;
        res.status(400)
        res.send({ error: errors?.details[0].message });
        //console.log(errors?.details[0].message)
    }else{
        next()
    }
}

/*
const isValidLike=(req:Request,res:Response,next:NextFunction)=>{
    const valid= validateComment(req.body)
    if(valid.error){
        const errors=valid.error;
        res.status(400)
        res.send({ error: errors?.details[0].message });
        //console.log(errors?.details[0].message)
    }else{
        next()
    }
}
*/


export {isExistBlog,isExistTitle,isValidBlog,isValidQuerry,isValidComment}