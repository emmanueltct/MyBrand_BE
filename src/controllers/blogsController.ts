import cloudinary from "../utils/cloudinary";
import Blog from "../models/blog"
import { Request,Response } from "express"
import multerImage from "../utils/multer";
import { isValidBlog, isExistTitle } from "../middleware/blog.middleware";
import blogLike from "../models/blogLike";
import blogComment from "../models/blogComment";
const createNewBlog=async (req:any, res:any) => {

  
        let result:string=''
        if(req.file){
            const uploadedImage=await cloudinary.uploader.upload(req.file.path)
           result=uploadedImage.secure_url
        }else{
            return res.status(403).json({error:"blog image is required"})
        }
           
              const blog = new Blog({
                title: req.body.title,
                image:result,
                blogIntro:req.body.blogIntro,
                content: req.body.content,
            })
            await blog.save()
   
       const message = "Blog is successfully created"
       return res.status(200).json({message:message,data:blog})       


}

const getAllBlogs=async (req:Request, res:Response) => {
    const posts = await Blog.find()
     const blogs:any=await Promise.all(
        posts.map(async (blog) => {
          const blogLikes = await blogLike.countDocuments({ blogId: blog._id });
          const blogComments = await blogComment.countDocuments({blogId: blog._id})
          return {
            ...blog.toObject(),
            likes: blogLikes,
            comments: blogComments,
          };
        })
      );
    
     return res.status(200).json({data:blogs})
}

const singleBlog=async (req:Request, res:Response) => {
    try {
        const post = await Blog.findOne({ _id: req.params.id })
        return res.status(200).json({data:post})
    } catch {
        return res.status(500).json({ error: "internal server error" })
    }
}


const updateBlog=async (req:any, res:Response) => {
    try {

        const post= await Blog.findOne({ _id: req.params.id })
        //console.log()
        if(post){
           
            if(req.file){
                const uploadedImage=await cloudinary.uploader.upload(req.file.path)
               post.image=uploadedImage.secure_url
            }

            let validError=''
            
            if (req.body.title ) {
                if(req.body.title.length<20 || req.body.title.length>100){
                    validError="Blog title must be atleast between 20 and 50 character length "+req.body.title.length+ " is provided"
                }
                post.title = req.body.title 
            }

            if (req.body.blogIntro) {
                if(req.body.blogIntro.length<50 || req.body.blogIntro.length>200){
                    validError="Blog introduction must be atleast between 50 and 200 character length "+req.body.blogIntro.length+ " is provided"
                }
                post.blogIntro = req.body.blogIntro
            }
            if (req.body.content ) {
                if(req.body.content.length<300){
                    validError="Blog content must be atleast between more than 300 character length and "+req.body.content.length+ " is provided"
                }
                post.content = req.body.content
            }

            if(validError.length>4){
                return res.status(403).json({"error":validError})
            }else{
            await post.save()
            return res.status(200).json({message:"blog is successfully updated",       
                    data:post 
                })
             }  
            }                
         
    } catch {
        return res.status(500).json({ error: "internal server error" })
    }
    
}

const deleteBlog=async (req:Request, res:Response) => {
    try {

        await Blog.deleteOne({ _id: req.params.id })
        return res.status(204).json({"message":"blog content is deleted"})
       
    } catch {
        return res.status(500).json({ error: "internal server error" })
    }
}



export{createNewBlog,getAllBlogs,singleBlog,updateBlog,deleteBlog}
