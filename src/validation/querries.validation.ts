import Joi from "joi";
import {Client, User}from "../utils/blogType"

export const querriesValidation=(querries:Client)=>{
    const userValidationSChema=Joi.object<User &{location:string}>({
        names:Joi.string().min(3).required(),
        email:Joi.string().email().required(),
        location:Joi.string().min(5).required()
    })
    
    const validationRules=Joi.object<Client>({
        client_info:userValidationSChema,
        client_budget:Joi.string().required(),
        client_message:Joi.string().min(20).max(300).required(),
       
    })

    return validationRules.validate(querries)
}
