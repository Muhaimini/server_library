"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDecodeToken = exports.onGenerateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "library-secret-key-7c95f902-67fc-4fa6-9771-d6603a9be5de";
const onGenerateToken = (props) => {
    return jsonwebtoken_1.default.sign(props, SECRET_KEY, { expiresIn: "7d" });
};
exports.onGenerateToken = onGenerateToken;
const onDecodeToken = (token) => {
    return jsonwebtoken_1.default.verify(token, SECRET_KEY);
};
exports.onDecodeToken = onDecodeToken;
