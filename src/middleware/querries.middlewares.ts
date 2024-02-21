import { Request, Response, NextFunction } from 'express';
import {querriesValidation} from '../validation/querries.validation';


export const isValidQuerry=(req:Request,res:Response,next:NextFunction)=>{
    const data={
        client_info:req.body.client,
        client_budget:req.body.budget,
        client_message:req.body.message,
    }
    const valid =querriesValidation(data)
    if(valid.error){
        const errors=valid.error;
        const err=errors?.details[0].message
        const inputError=err.replace(/['"]+/g, '')
        res.status(403).json({error: inputError});
        //console.log(errors?.details[0].message)
    }else{
        next()
    }
}
