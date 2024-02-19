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
exports.deleteComment = exports.singleComment = exports.readComment = exports.createComment = void 0;
const blogComment_1 = __importDefault(require("../models/blogComment"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* console.log(req.body.user)*/
    try {
        const newComment = new blogComment_1.default({
            blogId: req.params.id,
            user: req.body.user,
        });
        const comment = yield newComment.save();
        res.send(comment);
    }
    catch (_a) {
        res.status(404);
        res.send({ error: "some thing went wrong with your comment" });
    }
});
exports.createComment = createComment;
const readComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    try {
        const post = yield blogComment_1.default.find({ blogId: req.params.id });
        res.send(post);
    }
    catch (_b) {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
exports.readComment = readComment;
const singleComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.comment_id);
    try {
        const comment = yield blogComment_1.default.findOne({ _id: req.params.comment_id });
        res.send(comment);
    }
    catch (_c) {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
exports.singleComment = singleComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blogComment_1.default.deleteOne({ _id: req.params.comment_id });
        res.status(204).send();
    }
    catch (_d) {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
exports.deleteComment = deleteComment;
