"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const constants_1 = require("./constants");
exports.sequelize = new sequelize_typescript_1.Sequelize(constants_1.DB_CONFIG);
exports.sequelize.addModels(constants_1.MODELS);
exports.default = exports.sequelize;
