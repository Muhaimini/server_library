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
const router = (0, express_1.Router)();
exports.router = router;
router.delete("/genre", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        if (!userId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const genre = yield models_1.Genres.findByPk(userId);
        if (!genre) {
            res.status(404).json({ message: "Genre not found" });
            return;
        }
        yield genre.destroy();
        res.status(200).json({ message: "Genre successfully deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.put("/genre/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genreId = req.params.id;
        const payload = (0, lodash_1.omit)(req.body, "id");
        if (!genreId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const genre = yield models_1.Genres.findByPk(genreId);
        if (!genre) {
            res.status(404).json({ message: "Genre not found" });
            return;
        }
        yield models_1.Genres.update(payload, {
            where: { id: genreId },
        });
        res.status(200).json({ message: "Genre successfully updated" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.post("/genre", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            label: (0, lodash_1.startCase)(req.body.label),
        };
        if (!(0, validation_1.isValidPayload)(payload)) {
            res.status(400).send({
                timestamp: req.timestamp,
                message: "Uncompeted. Please full fill the data",
            });
            return;
        }
        const createGenre = yield models_1.Genres.create(payload);
        res.status(201).json((0, response_1.jsonResponse)({
            response: createGenre,
            message: "Genre created",
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.get("/genre", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genre = yield models_1.Genres.findAll();
        res.json((0, response_1.jsonResponse)({ response: genre }));
    }
    catch (error) {
        console.error("Error fetching Genre:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
