"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromUint8Array = exports.toBuffer = exports.consistentStringfy = void 0;
const tslib_1 = require("tslib");
const stringify = require("json-stringify-deterministic");
const sort_keys_recursive_1 = tslib_1.__importDefault(require("sort-keys-recursive"));
const consistentStringfy = (data) => {
    const sortedData = (0, sort_keys_recursive_1.default)(data);
    try {
        return stringify(sortedData);
    }
    catch {
        return JSON.stringify(sortedData);
    }
};
exports.consistentStringfy = consistentStringfy;
const toBuffer = (data) => Buffer.from((0, exports.consistentStringfy)(data));
exports.toBuffer = toBuffer;
const fromUint8Array = (data) => JSON.parse(data.toString());
exports.fromUint8Array = fromUint8Array;
