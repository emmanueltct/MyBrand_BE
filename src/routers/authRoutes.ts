import  Router, {Request, NextFunction, Response } from 'express';
import passport from 'passport';
import { userLogin } from '../controllers/auth/login';
import { userSignup } from '../controllers/auth/signup';
import { isAuthenticated, isEmailExist,isValidUser,lofinFormValidation } from '../middleware/user.middlewares';
import { verifyToken } from '../controllers/auth/verifyUser';
const authRoute =Router();

authRoute.post("/login",lofinFormValidation,userLogin)

  authRoute.post('/signup',isValidUser,isEmailExist,passport.authenticate('signup', { session: false }),userSignup)
  authRoute.get('/verifyToken', isAuthenticated,  verifyToken)

  export default authRoute
