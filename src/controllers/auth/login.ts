import   {Request, NextFunction, Response } from 'express';
import  jwt  from 'jsonwebtoken';
import passport from 'passport';
import { IUser } from '../../utils/userType';


export const userLogin=(req:Request,res:Response,next:NextFunction)=>{
       
    passport.authenticate(
            'login',
            async (err:any, user:IUser, info:{message:string}) => {
              try {
                if (err || !user) {
                  const error = new Error('An error occurred.');
                  res.status(404).json(info)
                  return next(info);
                }
      
                req.login(
                  user,
                  { session: false },
                  async (error) => {
                    if (error) {
                      return next(error)};
      
                    const body = { _id: user._id, email: user.email,names:user.names };
                    const token = jwt.sign({user:body}, process.env.JWT_SECRET as string,{expiresIn: '1h'} );
                    
                    return res.json({ token:"Bearer "+ token, body });
                  }
                );
              } catch (error) {
                return next(error);
              }
            }
          )(req, res, next);
        }