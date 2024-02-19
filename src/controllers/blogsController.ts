import Blog from "../models/blog"

import { Request,Response } from "express"

const createNewBlog=async (req:Request, res:Response) => {
    
    const blog = new Blog({
        title: req.body.title,
        image:req.body.image,
        blogIntro:req.body.blogIntro,
        likes:req.body.like,
        content: req.body.content,
    })

   const newblog= await blog.save()
    res.send(newblog)
}


const getAllBlogs=async (req:Request, res:Response) => {
    const posts = await Blog.find()
    res.send(posts)
}

const singleBlog=async (req:Request, res:Response) => {
    try {
        const post = await Blog.findOne({ _id: req.params.id })
        res.send(post)
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
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
             res.send(post)
        } 
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
    
}

const deleteBlog=async (req:Request, res:Response) => {
    try {
        await Blog.deleteOne({ _id: req.params.id })
        res.send({"message":"blog content is deleted"})
       // res.status(204)
    } catch {
        res.status(404)
        res.send({ error: "Blog post doesn't exist!" })
    }
}

export{createNewBlog,getAllBlogs,singleBlog,updateBlog,deleteBlog}
