"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreContract = void 0;
const tslib_1 = require("tslib");
const buffer_1 = require("./helpers/buffer");
const helpers_1 = require("./helpers");
const fabric_contract_api_1 = require("fabric-contract-api");
const store_1 = require("./store");
const chaincode_error_1 = require("./helpers/chaincode.error");
let StoreContract = class StoreContract extends fabric_contract_api_1.Contract {
    async healthcheck(ctx) {
        return (0, buffer_1.consistentStringfy)((0, helpers_1.buildHealthcheckFromContext)(ctx));
    }
    async storeExists(ctx, storeId) {
        return (0, helpers_1.keyHasData)(ctx, storeId);
    }
    async createStore(ctx, storeId, value) {
        try {
            await (0, helpers_1.requireKeyNotExists)(ctx, storeId);
            const store = (0, helpers_1.validateData)(store_1.StoreSchema, {
                value,
            });
            const keyStateSaved = await (0, helpers_1.saveKeyState)(ctx, storeId, store);
            return keyStateSaved;
        }
        catch (error) {
            throw chaincode_error_1.ChaincodeError.fromError(error);
        }
    }
    async readStore(ctx, storeId) {
        try {
            const data = await (0, helpers_1.recoverKeyState)(ctx, storeId);
            return (0, buffer_1.consistentStringfy)(data);
        }
        catch (error) {
            throw chaincode_error_1.ChaincodeError.fromError(error);
        }
    }
    async updateStore(ctx, storeId, newValue) {
        try {
            let store = await (0, helpers_1.recoverKeyState)(ctx, storeId);
            store.value = newValue;
            store = (0, helpers_1.validateData)(store_1.StoreSchema, store);
            const keyStateSaved = await (0, helpers_1.saveKeyState)(ctx, storeId, store);
            return keyStateSaved;
        }
        catch (error) {
            throw chaincode_error_1.ChaincodeError.fromError(error);
        }
    }
    async deleteStore(ctx, storeId) {
        try {
            const store = await (0, helpers_1.recoverKeyState)(ctx, storeId);
            await ctx.stub.deleteState(storeId);
            return (0, buffer_1.consistentStringfy)(store);
        }
        catch (error) {
            throw chaincode_error_1.ChaincodeError.fromError(error);
        }
    }
    async getHistoryForKey(ctx, storeId) {
        try {
            await (0, helpers_1.requireKeyExists)(ctx, storeId);
            const historyIterator = await ctx.stub.getHistoryForKey(storeId);
            const events = [];
            let current = await historyIterator.next();
            while (!current.done) {
                const { txId, timestamp, isDelete } = current.value;
                events.push({ txId, timestamp, isDelete });
                current = await historyIterator.next();
            }
            return (0, buffer_1.consistentStringfy)(events);
        }
        catch (error) {
            throw chaincode_error_1.ChaincodeError.fromError(error);
        }
    }
    async getHistoryTransactionForKey(ctx, storeId, findTxId) {
        try {
            await (0, helpers_1.requireKeyExists)(ctx, storeId);
            const historyIterator = await ctx.stub.getHistoryForKey(storeId);
            let current = await historyIterator.next();
            let foundTxId = false;
            while (!current.done || !foundTxId) {
                foundTxId = current.value.txId === findTxId;
                const { isDelete, timestamp, value, txId } = current.value;
                console.log(`getHistoryTransactionForKey(storeId=${storeId},findTxId=${findTxId})`, current.value);
                let response = {
                    txId,
                    timestamp,
                    isDelete,
                    payload: Buffer.from(value).toString("utf-8"),
                };
                if (foundTxId)
                    return (0, buffer_1.consistentStringfy)(response);
                current = await historyIterator.next();
            }
            throw new Error(`The store ${storeId} has no given txId history`);
        }
        catch (error) {
            throw chaincode_error_1.ChaincodeError.fromError(error);
        }
    }
};
tslib_1.__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreContract.prototype, "healthcheck", null);
tslib_1.__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreContract.prototype, "storeExists", null);
tslib_1.__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreContract.prototype, "createStore", null);
tslib_1.__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreContract.prototype, "readStore", null);
tslib_1.__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreContract.prototype, "updateStore", null);
tslib_1.__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreContract.prototype, "deleteStore", null);
tslib_1.__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreContract.prototype, "getHistoryForKey", null);
tslib_1.__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreContract.prototype, "getHistoryTransactionForKey", null);
StoreContract = tslib_1.__decorate([
    (0, fabric_contract_api_1.Info)({
        title: "StoreContract",
        description: "Simple Storage Contract Chaincode",
    })
], StoreContract);
exports.StoreContract = StoreContract;
