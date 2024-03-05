import { Request, Response, NextFunction } from 'express';
import {querriesValidation} from '../validation/querries.validation';


export const isValidQuerry=(req:Request,res:Response,next:NextFunction)=>{
   
    const valid =querriesValidation(req.body)
    if(valid.error){
        const errors=valid.error;
        const err=errors?.details[0].message
        const inputError=err.replace(/['"]+/g, '')
       return res.status(403).json({error: inputError});
       
    }else{
        next()
    }
}
