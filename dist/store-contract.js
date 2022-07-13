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
const utils_1 = require("./helpers/utils");
/*
 * SPDX-License-Identifier: Apache-2.0
 */
const fabric_contract_api_1 = require("fabric-contract-api");
const utils_2 = require("./helpers/utils");
const store_1 = require("./store");
let StoreContract = class StoreContract extends fabric_contract_api_1.Contract {
    async healthcheck(ctx) {
        return {
            binding: ctx.stub.getBinding(),
            channelId: ctx.stub.getChannelID(),
            creator: ctx.stub.getCreator(),
            dateTimestamp: ctx.stub.getDateTimestamp().toISOString(),
            tx: {
                id: ctx.stub.getTxID(),
                timestamp: new Date(ctx.stub.getTxTimestamp().seconds.toNumber()).toISOString(),
            },
            client: {
                id: ctx.clientIdentity.getID(),
                mspId: ctx.clientIdentity.getMSPID(),
            },
        };
    }
    async storeExists(ctx, storeId) {
        const data = await ctx.stub.getState(storeId);
        return !!data && data.length > 0;
    }
    async createStore(ctx, storeId, value) {
        const exists = await this.storeExists(ctx, storeId);
        if (exists) {
            throw new Error(`The store ${storeId} already exists`);
        }
        const store = new store_1.Store();
        store.value = value;
        const validated = store_1.StoreSchema.validate(store);
        if (validated.error) {
            console.log(validated.error.details);
        }
        const buffer = (0, utils_2.toBuffer)(validated.value);
        await ctx.stub.putState(storeId, buffer);
        return validated.value;
    }
    async readStore(ctx, storeId) {
        const exists = await this.storeExists(ctx, storeId);
        if (!exists) {
            throw new Error(`The store ${storeId} does not exist`);
        }
        const data = await ctx.stub.getState(storeId);
        const validated = store_1.StoreSchema.validate((0, utils_1.fromUint8Array)(data));
        if (validated.error) {
            console.log(validated.error.details);
        }
        return validated.value;
    }
    async updateStore(ctx, storeId, newValue) {
        const exists = await this.storeExists(ctx, storeId);
        if (!exists) {
            throw new Error(`The store ${storeId} does not exist`);
        }
        const store = new store_1.Store();
        store.value = newValue;
        const validated = store_1.StoreSchema.validate(store);
        if (validated.error) {
            console.log(validated.error.details);
        }
        const buffer = (0, utils_2.toBuffer)(store);
        await ctx.stub.putState(storeId, buffer);
        return validated.value;
    }
    async deleteStore(ctx, storeId) {
        const exists = await this.storeExists(ctx, storeId);
        if (!exists) {
            throw new Error(`The store ${storeId} does not exist`);
        }
        await ctx.stub.deleteState(storeId);
        return true;
    }
    async getHistoryForKey(ctx, storeId) {
        const exists = await this.storeExists(ctx, storeId);
        if (!exists) {
            throw new Error(`The store ${storeId} does not exist`);
        }
        const historyIterator = await ctx.stub.getHistoryForKey(storeId);
        const events = [];
        let current = await historyIterator.next();
        while (!current.done) {
            events.push(current.value);
            current = await historyIterator.next();
        }
        return events;
    }
};
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)("any"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "healthcheck", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)("boolean"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "storeExists", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    (0, fabric_contract_api_1.Returns)("Store"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "createStore", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)("Store"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "readStore", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    (0, fabric_contract_api_1.Returns)("Store"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "updateStore", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    (0, fabric_contract_api_1.Returns)("boolean"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "deleteStore", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    (0, fabric_contract_api_1.Returns)("Iterators.KeyModification[]"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StoreContract.prototype, "getHistoryForKey", null);
StoreContract = __decorate([
    (0, fabric_contract_api_1.Info)({
        title: "StoreContract",
        description: "Simple Storage Contract Chaincode",
    })
], StoreContract);
exports.StoreContract = StoreContract;
//# sourceMappingURL=store-contract.js.map