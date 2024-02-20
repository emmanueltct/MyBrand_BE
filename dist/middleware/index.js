"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidComment = exports.isValidQuerry = exports.isValidBlog = exports.isExistTitle = exports.isExistBlog = void 0;
const blog_1 = __importDefault(require("../models/blog"));
const validation_1 = require("../validation");
const isExistBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExistBlog = yield blog_1.default.findOne({ _id: req.params.id });
        if (isExistBlog) {
            next();
        }
        else {
            res.status(400);
            res.send({ message: "the blog you are looking is not exist please check and try again" });
        }
    }
    catch (error) {
        res.status(401);
        res.send({ error: "invalid input please try again" });
    }
});
exports.isExistBlog = isExistBlog;
const isValidBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const valid = (0, validation_1.blogValidation)(req.body);
    if (valid.error) {
        const errors = valid.error;
        res.status(400);
        res.send({ error: errors === null || errors === void 0 ? void 0 : errors.details[0].message });
        //console.log(errors?.details[0].message)
    }
    else {
        next();
    }
});
exports.isValidBlog = isValidBlog;
const isExistTitle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const titleBlog = yield blog_1.default.findOne({ title: req.body.title });
    if (titleBlog) {
        res.status(400);
        res.send({
            Error: "This blog title is already exist please update it or change title ",
        });
    }
    else {
        next();
    }
});
exports.isExistTitle = isExistTitle;
const isValidQuerry = (req, res, next) => {
    const data = {
        client_info: req.body.client,
        client_budget: req.body.budget,
        client_message: req.body.message,
    };
    const valid = (0, validation_1.querriesValidation)(data);
    if (valid.error) {
        const errors = valid.error;
        res.status(400);
        res.send({ error: errors === null || errors === void 0 ? void 0 : errors.details[0].message });
        //console.log(errors?.details[0].message)
    }
    else {
        next();
    }
};
exports.isValidQuerry = isValidQuerry;
const isValidComment = (req, res, next) => {
    const valid = (0, validation_1.validateComment)(req.body);
    if (valid.error) {
        const errors = valid.error;
        res.status(400);
        res.send({ error: errors === null || errors === void 0 ? void 0 : errors.details[0].message });
        //console.log(errors?.details[0].message)
    }
    else {
        next();
    }
};
exports.isValidComment = isValidComment;
