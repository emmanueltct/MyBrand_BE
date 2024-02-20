"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const querries = new mongoose_1.default.Schema({
    client_info: {
        names: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        }
    },
    client_budget: {
        type: String,
        required: true
    },
    client_message: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('Clients', querries);
