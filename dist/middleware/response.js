"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (_, res, nextFunction) => {
    nextFunction();
};
exports.response = response;
exports.default = exports.response;
