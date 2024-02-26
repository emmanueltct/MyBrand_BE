 import { Express } from "express";
 import { setup,serve } from "swagger-ui-express"

import swaggerJSDoc from "swagger-jsdoc";

 export const initSwagger=(app:Express)=>{
    const options:swaggerJSDoc.Options={
        definition:{
            openapi:"3.0.0",
            info:{
                title:"introduction to swagger express",
                version:"0.0.0",
                description:"This is a crud of mybrand backend application",
                license:{
                    name: 'Licensed Under MIT',
                    url: 'https://spdx.org/licenses/MIT.html',
                },
            },
            servers:[
                {url:"http://localhost:5000",}
            ], 
        },
        apis:["**/*.ts"],
    };

    const specs=swaggerJSDoc(options);
    app.use("/docs",
        serve,
        setup(specs,{
            explorer:true,
            customCssUrl:"https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
        }),
    );

 };