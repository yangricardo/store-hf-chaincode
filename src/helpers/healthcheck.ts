import { Context, Object, Property } from "fabric-contract-api";

@Object()
export class HealthcheckDTO {
	@Property()
	readonly binding: string;
	@Property()
	readonly channelId: string;
	@Property()
	readonly creator: {
		mspid: string;
		id: string;
	};
	@Property()
	readonly dateTimestamp: string;
	@Property()
	readonly tx: {
		id: string;
		timestamp: string;
	};
	@Property()
	readonly client: {
		id: string;
		mspId: string;
	};
	constructor(ctx: Context) {
		this.binding = ctx.stub.getBinding();
		this.channelId = ctx.stub.getChannelID();
		this.creator = {
			mspid: ctx.stub.getCreator().mspid,
			id: Buffer.from(ctx.stub.getCreator().idBytes).toString("utf8"),
		};
		this.dateTimestamp = ctx.stub.getDateTimestamp().toISOString();
		this.tx = {
			id: ctx.stub.getTxID(),
			timestamp: new Date(
				ctx.stub.getTxTimestamp().seconds.toNumber()
			).toISOString(),
		};
		this.client = {
			id: ctx.clientIdentity.getID(),
			mspId: ctx.clientIdentity.getMSPID(),
		};
	}
}
