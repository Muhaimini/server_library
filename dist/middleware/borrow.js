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
exports.createBorrowMiddleware = void 0;
const models_1 = require("../models");
const createBorrowMiddleware = (req, res, nextFunction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findTargetBook = yield models_1.Books.findOne({
            where: { id: req.body.bookId },
        });
        const myCollectionBooks = yield models_1.Borrower.findOne({
            where: {
                bookId: findTargetBook === null || findTargetBook === void 0 ? void 0 : findTargetBook.id,
                userProfileId: req.body.userProfileId,
            },
        });
        const quantity = (findTargetBook === null || findTargetBook === void 0 ? void 0 : findTargetBook.quantity) || 3;
        const totalBorrowed = (findTargetBook === null || findTargetBook === void 0 ? void 0 : findTargetBook.totalBorrowed) || 0;
        if (myCollectionBooks) {
            res.status(403).json({
                message: "You cannot borrow more than one of the same book. Please choose another!",
            });
            return;
        }
        if (quantity === totalBorrowed) {
            res.status(404).json({
                message: "Sorry!, empty stock!",
            });
            return;
        }
        nextFunction();
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.createBorrowMiddleware = createBorrowMiddleware;
exports.default = exports.createBorrowMiddleware;
