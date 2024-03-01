
import  Router from 'express';
import passport from 'passport';
import multerImage  from "../utils/multer";

import { isAdmin, isAuthenticated} from "../middleware/user.middlewares"


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

import{createNewLike,
        getLikeStatus} from '../controllers/blogsLikeController'

import { isExistBlog, 
        isExistTitle, 
        isHavingComment, 
        isHavingLikes, 
        isValidBlog} from '../middleware/blog.middleware';
import { isValidQuerry } from '../middleware/querries.middlewares';
import { isValidComment } from '../middleware/comment.middlewares';
import { isValidImage, isValidImageUpdate } from '../middleware/uploadImage.middlewares';


const BlogRouter=Router();
const upload=multerImage

// all routes for managing blogs

BlogRouter.post("/blogs",isAdmin, upload.single('image'),isValidImage,isValidBlog, isExistTitle, createNewBlog)

BlogRouter.get("/blogs", getAllBlogs)

BlogRouter.patch("/blogs/:id",isAdmin,upload.single('image'),isValidImageUpdate,isExistBlog, updateBlog)           

BlogRouter.get("/blogs/:id",isExistBlog,singleBlog)
BlogRouter.delete("/blogs/:id",isAdmin, isExistBlog,isHavingComment,isHavingLikes, deleteBlog)

// all routes for comments

BlogRouter.post('/blogs/:id/comments',isAuthenticated, isValidComment,isExistBlog,createComment)
BlogRouter.get('/blogs/:id/comments',isExistBlog,readComment)
BlogRouter.get('/comments/:comment_id',singleComment)
BlogRouter.delete('/comments/:comment_id', isAdmin, deleteComment)

//  all route for clients querries

BlogRouter.post('/querries',isValidQuerry,createQuerries)
BlogRouter.get('/querries',isAdmin,getQuerries)
BlogRouter.delete('/querries/:id',isAdmin,deleteQuerries)

// user like on specific blog
BlogRouter.post('/blogs/:id/likes',isAuthenticated, isExistBlog,createNewLike)
BlogRouter.get('/blogs/:id/likes', isExistBlog,getLikeStatus)


export default BlogRouter