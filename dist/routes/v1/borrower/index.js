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
const validation_1 = require("../../../helper/validation");
const lodash_1 = require("lodash");
const borrow_1 = require("../../../middleware/borrow");
const router = (0, express_1.Router)();
exports.router = router;
router.delete("/borrower", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowId = req.body.id;
        if (!borrowId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const borrower = yield models_1.Borrower.findByPk(borrowId);
        if (!borrower) {
            res.status(404).json({ message: "data not found" });
            return;
        }
        yield borrower.destroy();
        res.status(200).json({ message: "Data successfully deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.put("/borrower/return/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowerId = req.params.id;
        const userProfileId = req.body.userProfileId;
        const borrower = yield models_1.Borrower.findByPk(borrowerId);
        if (!borrower) {
            res.status(404).json({ message: "Data not found" });
            return;
        }
        if (borrower.returnDate) {
            res.status(404).json({ message: "Already borrowed" });
            return;
        }
        const targetBook = yield models_1.Books.findByPk(borrower === null || borrower === void 0 ? void 0 : borrower.bookId);
        if (!!targetBook) {
            const totalBorrowed = (targetBook === null || targetBook === void 0 ? void 0 : targetBook.totalBorrowed) || 0;
            yield models_1.Books.update({ totalBorrowed: totalBorrowed - 1 }, { where: { id: targetBook === null || targetBook === void 0 ? void 0 : targetBook.id } });
            yield models_1.Borrower.update({ returnDate: new Date() }, { where: { userProfileId, bookId: targetBook === null || targetBook === void 0 ? void 0 : targetBook.id, id: borrower === null || borrower === void 0 ? void 0 : borrower.id } });
        }
        const response = yield models_1.Borrower.findByPk(borrowerId);
        res.status(200).json({ response, message: "Data successfully updated" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.put("/borrower/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowerId = req.params.id;
        const payload = (0, lodash_1.omit)(req.body, "id");
        if (!borrowerId) {
            res.status(400).json({ message: "Invalid id" });
            return;
        }
        const borrower = yield models_1.Borrower.findByPk(borrowerId);
        if (!borrower) {
            res.status(404).json({ message: "Data not found" });
            return;
        }
        yield models_1.Borrower.update(payload, {
            where: { id: borrowerId },
        });
        res.status(200).json({ message: "Data successfully updated" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.post("/borrower", borrow_1.createBorrowMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            userProfileId: req.body.userProfileId,
            bookId: req.body.bookId,
        };
        if (!(0, validation_1.isValidPayload)(payload)) {
            res.status(400).send({
                timestamp: req.timestamp,
                message: "Uncompeted. Please full fill the data",
            });
            return;
        }
        const createBorrower = yield models_1.Borrower.create(payload);
        const findTargetBook = yield models_1.Books.findByPk(payload.bookId);
        if (!findTargetBook) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        const totalBorrowed = ((findTargetBook === null || findTargetBook === void 0 ? void 0 : findTargetBook.totalBorrowed) || 0) + 1;
        yield models_1.Books.update({ totalBorrowed }, { where: { id: payload.bookId } });
        res.status(201).json((0, response_1.jsonResponse)({
            response: createBorrower,
            message: "Data created",
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.get("/borrower", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrower = yield models_1.Borrower.findAll({
            include: [
                {
                    model: models_1.Books,
                    attributes: { exclude: ["genreId"] },
                    include: [
                        {
                            model: models_1.Genres,
                            attributes: { exclude: ["createdAt", "updatedAt"] },
                        },
                    ],
                },
                { model: models_1.UserProfiles },
            ],
            attributes: { exclude: ["userProfileId", "bookId"] },
        });
        res.json((0, response_1.jsonResponse)({ response: borrower }));
    }
    catch (error) {
        console.error("Error fetching Borrower:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
