import Joi from "joi";
import {Client, User}from "../utils/blogType"

export const querriesValidation=(querries:Client)=>{
  
    
    const validationRules=Joi.object<Client>({
        names:Joi.string().min(3).required(),
        email:Joi.string().email().required(),
        location:Joi.string().min(5).required(),
        budget:Joi.string().required(),
        message:Joi.string().min(20).max(300).required()
       
    })

    return validationRules.validate(querries)
}
