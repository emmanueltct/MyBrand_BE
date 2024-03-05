import {Request, NextFunction, Response } from 'express';
import  jwt  from 'jsonwebtoken';
import { IUser } from '../../utils/userType';

export const userSignup=async (req:Request, res:Response, next:NextFunction) => {

  let token:string;
  if(req.user){
    const user=req.user as IUser
    const body = { _id: user._id, email: user.email,names:user.names };
    token= jwt.sign({user:body}, process.env.JWT_SECRET as string,{expiresIn: '1h'} );
 
 return res.status(200).json({
    message: 'Signup successful',
    token:`Bearer  ${token}`
   
  });
  }else{
   return res.status(400).json({
      maessage:"something went wrong please try again"
    })
  }
}
