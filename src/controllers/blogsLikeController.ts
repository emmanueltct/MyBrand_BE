import blogLike from "../models/blogLike"
import { Request,Response } from "express"
import { IUser } from "../utils/userType";
import { ILike } from "../utils/blogType";


const createNewLike=async (req:Request, res:Response) => {
    if(req.user){
        const user=req.user as IUser;
        const userID=user._id
        let uLikes=true
     const userlikes:ILike | null =await  blogLike.findOne({blogId:req.params.id,
        userId:userID}) 

    if(userlikes){
        userlikes.blogLike=!userlikes.blogLike
        await userlikes.save() 
        const TotalLike=await blogLike.countDocuments({blogId:req.params.id,blogLike:true})
        const TotalDislike=await blogLike.countDocuments({blogId:req.params.id,blogLike:false})

        return res.status(200).json({
            message:"you are already reacted to this page and the status of your reaction is changed to like or dislike accordingly",
            data:{likes:TotalLike,
                  dislike:TotalDislike
                  }
         })
    }else{
        const likes:ILike= new blogLike({
            blogId:req.params.id,
            userId:userID,
            blogLike:uLikes,
        })
    
       const newLike= await likes.save()
       const TotalLike=await blogLike.countDocuments({blogId:req.params.id,blogLike:true})

       return res.status(200).json({
                            message:'new like is added',
                            data:TotalLike
                            })
    }
    }
    }



   

const getLikeStatus=async(req:Request, res:Response)=>{
    const TotalLike=await blogLike.countDocuments({blogId:req.params.id,blogLike:true})
    const TotalDislike=await blogLike.countDocuments({blogId:req.params.id,blogLike:false}) 
    res.status(200)
    res.send({
        Total_like:TotalLike,
        dislike:TotalDislike
    })
}

export{createNewLike,getLikeStatus}
