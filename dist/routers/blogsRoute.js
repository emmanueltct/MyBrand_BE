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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BlogRouter = (0, express_1.default)();
const middleware_1 = require("../middleware");
const blogsController_1 = require("./../controllers/blogsController");
const blogsComment_1 = require("../controllers/blogsComment");
const querriesController_1 = require("../controllers/querriesController");
const blogsLikeController_1 = require("../controllers/blogsLikeController");
const passport_1 = __importDefault(require("passport"));
// all routes for managing blogs
BlogRouter.post("/blogs", passport_1.default.authenticate('jwt', { session: false }), middleware_1.isValidBlog, middleware_1.isExistTitle, blogsController_1.createNewBlog);
BlogRouter.get("/blogs", blogsController_1.getAllBlogs);
BlogRouter.patch("/blogs/:id", passport_1.default.authenticate('jwt', { session: false }), middleware_1.isExistBlog, blogsController_1.updateBlog);
BlogRouter.get("/blogs/:id", middleware_1.isExistBlog, blogsController_1.singleBlog);
BlogRouter.delete("/blogs/:id", passport_1.default.authenticate('jwt', { session: false }), middleware_1.isExistBlog, blogsController_1.deleteBlog);
// all routes for comments
BlogRouter.post('/blogs/:id/comments', passport_1.default.authenticate('jwt', { session: false }), middleware_1.isValidComment, middleware_1.isExistBlog, blogsComment_1.createComment);
BlogRouter.get('/blogs/:id/comments', middleware_1.isExistBlog, blogsComment_1.readComment);
BlogRouter.get('/comments/:comment_id', blogsComment_1.singleComment);
BlogRouter.delete('/comments/:comment_id', passport_1.default.authenticate('jwt', { session: false }), blogsComment_1.deleteComment);
//  all route for clients querries
BlogRouter.post('/querries', middleware_1.isValidQuerry, querriesController_1.createQuerries);
BlogRouter.get('/querries', querriesController_1.getQuerries);
BlogRouter.delete('/querries/:id', querriesController_1.deleteQuerries);
// user like on specific blog
BlogRouter.post('/blogs/:id/likes', passport_1.default.authenticate('jwt', { session: false }), middleware_1.isExistBlog, blogsLikeController_1.createNewLike);
BlogRouter.get('/blogs/:id/likes', middleware_1.isExistBlog, blogsLikeController_1.getLikeStatus);
BlogRouter.post("/login", (req, res, next) => {
    console.log('login');
    passport_1.default.authenticate('login', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.');
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { _id: user._id, email: user.email, names: user.names };
                const token = jsonwebtoken_1.default.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '15m' });
                return res.json({ token: "Bearer " + token, body });
            }));
        }
        catch (error) {
            return next(error);
        }
    }))(req, res, next);
});
BlogRouter.post('/signup', passport_1.default.authenticate('signup', { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.default = BlogRouter;
