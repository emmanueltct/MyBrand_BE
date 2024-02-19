"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const blogValidation = (blogs) => {
    const blogsValidationSchema = joi_1.default.object({
        title: joi_1.default.string().min(20).max(50).required(),
        image: joi_1.default.string().required(),
        blogIntro: joi_1.default.string().min(50).max(100).required(),
        content: joi_1.default.string().min(300).required()
    });
    return blogsValidationSchema.validate(blogs);
};
