import  Router, {Request, NextFunction, Response } from 'express';
import passport from 'passport';
import { userLogin } from '../controllers/auth/login';
import { userSignup } from '../controllers/auth/signup';
const authRoute =Router();

authRoute.post("/login",userLogin)

  authRoute.post('/signup',passport.authenticate('signup', { session: false }),userSignup)

  export default authRoute
