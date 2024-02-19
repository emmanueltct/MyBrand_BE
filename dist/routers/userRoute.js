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
const express_1 = require("express");
const userAuth_1 = __importDefault(require("../models/userAuth"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userToken_1 = require("../utils/userToken");
const userRouter = (0, express_1.Router)();
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userAuth_1.default.findOne({ email: req.body.email });
        if (!user) {
            res.status(400),
                res.send({ message: "User does not exist please check your email again" });
        }
        else {
            const passwordMatch = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (!passwordMatch) {
                res.status(400);
                res.send({ error: "Email or Password not match please try again" });
            }
            const token = (0, userToken_1.createToken)({ user: { userID: user.id } });
            res.status(200);
            res.send({
                message: "User loged in successfuly",
                data: token
            });
        }
    }
    catch (error) {
        res.status(400);
        res.send({ err: error });
    }
}));
userRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userAuth_1.default.findOne({ email: req.body.email });
        if (user) {
            res.status(400),
                res.send({ message: "User with this email is already exist" });
        }
        else {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
            const newUser = new userAuth_1.default({
                names: req.body.names,
                email: req.body.email,
                password: hashedPassword
            });
            const savedUser = yield newUser.save();
            if (!savedUser) {
                res.status(201);
                res.send({ error: "Something went wrong please try again" });
            }
            ;
            const token = (0, userToken_1.createToken)({ userID: savedUser.id });
            res.status(200);
            res.send({ message: "New user successfully created",
                data: token
            });
        }
    }
    catch (error) {
        res.status(400);
        res.send({ err: error });
    }
}));
exports.default = userRouter;
