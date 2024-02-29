import { Request, Response, NextFunction } from 'express';
import Users from '../models/userAuth'
import {authValidation, loginValidation} from '../validation/user.validation';
import { IUser } from '../utils/userType';
import passport from 'passport';


export const isEmailExist=async (req:Request,res:Response,next:NextFunction)=>{
  
    const existUser=await Users.findOne({email:req.body.email });
    if (existUser) {
      res.status(409).json({error: 'the user email is exist' });
    }else{
        next()
    }

}

export const isAuthenticated=(req:any,res:Response,next:NextFunction)=>{
        passport.authenticate('jwt', { session: false, }, async (error:any,token:IUser) => {
            
            if (error || !token) {
               return res.status(401).json({ message: 'Unauthenticated user detected. Please login to continue' });
            } 
            req.user=token
            return next()
        })(req, res, next);   
    }


export const isAdmin=(req:any,res:Response,next:NextFunction)=>{
    passport.authenticate('jwt', { session: false, }, async (error:any,user:IUser) => {
        if (error || !user) {
          return  res.status(401).json({ message: 'Unauthenticated user detected. Please login to continue' });
        } 
        try {
            
            const logedUser=await Users.findOne({email:user.email});
            if(!logedUser)return res.status(401).json({error:"user not found please try again"})
            const userType=logedUser.userType;
          
            if(userType!=='admin'){
             return res.status(401).json({error: 'you are not allowed to perform this operation' });
            } 
        } catch (error) {
            next(error);
        }
        return next()
    })(req, res, next);   
}


export const isValidUser=async(req:Request,res:Response,next:NextFunction)=>{
    const valid=authValidation(req.body)
    if(valid.error){
        const errors=valid.error;
        const err=errors?.details[0].message
        const inputError=err.replace(/['"]+/g, '')
        return res.status(403).json({ inputError});
    }else{
        next()
    }
}

export const lofinFormValidation=async(req:Request,res:Response,next:NextFunction)=>{
    const valid=loginValidation(req.body)
    if(valid.error){
        const errors=valid.error;
        const err=errors?.details[0].message
        const inputError=err.replace(/['"]+/g, '')
        return res.status(403).json({ inputError});
    }else{
        next()
    }
}

