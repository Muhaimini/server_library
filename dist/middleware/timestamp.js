"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
const timestamp = (req, _, nextFunction) => {
    req.timestamp = Date.now();
    nextFunction();
};
exports.timestamp = timestamp;
exports.default = exports.timestamp;
