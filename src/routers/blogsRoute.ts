
import  Router, {Request, NextFunction, Response } from 'express';
import  jwt  from 'jsonwebtoken';
const BlogRouter=Router();

import { isExistBlog,
         isExistTitle, 
         isValidBlog,
         isValidComment,
         isValidQuerry} from "../middleware"


import{ createNewBlog,
        getAllBlogs,
        singleBlog,
        updateBlog,
        deleteBlog} from './../controllers/blogsController'
        

import {createComment,
        readComment,
        singleComment,
        deleteComment} from '../controllers/blogsComment'

import { createQuerries,
        getQuerries,
        deleteQuerries } from '../controllers/querriesController';

import{createNewLike, getLikeStatus} from '../controllers/blogsLikeController'
import passport from 'passport';
import { IUser } from '../models/userAuth';
import { TOKENRESPONSE } from '../utils/tokenType';


// all routes for managing blogs

BlogRouter.post("/blogs", passport.authenticate('jwt', { session: false }), isValidBlog,isExistTitle,createNewBlog)

BlogRouter.get("/blogs", getAllBlogs)
BlogRouter.patch("/blogs/:id", passport.authenticate('jwt', { session: false }), isExistBlog, updateBlog)
BlogRouter.get("/blogs/:id",isExistBlog,singleBlog)
BlogRouter.delete("/blogs/:id",passport.authenticate('jwt', { session: false }), isExistBlog, deleteBlog)

// all routes for comments

BlogRouter.post('/blogs/:id/comments',passport.authenticate('jwt', { session: false }), isValidComment,isExistBlog,createComment)
BlogRouter.get('/blogs/:id/comments',isExistBlog,readComment)
BlogRouter.get('/comments/:comment_id',singleComment)
BlogRouter.delete('/comments/:comment_id',passport.authenticate('jwt', { session: false }), deleteComment)

//  all route for clients querries

BlogRouter.post('/querries',isValidQuerry,createQuerries)
BlogRouter.get('/querries',getQuerries)
BlogRouter.delete('/querries/:id',deleteQuerries)

// user like on specific blog
BlogRouter.post('/blogs/:id/likes', passport.authenticate('jwt', { session: false }), isExistBlog,createNewLike)
BlogRouter.get('/blogs/:id/likes', isExistBlog,getLikeStatus)



BlogRouter.post("/login",(req:Request,res:Response,next:NextFunction)=>{
        console.log('login')
        passport.authenticate(
                'login',
                async (err:Object, user:IUser, info:string) => {
                  try {
                    if (err || !user) {
                      const error = new Error('An error occurred.');
          
                      return next(error);
                    }
          
                    req.login(
                      user,
                      { session: false },
                      async (error) => {
                        if (error) return next(error);
          
                        const body = { _id: user._id, email: user.email,names:user.names };
                        const token = jwt.sign({user:body}, process.env.JWT_SECRET as string,{expiresIn: '15m'} );
                        
                        return res.json({ token:"Bearer "+token,body });
                      }
                    );
                  } catch (error) {
                    return next(error);
                  }
                }
              )(req, res, next);
            })

BlogRouter.post('/signup',passport.authenticate('signup', { session: false }),
async (req, res, next) => {

  let token:string;
  if(req.user){
    const user=req.user as IUser
    const body = { _id: user._id, email: user.email,names:user.names };
    token= jwt.sign({user:body}, process.env.JWT_SECRET as string,{expiresIn: '15m'} );
 
  res.status(200).json({
    message: 'Signup successful',
    token:`Bearer  ${token}`,
    user:req.user
  });
  }else{
    res.status(400).json({
      maessage:"something went wrong please try again"
    })
  }
})



export default BlogRouter