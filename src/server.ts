
import dbConnection from "./dbconfig/mongodb";
import express,{Express,Response,Request, NextFunction} from "express";
import dotenv from "dotenv";

import app  from "./index";
dotenv.config();

const port = process.env.PORT || 7000;
const db=process.env.dbURL
dbConnection(db as string)


//app.use(userPassport.initialize())

app.listen(port, () => {
    console.log("application is running!"+port)
})  