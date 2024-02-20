"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
exports.default = BlogRouter;
