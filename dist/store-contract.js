"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreContract = void 0;
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
            while (!current.done) {
                if (current.value.txId === findTxId) {
                    const { isDelete, timestamp, value, txId } = current.value;
                    const parsedValue = JSON.parse(Buffer.from(value).toString("utf-8"));
                    const response = {
                        txId,
                        timestamp,
                        isDelete,
                        value: parsedValue,
                    };
                    return (0, buffer_1.consistentStringfy)(response);
                }
                current = await historyIterator.next();
            }
            throw new Error(`The store ${storeId} has no given txId history`);
        }
        catch (error) {
            throw chaincode_error_1.ChaincodeError.fromError(error);
        }
    }
};
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "healthcheck", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "storeExists", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "createStore", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "readStore", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "updateStore", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "deleteStore", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "getHistoryForKey", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "getHistoryTransactionForKey", null);
StoreContract = __decorate([
    (0, fabric_contract_api_1.Info)({
        title: "StoreContract",
        description: "Simple Storage Contract Chaincode",
    })
], StoreContract);
exports.StoreContract = StoreContract;
//# sourceMappingURL=store-contract.js.map