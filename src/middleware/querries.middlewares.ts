import { Request, Response, NextFunction } from 'express';
import {querriesValidation} from '../validation/querries.validation';


export const isValidQuerry=(req:Request,res:Response,next:NextFunction)=>{
    const data={
        names:req.body.names,
        email:req.body.email,
        location:req.body.location,                                  
        budget:req.body.budget,
        message:req.body.message,
    }
    const valid =querriesValidation(data)
    if(valid.error){
        const errors=valid.error;
        const err=errors?.details[0].message
        const inputError=err.replace(/['"]+/g, '')
       return res.status(403).json({error: inputError});
       
    }else{
        next()
    }
}
