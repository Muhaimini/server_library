"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onValidateUserType = exports.isValidPayload = void 0;
const lodash_1 = require("lodash");
const types_1 = require("../types");
const isValidPayload = (props) => {
    if ((0, lodash_1.isEmpty)(props))
        return false;
    return (0, lodash_1.every)(props, (value) => !(0, lodash_1.isEmpty)(value));
};
exports.isValidPayload = isValidPayload;
const onValidateUserType = (userType) => {
    if ((0, lodash_1.isEmpty)(userType))
        return types_1.USER_TYPE.MEMBER;
    return userType === types_1.USER_TYPE.LIBRARIAN ? userType : types_1.USER_TYPE.MEMBER;
};
exports.onValidateUserType = onValidateUserType;
