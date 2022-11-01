"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSchema = void 0;
const tslib_1 = require("tslib");
const Joi = tslib_1.__importStar(require("joi"));
exports.StoreSchema = Joi.object({
    value: Joi.string().required(),
}).options({
    allowUnknown: true,
    abortEarly: false,
});
