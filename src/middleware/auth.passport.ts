import passport from "passport";
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import { Strategy as localStrategy } from "passport-local";
import Users from "../models/userAuth";
import { Request ,Response} from "express";
import { TOKENRESPONSE } from "../utils/tokenType";

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

dotenv.config();
passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req,email, password, done:any) => {
        try {

    
          const salt=await bcrypt.genSalt(10);
          const hashPassword=await bcrypt.hash(password,salt)

          let names=req.body.names;
          let user = await new Users({ 
            names,
            email,
            password:hashPassword
          });

        await user.save()
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  // ...

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        
        const validate = await bcrypt.compare(password,user.password);
      
        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
    
        return done(error);
      }
    }
  )
);



const jwtOptions = {  
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JWTstrategy(
    jwtOptions,
    async (token:TOKENRESPONSE,done:any) => {
      try {
        return done(null, token.user);
      } catch (error) {
       
        done(error);
      }
    }
  )
);

const userPassport=passport;
export default userPassport


