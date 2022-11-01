"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromUint8Array = exports.toBuffer = exports.consistentStringfy = void 0;
const querystring_1 = require("querystring");
const sort_keys_recursive_1 = require("sort-keys-recursive");
const consistentStringfy = (data) => (0, querystring_1.stringify)((0, sort_keys_recursive_1.default)(data));
exports.consistentStringfy = consistentStringfy;
const toBuffer = (data) => Buffer.from((0, exports.consistentStringfy)(data));
exports.toBuffer = toBuffer;
const fromUint8Array = (data) => JSON.parse(data.toString());
exports.fromUint8Array = fromUint8Array;
//# sourceMappingURL=buffer.js.map