
    import express,{Express,Response,Request, NextFunction} from "express";
    import  bodyParser from 'body-parser'
    import blogsRoutes from './routers/blogsRoute';
    import userPassport from "./middleware/auth.passport";
    import authRoute from "./routers/authRoutes";
    import swaggerui from 'swagger-ui-express';
    import * as swaggerDocument from "./swagger.json";
    import cors from 'cors'
    //import { initSwagger } from "./swagger";
  
     const app:Express=express()
    // Connect to MongoDB database
            app.use(cors())
             app.use(express.json()) // new
            app.use(bodyParser.urlencoded({ extended: true }))
            app.use(userPassport.initialize())
            app.use("/api", blogsRoutes)
            app.use('/api/users/auth', authRoute );
            //initSwagger(app)
            app.use('/docs', swaggerui.serve,swaggerui.setup(swaggerDocument))
            app.get('/api/*', (req:Request, res:Response) => {
                return res.status(404).json({error:'Page Not Found'});
              });

           
  export default app          

    
