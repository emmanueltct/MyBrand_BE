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
exports.getLikeStatus = exports.createNewLike = void 0;
const blogLike_1 = __importDefault(require("../models/blogLike"));
const createNewLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user = req.user;
        const userID = user._id;
        const userlikes = yield blogLike_1.default.findOne({ blogId: req.params.id,
            userId: userID });
        if (userlikes) {
            userlikes.blogLike = !userlikes.blogLike;
            yield userlikes.save();
            const TotalLike = yield blogLike_1.default.countDocuments({ blogId: req.params.id, blogLike: true });
            const TotalDislike = yield blogLike_1.default.countDocuments({ blogId: req.params.id, blogLike: false });
            res.send({
                message: "you are already reacted to this page and the status of your reaction is changed to like or dislike accordingly",
                like: TotalLike,
                dislike: TotalDislike
            });
        }
        else {
            const likes = new blogLike_1.default({
                blogId: req.params.id,
                userId: req.body.user,
                blogLike: req.body.like,
            });
            const newLike = yield likes.save();
            const TotalLike = yield blogLike_1.default.countDocuments({ blogId: req.params.id, blogLike: true });
            res.send({ "message": `new like is added and now total like is:${TotalLike}`,
                data: newLike
            });
        }
    }
    else {
        res.status(400).json({
            message: "something went wrong in user verification"
        });
    }
});
exports.createNewLike = createNewLike;
const getLikeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TotalLike = yield blogLike_1.default.countDocuments({ blogId: req.params.id, blogLike: true });
    const TotalDislike = yield blogLike_1.default.countDocuments({ blogId: req.params.id, blogLike: false });
    res.status(200);
    res.send({
        Total_like: TotalLike,
        dislike: TotalDislike
    });
});
exports.getLikeStatus = getLikeStatus;
