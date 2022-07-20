import { Context } from "fabric-contract-api";

export interface HealthcheckDTO {
	binding: string;
	channelId: string;
	creator: {
		mspid: string;
		id: string;
	};
	dateTimestamp: string;
	tx: {
		id: string;
		timestamp: string;
	};
	client: {
		id: string;
		mspId: string;
	};
}

export const buildHealthcheckFromContext = (ctx: Context): HealthcheckDTO => ({
	binding: ctx.stub.getBinding(),
	channelId: ctx.stub.getChannelID(),
	creator: {
		mspid: ctx.stub.getCreator().mspid,
		id: Buffer.from(ctx.stub.getCreator().idBytes).toString("utf8"),
	},
	dateTimestamp: ctx.stub.getDateTimestamp().toISOString(),
	tx: {
		id: ctx.stub.getTxID(),
		timestamp: new Date(
			ctx.stub.getTxTimestamp().seconds.toNumber()
		).toISOString(),
	},
	client: {
		id: ctx.clientIdentity.getID(),
		mspId: ctx.clientIdentity.getMSPID(),
	},
});
