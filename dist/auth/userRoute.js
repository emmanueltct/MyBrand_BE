"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.post('/login', 'login');
userRouter.post('/register', 'register');
userRouter.get('/users', 'getAllUsers');
exports.default = userRouter;
