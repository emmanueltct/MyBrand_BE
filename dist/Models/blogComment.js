"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogComment = new mongoose_1.default.Schema({
    blogId: String,
    user: {
        names: String,
        email: String,
        message: String
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("userComment", blogComment);
