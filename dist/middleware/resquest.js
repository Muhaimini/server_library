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
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedData = exports.request = void 0;
const token_1 = require("../helper/token");
const types_1 = require("../types");
const models_1 = require("../models");
const request = (req, _, nextFunction) => {
    console.log(req);
    nextFunction();
};
exports.request = request;
const protectedData = (req, res, nextFunction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const tokenWithBearer = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        const tokenParts = (_b = tokenWithBearer === null || tokenWithBearer === void 0 ? void 0 : tokenWithBearer.split) === null || _b === void 0 ? void 0 : _b.call(tokenWithBearer, " ");
        const token = (tokenParts === null || tokenParts === void 0 ? void 0 : tokenParts[1]) || "";
        const userProfile = (0, token_1.onDecodeToken)(token);
        const userProfiles = yield models_1.UserProfiles.findByPk(userProfile === null || userProfile === void 0 ? void 0 : userProfile.id);
        if (((_c = userProfiles === null || userProfiles === void 0 ? void 0 : userProfiles.dataValues) === null || _c === void 0 ? void 0 : _c.type) !== types_1.USER_TYPE.LIBRARIAN) {
            return res.status(403).json({ message: "Not authorize" });
        }
        nextFunction();
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.protectedData = protectedData;
exports.default = exports.request;
