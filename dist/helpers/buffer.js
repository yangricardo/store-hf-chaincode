"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromUint8Array = exports.toBuffer = exports.consistentStringfy = void 0;
const tslib_1 = require("tslib");
const stringify = require("json-stringify-deterministic");
const sort_keys_recursive_1 = tslib_1.__importDefault(require("sort-keys-recursive"));
const consistentStringfy = (data) => {
    try {
        const sortedData = (0, sort_keys_recursive_1.default)(data);
        return stringify(sortedData);
    }
    catch {
        return JSON.stringify(data);
    }
};
exports.consistentStringfy = consistentStringfy;
const toBuffer = (data) => {
    const uint8Array = new TextEncoder().encode((0, exports.consistentStringfy)(data));
    return Buffer.from(uint8Array);
};
exports.toBuffer = toBuffer;
const fromUint8Array = (data) => JSON.parse(data.toString());
exports.fromUint8Array = fromUint8Array;
