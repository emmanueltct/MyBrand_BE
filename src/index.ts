    import express,{Response,Request, NextFunction} from "express";
    import dotenv from "dotenv";
    import mongoose  from "mongoose" ;
   import passport from "passport";
    import blogsRoutes from './routers/blogsRoute';
   
   
  //require('./middleware/auth');
    import userPassport from "./middleware/auth";
    import secureRoute from "./routers/secure-routes";


    dotenv.config();
    const app= express();

    const port = process.env.PORT || 5000;
    const db=process.env.dbURL

    // Connect to MongoDB database
    mongoose
        .connect(db as string) 
        .then(() => {
            app.use(express.json()) // new
            app.use(userPassport.initialize())
            

            app.use("/api", blogsRoutes)
            
           app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

           console.log('its work')
            // Handle errors.re
            
            app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
            res.status(err.status || 500);
            res.json({ error: err });
            });




        })
        .catch((err:Error)=>{
            console.log('something went wrong')
        })
    
    app.listen(port, () => {
            console.log("Server has started!")
        })    

    
