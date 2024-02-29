"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonResponse = void 0;
const jsonResponse = ({ response, message = "OK!" }) => ({
    data: response,
    message,
});
exports.jsonResponse = jsonResponse;
