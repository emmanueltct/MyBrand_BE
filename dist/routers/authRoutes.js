"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const login_1 = require("../controllers/auth/login");
const signup_1 = require("../controllers/auth/signup");
const authRoute = (0, express_1.default)();
authRoute.post("/login", login_1.userLogin);
authRoute.post('/signup', passport_1.default.authenticate('signup', { session: false }), signup_1.userSignup);
exports.default = authRoute;
