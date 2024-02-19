"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogLike = new mongoose_1.default.Schema({
    blogId: String,
    userId: String,
    blogLike: Boolean,
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("userLike", blogLike);
