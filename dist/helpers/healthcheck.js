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
exports.HealthcheckDTO = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let HealthcheckDTO = class HealthcheckDTO {
    constructor(ctx) {
        this.binding = ctx.stub.getBinding();
        this.channelId = ctx.stub.getChannelID();
        this.creator = {
            mspid: ctx.stub.getCreator().mspid,
            id: Buffer.from(ctx.stub.getCreator().idBytes).toString("utf8"),
        };
        this.dateTimestamp = ctx.stub.getDateTimestamp().toISOString();
        this.tx = {
            id: ctx.stub.getTxID(),
            timestamp: new Date(ctx.stub.getTxTimestamp().seconds.toNumber()).toISOString(),
        };
        this.client = {
            id: ctx.clientIdentity.getID(),
            mspId: ctx.clientIdentity.getMSPID(),
        };
    }
};
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], HealthcheckDTO.prototype, "binding", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], HealthcheckDTO.prototype, "channelId", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", Object)
], HealthcheckDTO.prototype, "creator", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], HealthcheckDTO.prototype, "dateTimestamp", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", Object)
], HealthcheckDTO.prototype, "tx", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", Object)
], HealthcheckDTO.prototype, "client", void 0);
HealthcheckDTO = __decorate([
    (0, fabric_contract_api_1.Object)(),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context])
], HealthcheckDTO);
exports.HealthcheckDTO = HealthcheckDTO;
//# sourceMappingURL=healthcheck.js.map