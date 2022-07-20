"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHealthcheckFromContext = void 0;
const buildHealthcheckFromContext = (ctx) => ({
    binding: ctx.stub.getBinding(),
    channelId: ctx.stub.getChannelID(),
    creator: {
        mspid: ctx.stub.getCreator().mspid,
        id: Buffer.from(ctx.stub.getCreator().idBytes).toString("utf8"),
    },
    dateTimestamp: ctx.stub.getDateTimestamp().toISOString(),
    tx: {
        id: ctx.stub.getTxID(),
        timestamp: new Date(ctx.stub.getTxTimestamp().seconds.toNumber()).toISOString(),
    },
    client: {
        id: ctx.clientIdentity.getID(),
        mspId: ctx.clientIdentity.getMSPID(),
    },
});
exports.buildHealthcheckFromContext = buildHealthcheckFromContext;
//# sourceMappingURL=healthcheck.js.map