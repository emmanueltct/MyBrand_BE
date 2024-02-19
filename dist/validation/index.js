"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateComment = exports.querriesValidation = exports.blogValidation = void 0;
const joi_1 = __importDefault(require("joi"));
//import querries from "../models/querries";
const blogValidation = (blogs) => {
    const blogsValidationSchema = joi_1.default.object({
        title: joi_1.default.string().min(20).max(50).required(),
        image: joi_1.default.string().required(),
        blogIntro: joi_1.default.string().min(50).max(100).required(),
        content: joi_1.default.string().min(300).required()
    });
    return blogsValidationSchema.validate(blogs);
};
exports.blogValidation = blogValidation;
const querriesValidation = (querries) => {
    const userValidationSChema = joi_1.default.object({
        names: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().email().required(),
        location: joi_1.default.string().min(5).required()
    });
    const validationRules = joi_1.default.object({
        client_info: userValidationSChema,
        client_budget: joi_1.default.string().required(),
        client_message: joi_1.default.string().min(20).max(300).required(),
    });
    return validationRules.validate(querries);
};
exports.querriesValidation = querriesValidation;
const validateComment = (comment) => {
    const userValidationSChema = joi_1.default.object({
        names: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().email().required(),
        message: joi_1.default.string().min(20).max(200).required()
    });
    const validationRules = joi_1.default.object({
        user: userValidationSChema,
    });
    return validationRules.validate(comment);
};
exports.validateComment = validateComment;
