import Joi from "joi";
import {User}from "../utils/blogType"

export const authValidation=(Users:User&{password:string})=>{
    const userValidationSChema=Joi.object<User&{password:string}>().keys({
        names:Joi.string().min(3).max(40).regex(/^([a-zA-Z]{3,})+((\s)[a-zA-Z]{2,})?$/).required().label("Names")
        .messages({
          "string.min": "Provided name is too short! please write both names", 
          "string.max": "Provided name is too long! not greater than 40 characters",  
          "object.regex": "invalid name!! ",
          "string.pattern.base": "Name sholud not contain any number or symbols"
        }),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).required()
    })

    return userValidationSChema.validate(Users)
}

export const loginValidation=(Users:User&{password:string})=>{
    const userValidationSChema=Joi.object<{email:String,password:string}>({
        email:Joi.string().email().required(),
        password:Joi.string().min(5).required()
    })

    return userValidationSChema.validate(Users)
}