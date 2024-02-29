"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrower = exports.Genres = exports.Books = exports.UserProfiles = void 0;
var user_profiles_1 = require("./user-profiles");
Object.defineProperty(exports, "UserProfiles", { enumerable: true, get: function () { return __importDefault(user_profiles_1).default; } });
var books_1 = require("./books");
Object.defineProperty(exports, "Books", { enumerable: true, get: function () { return __importDefault(books_1).default; } });
var genres_1 = require("./genres");
Object.defineProperty(exports, "Genres", { enumerable: true, get: function () { return __importDefault(genres_1).default; } });
var borrower_1 = require("./borrower");
Object.defineProperty(exports, "Borrower", { enumerable: true, get: function () { return __importDefault(borrower_1).default; } });
