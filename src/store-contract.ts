import { fromUint8Array } from "./helpers/utils";
import {
	Context,
	Contract,
	Info,
	Returns,
	Transaction,
} from "fabric-contract-api";
import { toBuffer } from "./helpers/utils";
import { Store, StoreSchema } from "./store";
import { Iterators } from "fabric-shim";
import { KeyModification } from "./types";

@Info({
	title: "StoreContract",
	description: "Simple Storage Contract Chaincode",
})
export class StoreContract extends Contract {
	@Transaction(false)
	@Returns("any")
	public async healthcheck(ctx: Context): Promise<any> {
		return {
			binding: ctx.stub.getBinding(),
			channelId: ctx.stub.getChannelID(),
			creator: ctx.stub.getCreator(),
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
		};
	}

	@Transaction(false)
	@Returns("boolean")
	public async storeExists(ctx: Context, storeId: string): Promise<boolean> {
		const data: Uint8Array = await ctx.stub.getState(storeId);
		return !!data && data.length > 0;
	}

	@Transaction()
	@Returns("Store")
	public async createStore(
		ctx: Context,
		storeId: string,
		value: string
	): Promise<Store> {
		const exists: boolean = await this.storeExists(ctx, storeId);
		if (exists) {
			throw new Error(`The store ${storeId} already exists`);
		}
		const store: Store = {
			value,
		};
		const validated = StoreSchema.validate(store);
		if (validated.error) {
			throw validated.error.details;
		}
		const buffer: Buffer = toBuffer(validated.value);
		await ctx.stub.putState(storeId, buffer);
		return validated.value;
	}

	@Transaction(false)
	@Returns("Store")
	public async readStore(ctx: Context, storeId: string): Promise<Store> {
		const exists: boolean = await this.storeExists(ctx, storeId);
		if (!exists) {
			throw new Error(`The store ${storeId} does not exist`);
		}
		const data: Uint8Array = await ctx.stub.getState(storeId);
		const validated = StoreSchema.validate(fromUint8Array(data));
		if (validated.error) {
			throw validated.error.details;
		}
		return validated.value;
	}

	@Transaction()
	@Returns("Store")
	public async updateStore(
		ctx: Context,
		storeId: string,
		newValue: string
	): Promise<Store> {
		const exists: boolean = await this.storeExists(ctx, storeId);
		if (!exists) {
			throw new Error(`The store ${storeId} does not exist`);
		}
		const store: Store = {
			value: newValue,
		};
		const validated = StoreSchema.validate(store);
		if (validated.error) {
			throw validated.error.details;
		}
		const buffer: Buffer = toBuffer(store);
		await ctx.stub.putState(storeId, buffer);
		return validated.value;
	}

	@Transaction()
	@Returns("boolean")
	public async deleteStore(ctx: Context, storeId: string): Promise<boolean> {
		const exists: boolean = await this.storeExists(ctx, storeId);
		if (!exists) {
			throw new Error(`The store ${storeId} does not exist`);
		}
		await ctx.stub.deleteState(storeId);
		return true;
	}

	@Transaction()
	@Returns("Iterators.KeyModification[]")
	public async getHistoryForKey(
		ctx: Context,
		storeId: string
	): Promise<KeyModification[]> {
		const exists: boolean = await this.storeExists(ctx, storeId);
		if (!exists) {
			throw new Error(`The store ${storeId} does not exist`);
		}
		const historyIterator = await ctx.stub.getHistoryForKey(storeId);
		const events: KeyModification[] = [];
		let current = await historyIterator.next();
		while (!current.done) {
			const { txId, timestamp, isDelete } = current.value;
			events.push({ txId, timestamp, isDelete });
			current = await historyIterator.next();
		}
		return events;
	}

	@Transaction()
	@Returns("Iterators.KeyModification")
	public async getHistoryTransactionForKey(
		ctx: Context,
		storeId: string,
		txId: string
	): Promise<Iterators.KeyModification> {
		const exists: boolean = await this.storeExists(ctx, storeId);
		if (!exists) {
			throw new Error(`The store ${storeId} does not exist`);
		}
		const historyIterator = await ctx.stub.getHistoryForKey(storeId);
		let current = await historyIterator.next();
		while (!current.done) {
			if (current.value.txId === txId) {
				return current.value;
			}
			current = await historyIterator.next();
		}
		throw new Error(`The store ${storeId} has no given txId history`);
	}
}
