import {Request,Response} from "express"
import blogComment from '../models/blogComment'


const createComment=async(req:Request,res:Response)=>{
    /* console.log(req.body.user)*/
    try{
        let user=req.user
        console.log(req.user)
        if(user){
            
            const newComment=new blogComment({
                blogId:req.params.id,
                user:user,
                message:req.body.message
                })
        
                const comment= await newComment.save()
                res.status(200).json({message:"Your comment to this blog is successful sent"})
        }else{
            res.status(400).json({error:"we are validating you before you place a comment and something went wrong"})   
        }
       
   
    }catch{
        res.status(500).json({error:"some thing went wrong with your comment"})
    }
}

const readComment=async(req:Request,res:Response)=>{
    try {
        const post = await blogComment.find({blogId: req.params.id })
        res.status(200).json({data:post})
    } catch {
        res.status(400).json({ error: "comments doesn't exist!" })
    }
}

const singleComment=async(req:Request,res:Response)=>{
    try {
        const comment=await blogComment.findOne({ _id: req.params.comment_id })
        res.status(200).json({data:comment})
    } catch {
        res.status(400).json({ error: "Comment doesn't exist!" })
    } 
}


const deleteComment=async(req:Request,res:Response)=>{
    try {
        await blogComment.deleteOne({ _id: req.params.comment_id })
        res.status(204).send()
    } catch {
        res.status(400).json({ error: "Comment doesn't exist!" })
    }
}

export{createComment,readComment,singleComment,deleteComment}