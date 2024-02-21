    import express,{Response,Request, NextFunction} from "express";
    import dotenv from "dotenv";
    import  bodyParser from 'body-parser'
    import mongoose  from "mongoose" ;
    import blogsRoutes from './routers/blogsRoute';
   
   
  //require('./middleware/auth');
    import userPassport from "./middleware/auth.passport";
    import authRoute from "./routers/authRoutes";
  
    dotenv.config();
    const app= express();
    
    const port = process.env.PORT || 5000;
    const db=process.env.dbURL

    // Connect to MongoDB database
    mongoose
        .connect(db as string) 
        .then(() => {
            app.use(express.json()) // new
            
            app.use(bodyParser.urlencoded({ extended: true }))
            app.use(userPassport.initialize())
            app.use("/api", blogsRoutes)
            app.use('/users/auth', authRoute );
          
            app.use('*', (req:Request, res:Response) => {
                res.status(404).json({error:'Page Not Found'});
              });
        })
        .catch((err:Error)=>{
            console.log('something went wrong')
        })
    
    app.listen(port, () => {
            console.log("Server has started!")
        })    

    
