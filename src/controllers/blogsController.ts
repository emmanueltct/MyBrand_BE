import cloudinary from "../utils/cloudinary";
import Blog from "../models/blog"
import { Request,Response } from "express"

const createNewBlog=async (req:any, res:any) => {
        
         const result=await cloudinary.uploader.upload(req.file.path)
              const blog = new Blog({
                title: req.body.title,
                image:result.secure_url,
                blogIntro:req.body.blogIntro,
                content: req.body.content,
            })
            await blog.save()
   
       const message = "Blog is successfully created"
       res.status(200).json({message:message,data:blog})       
}


const getAllBlogs=async (req:Request, res:Response) => {
    const posts = await Blog.find()
    res.status(200).json({data:posts})
}

const singleBlog=async (req:Request, res:Response) => {
    try {
        const post = await Blog.findOne({ _id: req.params.id })
        res.status(200).json({data:post})
    } catch {
        res.status(400).json({ error: "Blog you are looking doesn't exist!" })
    }
}


const updateBlog=async (req:Request, res:Response) => {
    try {
        const post= await Blog.findOne({ _id: req.params.id })
      
        if(post){
            if (req.body.title) {
                post.title = req.body.title 
            }
            if (req.body.image) {
                    post.image = req.body.image
            }

            if (req.body.content) {
                post.content = req.body.content
            }
            await post.save()
             res.status(200).json({message:"blog is successfully updated",
                                   data:post 
                                    })
        } 
    } catch {
        res.status(400)
        res.send({ error: "blog post doesn't exist!" })
    }
    
}

const deleteBlog=async (req:Request, res:Response) => {
    try {

        await Blog.deleteOne({ _id: req.params.id })
        res.status(204).json({"message":"blog content is deleted"})
       // res.status(204)
    } catch {
        res.status(400)
        res.send({ error: "Blog post doesn't exist!" })
    }
}

export{createNewBlog,getAllBlogs,singleBlog,updateBlog,deleteBlog}
