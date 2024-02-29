import multer, { Multer } from "multer"

import { Express, Request, Response, NextFunction } from 'express';

let maxSize = 1024 * 1024;

 const storage=multer.diskStorage({}) 
 
const filterFile=(req:any, file:Express.Multer.File, cb:any) => {
    
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    const fileSize = parseInt(req.headers['content-length']);
  
    if(fileSize>maxSize){
      req.fileValidationError = "the blog thumbnail  must be not greater than 1MB";
      return  cb(req.fileValidationError,false);
    }
    cb(null, true);
  } else {
    req.fileValidationError = "Only .png, .jpg and .jpeg format allowed!";
   return  cb(req.fileValidationError,false);

     // return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}

const upload = multer({storage:storage });

const multerImage=upload
export default multerImage

