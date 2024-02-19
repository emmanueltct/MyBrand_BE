"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const secureRoute = (0, express_1.default)();
secureRoute.get('/profile', (req, res, next) => {
    console.log('here');
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
    });
});
exports.default = secureRoute;
