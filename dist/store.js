"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSchema = void 0;
const Joi = require("joi");
exports.StoreSchema = Joi.object({
    value: Joi.string().required(),
}).options({
    allowUnknown: true,
    abortEarly: false,
});
//# sourceMappingURL=store.js.map