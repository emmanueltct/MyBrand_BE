"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogsRoute_1 = __importDefault(require("./routers/blogsRoute"));
//require('./middleware/auth');
const auth_1 = __importDefault(require("./middleware/auth"));
const authRoutes_1 = __importDefault(require("./routers/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const db = process.env.dbURL;
// Connect to MongoDB database
mongoose_1.default
    .connect(db)
    .then(() => {
    app.use(express_1.default.json()); // new
    app.use(auth_1.default.initialize());
    app.use("/api", blogsRoute_1.default);
    app.use('/users/auth', authRoutes_1.default);
    console.log('its work');
    // Handle errors.re
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({ error: err });
    });
})
    .catch((err) => {
    console.log('something went wrong');
});
app.listen(port, () => {
    console.log("Server has started!");
});
