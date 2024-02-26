import Joi from "joi";
import {User}from "../utils/blogType"

export const authValidation=(Users:User&{password:string})=>{
    const userValidationSChema=Joi.object<User&{password:string}>({
        names:Joi.string().min(3).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).required()
    })

    return userValidationSChema.validate(Users)
}