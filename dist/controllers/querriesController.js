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
exports.deleteQuerries = exports.getQuerries = exports.createQuerries = void 0;
const querries_1 = __importDefault(require("../models/querries"));
const createQuerries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.client.location);
        const clientQuery = new querries_1.default({
            client_info: req.body.client,
            client_budget: req.body.budget,
            client_message: req.body.message
        });
        const query = yield clientQuery.save();
        res.status(200);
        res.send(query);
    }
    catch (error) {
        res.status(500);
        res.send({ error: "Validation failed " });
    }
});
exports.createQuerries = createQuerries;
const getQuerries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allqueries = yield querries_1.default.find();
    if (allqueries) {
        res.status(200);
        res.send(allqueries);
    }
    else {
        res.status(404);
        res.send({ "message": "no client querries found in record" });
    }
});
exports.getQuerries = getQuerries;
const deleteQuerries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield querries_1.default.deleteOne({ _id: req.params.id });
        res.send({ "message": "Client Querry is deleted" });
        // res.status(204)
    }
    catch (_a) {
        res.status(404);
        res.send({ error: "Querry doesn't exist!" });
    }
});
exports.deleteQuerries = deleteQuerries;
