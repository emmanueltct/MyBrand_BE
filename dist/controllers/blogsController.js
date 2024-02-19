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
exports.deleteBlog = exports.updateBlog = exports.singleBlog = exports.getAllBlogs = exports.createNewBlog = void 0;
const blog_1 = __importDefault(require("../models/blog"));
const createNewBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = new blog_1.default({
        title: req.body.title,
        image: req.body.image,
        blogIntro: req.body.blogIntro,
        likes: req.body.like,
        content: req.body.content,
    });
    const newblog = yield blog.save();
    res.send(newblog);
});
exports.createNewBlog = createNewBlog;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield blog_1.default.find();
    res.send(posts);
});
exports.getAllBlogs = getAllBlogs;
const singleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blog_1.default.findOne({ _id: req.params.id });
        res.send(post);
    }
    catch (_a) {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
exports.singleBlog = singleBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blog_1.default.findOne({ _id: req.params.id });
        if (post) {
            if (req.body.title) {
                post.title = req.body.title;
            }
            if (req.body.image) {
                post.image = req.body.image;
            }
            if (req.body.content) {
                post.content = req.body.content;
            }
            yield post.save();
            res.send(post);
        }
    }
    catch (_b) {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blog_1.default.deleteOne({ _id: req.params.id });
        res.send({ "message": "blog content is deleted" });
        // res.status(204)
    }
    catch (_c) {
        res.status(404);
        res.send({ error: "Blog post doesn't exist!" });
    }
});
exports.deleteBlog = deleteBlog;
