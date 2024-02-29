
import { Express, Request, Response, NextFunction } from 'express';
import multerImage  from "../utils/multer";

 export const isValidImage=async(req:any,res:any,next:NextFunction)=>{
    
    let maxSize = 1024 * 1024;
    let  fileSize=0
  if(req.file){
    
    if (req.file.mimetype === "image/png" || req.file.mimetype ==="image/jpg" || req.file.mimetype ==="image/jpeg") {

        if(req.file.size>maxSize){
            return res.status(400).json({error:"the blog thumbnail  must be not greater than 1MB"}); 
        }else{
            next()
        }

    }else{
        req.fileValidationError = "Only .png, .jpg and .jpeg format allowed!"+req.file.mimetype;
        return res.status(400).json({error:req.fileValidationError});
    }

  }else{
    return res.status(400).json({error:"the blog image is required"});
         
  }
      

}


export const isValidImageUpdate=async(req:any,res:any,next:NextFunction)=>{
    
    let maxSize = 1024 * 1024;
    let  fileSize=0
  if(req.file){
    console.log("file",req.file.mimetype)

    if (req.file.mimetype === "image/png" || req.file.mimetype ==="image/jpg" || req.file.mimetype ==="image/jpeg") {

        if(req.file.size>maxSize){
            return res.status(400).json({error:"the blog thumbnail  must be not greater than 1MB"}); 
        }else{
            next()
        }

    }else{
        req.fileValidationError = "Only .png, .jpg and .jpeg format allowed!"+req.file.mimetype;
        return res.status(400).json({error:req.fileValidationError});
    }

  }else{
   next()
         
  }
      

}
 