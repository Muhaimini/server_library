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
exports.router = void 0;
const express_1 = require("express");
const models_1 = require("../../../models");
const response_1 = require("../../../helper/response");
const token_1 = require("../../../helper/token");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identityId = req.query.identityId;
        const name = req.query.name;
        if (!identityId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const userProfile = yield models_1.UserProfiles.findOne({
            where: { identityId: String(identityId), name: String(name) },
        });
        if (!userProfile) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const token = (0, token_1.onGenerateToken)(userProfile.dataValues);
        res.header({ token }).json((0, response_1.jsonResponse)({ response: token }));
    }
    catch (error) {
        console.error("Error fetching profile user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
