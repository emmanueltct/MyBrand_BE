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
const userAuth_1 = __importDefault(require("../models/userAuth"));
const passport_local_1 = require("passport-local");
const auth_middleware_1 = require("../middleware/auth.middleware");
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
        if (user && (yield (0, auth_middleware_1.comparePassword)(user, password))) {
            done(null, user);
        }
        else {
            done(null, false);
        }
        return done(null, user, { message: 'Logged in Successfully' });
    }
    catch (error) {
        return done(error);
    }
})));
