import { Request, Response, NextFunction } from 'express';
import {validateComment} from '../validation/comment.validation';

export const isValidComment=(req:Request,res:Response,next:NextFunction)=>{
    const valid= validateComment(req.body)
    if(valid.error){
        const errors=valid.error;
        const err=errors?.details[0].message
        const inputError=err.replace(/['"]+/g, '')
        return res.status(403).json({error: inputError});
    }else{
        next()
    }
}
