"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveKeyState = exports.recoverKeyState = exports.requireKeyNotExists = exports.requireKeyExists = exports.keyHasData = void 0;
const buffer_1 = require("./buffer");
const chaincode_error_1 = require("./chaincode.error");
const keyHasData = async (ctx, key) => {
    const data = await ctx.stub.getState(key);
    return !!data && data.length > 0;
};
exports.keyHasData = keyHasData;
const requireKeyExists = async (ctx, key) => {
    const stateExists = await (0, exports.keyHasData)(ctx, key);
    if (!stateExists) {
        throw new chaincode_error_1.ChaincodeError(`Data not found for given key`, 404, {
            keyNotFound: key,
        });
    }
};
exports.requireKeyExists = requireKeyExists;
const requireKeyNotExists = async (ctx, key) => {
    const stateExists = await (0, exports.keyHasData)(ctx, key);
    if (stateExists) {
        throw new chaincode_error_1.ChaincodeError(`The given key already has data`, 409, {
            keyFound: key,
        });
    }
};
exports.requireKeyNotExists = requireKeyNotExists;
const recoverKeyState = async (ctx, key) => {
    await (0, exports.requireKeyExists)(ctx, key);
    const rawState = await ctx.stub.getState(key);
    return (0, buffer_1.fromUint8Array)(rawState);
};
exports.recoverKeyState = recoverKeyState;
const saveKeyState = async (ctx, key, data) => {
    const buffer = (0, buffer_1.toBuffer)(data);
    await ctx.stub.putState(key, buffer);
    return buffer.toString("utf-8");
};
exports.saveKeyState = saveKeyState;
//# sourceMappingURL=key-state.js.map