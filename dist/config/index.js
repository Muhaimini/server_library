"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onInitializeApp = exports.sequelize = void 0;
var sequelize_1 = require("./sequelize");
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return sequelize_1.sequelize; } });
var apps_1 = require("./apps");
Object.defineProperty(exports, "onInitializeApp", { enumerable: true, get: function () { return __importDefault(apps_1).default; } });
