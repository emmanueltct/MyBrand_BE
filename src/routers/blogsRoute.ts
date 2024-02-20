
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
import { userLogin } from '../controllers/auth/login';
import { userSignup } from '../controllers/auth/signup';



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


export default BlogRouter