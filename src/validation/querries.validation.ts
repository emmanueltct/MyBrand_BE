import Joi from "joi";
import {Client, User}from "../utils/blogType"

export const querriesValidation=(querries:Client)=>{
  
    const validationRules=Joi.object<Client>().keys({
        names:Joi.string().min(3).max(40).regex(/^([a-zA-Z]{3,})+((\s)[a-zA-Z]{2,})?$/).required().label("Names")
        .messages({
          "string.min": "Provided name is too short! please write both names", 
          "string.max": "Provided name is too long! not greater than 40 characters",  
          "object.regex": "invalid name!! ",
          "string.pattern.base": "Name sholud not contain any number or symbols"
        }),
        email:Joi.string().email().required(),
        location:Joi.string().min(5).required(),
        budget:Joi.string().regex(/^[0-9]+(\s?)+(rwf|RWF|USD|\$)$/).required()
        .label("Budget")
        .messages({
          "object.regex": "invalid currency!!  accepted format be like 100 USD | 100$ |1000 RWF ",
          "string.pattern.base": "invalid currency!!  accepted format be like 100 USD | 100$ |1000 RWF"
        }),
        message:Joi.string().min(20).max(300).required()
       
    })

    return validationRules.validate(querries)
}
