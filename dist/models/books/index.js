"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const genres_1 = __importDefault(require("../genres"));
let Books = class Books extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Books.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, unique: true }),
    __metadata("design:type", String)
], Books.prototype, "isbn", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Books.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Books.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], Books.prototype, "publishedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 3 }),
    __metadata("design:type", Number)
], Books.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], Books.prototype, "totalBorrowed", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => genres_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Books.prototype, "genreId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => genres_1.default),
    __metadata("design:type", genres_1.default)
], Books.prototype, "genre", void 0);
Books = __decorate([
    sequelize_typescript_1.Table
], Books);
exports.default = Books;
