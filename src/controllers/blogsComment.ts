import {Request,Response} from "express"
import Blog from "../models/blog"
import blogComment from '../models/blogComment'


const createComment=async(req:Request,res:Response)=>{
    console.log(req.user)
    try{
   
    const newComment=new blogComment({
        blogId:req.params.id,
        user:req.body.user,
        })

        const comment= await newComment.save()
        res.send(comment)
   
  
    }catch{
        res.status(404)
        res.send({error:"some thing went wrong with your comment"})
    }
}

const readComment=async(req:Request,res:Response)=>{
    console.log(req.params.id)
    try {
        const post = await blogComment.find({blogId: req.params.id })
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
}

const singleComment=async(req:Request,res:Response)=>{
    console.log( req.params.comment_id)
    try {
        const comment=await blogComment.findOne({ _id: req.params.comment_id })
        res.send(comment)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    } 
}


const deleteComment=async(req:Request,res:Response)=>{
    try {
        await blogComment.deleteOne({ _id: req.params.comment_id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
}

export{createComment,readComment,singleComment,deleteComment}