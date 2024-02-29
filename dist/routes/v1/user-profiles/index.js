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
const lodash_1 = require("lodash");
const express_1 = require("express");
const models_1 = require("../../../models");
const response_1 = require("../../../helper/response");
const validation_1 = require("../../../helper/validation");
const resquest_1 = require("../../../middleware/resquest");
const router = (0, express_1.Router)();
exports.router = router;
router.delete("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        if (!userId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const userProfile = yield models_1.UserProfiles.findByPk(userId);
        if (!userProfile) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        yield models_1.UserProfiles.destroy();
        res.status(200).json({ message: "User successfully deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.put("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const payload = (0, lodash_1.omit)(req.body, "id");
        if (!userId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const userProfile = yield models_1.UserProfiles.findByPk(userId);
        if (!userProfile) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        yield models_1.UserProfiles.update(payload, {
            where: { id: userId },
        });
        res.status(200).json({ message: "User successfully updated" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            name: (0, lodash_1.startCase)(req.body.name),
            type: (0, validation_1.onValidateUserType)(req.body.type),
            address: req.body.address,
            contact: req.body.contact,
            identityId: req.body.identityId,
        };
        if (!(0, validation_1.isValidPayload)(payload)) {
            res.status(400).send({
                timestamp: req.timestamp,
                message: "Uncompeted. Please full fill the data",
            });
            return;
        }
        const findTargetUser = yield models_1.UserProfiles.findOne({
            where: { identityId: payload.identityId },
        });
        if (findTargetUser) {
            res.status(403).json({
                message: "ID already exists, please check again",
            });
            return;
        }
        const addUserProfile = yield models_1.UserProfiles.create(payload);
        res.status(201).json((0, response_1.jsonResponse)({
            response: addUserProfile,
            message: "User created",
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.get("/users", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProfiles = yield models_1.UserProfiles.findAll();
        res.json((0, response_1.jsonResponse)({ response: userProfiles }));
    }
    catch (error) {
        console.error("Error fetching profile user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.get("/user/:id", resquest_1.protectedData, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const userProfiles = yield models_1.UserProfiles.findByPk(userId);
        res.json((0, response_1.jsonResponse)({ response: userProfiles }));
    }
    catch (error) {
        console.error("Error fetching profile user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
