import Joi from "joi";
import {Comment}from "../utils/blogType"

export const validateComment=(comment:Comment)=>{
    const validationRules=Joi.object<Comment>({
        message:Joi.string().min(20).max(500).required()
    })
    return  validationRules.validate(comment)
}
