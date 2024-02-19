"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    title: String,
    image: String,
    blogIntro: String,
    content: String,
}, { timestamps: true });
exports.default = mongoose_1.default.model("Blog", schema);
//schema of comment and should be 
