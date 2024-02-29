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
const books_1 = __importDefault(require("../books"));
const user_profiles_1 = __importDefault(require("../user-profiles"));
let Borrower = class Borrower extends sequelize_typescript_1.Model {
    static setMaximumReturnAt(book) {
        if (!book.maximumReturnAt && book.createdAt) {
            const returnOfDate = new Date(book.createdAt);
            returnOfDate.setDate(returnOfDate.getDate() + 14);
            book.maximumReturnAt = returnOfDate;
        }
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Borrower.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, defaultValue: null }),
    __metadata("design:type", Date)
], Borrower.prototype, "returnDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], Borrower.prototype, "maximumReturnAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_profiles_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Borrower.prototype, "userProfileId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_profiles_1.default),
    __metadata("design:type", user_profiles_1.default)
], Borrower.prototype, "userProfile", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => books_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Borrower.prototype, "bookId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => books_1.default),
    __metadata("design:type", books_1.default)
], Borrower.prototype, "book", void 0);
__decorate([
    sequelize_typescript_1.BeforeValidate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Borrower]),
    __metadata("design:returntype", void 0)
], Borrower, "setMaximumReturnAt", null);
Borrower = __decorate([
    sequelize_typescript_1.Table
], Borrower);
exports.default = Borrower;
