"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODELS = exports.DB_CONFIG = void 0;
const models_1 = require("../../models");
exports.DB_CONFIG = {
    define: { timestamps: true },
    dialect: "postgres",
    database: "library",
    host: "localhost",
    password: "admin",
    username: "postgres",
    port: 5432,
};
exports.MODELS = [models_1.UserProfiles, models_1.Books, models_1.Genres, models_1.Borrower];
