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
exports.userSignup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.user) {
        const user = req.user;
        const body = { _id: user._id, email: user.email, names: user.names };
        token = jsonwebtoken_1.default.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.status(200).json({
            message: 'Signup successful',
            token: `Bearer  ${token}`,
            user: req.user
        });
    }
    else {
        res.status(400).json({
            maessage: "something went wrong please try again"
        });
    }
});
exports.userSignup = userSignup;
