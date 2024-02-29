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
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
exports.router = router;
router.delete("/book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        if (!userId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const book = yield models_1.Books.findByPk(userId);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        yield book.destroy();
        res.status(200).json({ message: "Book successfully deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.put("/book/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const payload = (0, lodash_1.omit)(req.body, "id");
        if (!bookId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const book = yield models_1.Books.findByPk(bookId);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        yield models_1.Books.update(payload, {
            where: { id: bookId },
        });
        res.status(200).json({ message: "Book successfully updated" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.post("/book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            title: (0, lodash_1.startCase)(req.body.title),
            isbn: req.body.isbn,
            author: req.body.author,
            publishedAt: req.body.publishedAt,
            genreId: req.body.genreId,
        };
        if (!(0, validation_1.isValidPayload)(payload)) {
            res.status(400).send({
                timestamp: req.timestamp,
                message: "Uncompeted. Please full fill the data",
            });
            return;
        }
        const findTargetBook = yield models_1.Books.findOne({
            where: { isbn: payload.isbn },
        });
        if (findTargetBook) {
            res.status(403).json({
                message: "ISBN already exists, please check again",
            });
            return;
        }
        const createdBook = yield models_1.Books.create(payload);
        const targetBook = yield models_1.Books.findByPk(createdBook.id, {
            include: [
                {
                    model: models_1.Genres,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
            ],
            attributes: { exclude: ["genreId"] },
        });
        res.status(201).json({
            response: targetBook,
            message: "Book created",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const books = yield models_1.Books.findAll({
            where: { title: { [sequelize_1.Op.iLike]: `%${(_a = req.query) === null || _a === void 0 ? void 0 : _a.search}%` } },
            include: [
                { model: models_1.Genres, attributes: { exclude: ["createdAt", "updatedAt"] } },
            ],
            attributes: { exclude: ["genreId"] },
        });
        res.json((0, response_1.jsonResponse)({ response: books }));
    }
    catch (error) {
        console.error("Error fetching Books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.get("/book/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const userProfiles = yield models_1.Books.findByPk(userId, {
            include: [
                { model: models_1.Genres, attributes: { exclude: ["createdAt", "updatedAt"] } },
            ],
        });
        res.json((0, response_1.jsonResponse)({ response: userProfiles }));
    }
    catch (error) {
        console.error("Error fetching profile user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
