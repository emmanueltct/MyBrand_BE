import {Request,Response} from "express"
import blogComment from '../models/blogComment'


const createComment=async(req:Request,res:Response)=>{

    try{
        let user=req.user
     
            const newComment=new blogComment({
                blogId:req.params.id,
                user:user,
                message:req.body.message
                })
    
                const comment= await newComment.save()
                return res.status(200).json({message:"Your comment to this blog is successful sent"})
      
    }catch{
       return res.status(500).json({error:"some thing went wrong with your comment"})
    }
}

const readComment=async(req:Request,res:Response)=>{
    try {
        const post = await blogComment.find({blogId: req.params.id })
        return res.status(200).json({data:post})
    } catch {
       return res.status(500).json({ error: "internal server error" })
    }
}

const singleComment=async(req:Request,res:Response)=>{
    try {
        const comment=await blogComment.findOne({ _id: req.params.comment_id })
        if(comment){
            return res.status(200).json({data:comment})
        }else{
            return res.status(404).json({error:"Comment doesn't exist!"})
        }
        
    } catch {
        return res.status(400).json({ error: "This comment is inavlid and try again" })
    } 
}


const deleteComment=async(req:Request,res:Response)=>{
    try {
        const comment=await blogComment.findOne({ _id: req.params.comment_id })
        if(comment){
            await blogComment.deleteOne({ _id: req.params.comment_id })
           return res.status(204).json({message:"comment is deleted"}) 
        }else{
           return res.status(404).json({error:"comment doesn't exist"}) 
        }
      
    } catch {
       return  res.status(400).json({ error: "This comment is inavlid and try again" })
    }
}

export{createComment,readComment,singleComment,deleteComment}