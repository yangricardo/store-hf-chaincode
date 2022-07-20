"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.StoreSchema = joi_1.default.object({
    value: joi_1.default.string().required(),
}).options({
    allowUnknown: true,
    abortEarly: false,
});
//# sourceMappingURL=store.js.map