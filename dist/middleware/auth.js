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
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_local_1 = require("passport-local");
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const userAuth_1 = __importDefault(require("../models/userAuth"));
dotenv_1.default.config();
passport_1.default.use('signup', new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(password, salt);
        let names = req.body.names;
        let user = yield new userAuth_1.default({
            names,
            email,
            password: hashPassword
        });
        yield user.save();
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
})));
// ...
passport_1.default.use('login', new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userAuth_1.default.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const validate = yield bcrypt_1.default.compare(password, user.password);
        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
    }
    catch (error) {
        return done(error);
    }
})));
const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
passport_1.default.use(new JWTstrategy(jwtOptions, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.JWT_SECRET);
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
})));
const userPassport = passport_1.default;
exports.default = userPassport;
