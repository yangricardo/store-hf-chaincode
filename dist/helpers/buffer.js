"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromUint8Array = exports.toBuffer = void 0;
const toBuffer = (data) => Buffer.from(JSON.stringify(data));
exports.toBuffer = toBuffer;
const fromUint8Array = (data) => JSON.parse(data.toString());
exports.fromUint8Array = fromUint8Array;
//# sourceMappingURL=buffer.js.map