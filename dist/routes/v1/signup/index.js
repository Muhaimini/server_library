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
const lodash_1 = require("lodash");
const validation_1 = require("../../../helper/validation");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        if (!payload.identityId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const userProfile = yield models_1.UserProfiles.findOne({
            where: { identityId: String(payload.identityId) },
        });
        if (userProfile) {
            res.status(403).json({ message: "Id already taken" });
            return;
        }
        yield models_1.UserProfiles.create(payload);
        const addUserprofile = {
            name: (0, lodash_1.startCase)(req.body.name),
            type: (0, validation_1.onValidateUserType)(req.body.type),
            address: req.body.address,
            contact: req.body.contact,
            identityId: req.body.identityId,
        };
        const token = (0, token_1.onGenerateToken)(addUserprofile);
        console.log("token", token);
        res.header({ token }).json((0, response_1.jsonResponse)({ response: token }));
    }
    catch (error) {
        console.error("Error fetching profile user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
