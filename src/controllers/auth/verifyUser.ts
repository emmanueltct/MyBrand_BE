
import express,{Request,Response} from "express"
import passport from "passport";
import { IUser } from "../../utils/userType";
import Users from '../../models/userAuth'

export const verifyToken=async(req:any,res:Response)=>{
    
   try{
        console.log(req.user)
        let user=req.user
            const logedUser=await Users.findOne({email:user.email});
           if(logedUser){
            return res.status(200).json({user:logedUser.userType,names:logedUser.names})
           }
        } catch (error) {
            return res.status(200).json({message:error})
        }
       
    
}