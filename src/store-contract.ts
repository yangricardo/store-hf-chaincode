import { consistentStringfy } from "./helpers/buffer";
import {
	keyHasData,
	saveKeyState,
	recoverKeyState,
	requireKeyNotExists,
	buildHealthcheckFromContext,
	validateData,
	requireKeyExists,
} from "./helpers";
import { Context, Contract, Info, Transaction } from "fabric-contract-api";
import { Store, StoreSchema } from "./store";
import { KeyModification } from "./types";
import { ChaincodeError } from "./helpers/chaincode.error";

@Info({
	title: "StoreContract",
	description: "Simple Storage Contract Chaincode",
})
export class StoreContract extends Contract {
	@Transaction(false)
	public async healthcheck(ctx: Context): Promise<string> {
		return consistentStringfy(buildHealthcheckFromContext(ctx));
	}

	@Transaction(false)
	public async storeExists(ctx: Context, storeId: string): Promise<boolean> {
		return keyHasData(ctx, storeId);
	}

	@Transaction()
	public async createStore(
		ctx: Context,
		storeId: string,
		value: string
	): Promise<string> {
		try {
			await requireKeyNotExists(ctx, storeId);
			const store = validateData(StoreSchema, {
				value,
			});
			const keyStateSaved = await saveKeyState(ctx, storeId, store);
			return keyStateSaved;
		} catch (error) {
			throw ChaincodeError.fromError(error);
		}
	}

	@Transaction(false)
	public async readStore(ctx: Context, storeId: string): Promise<string> {
		try {
			const data = await recoverKeyState<Store>(ctx, storeId);
			return consistentStringfy(data);
		} catch (error) {
			throw ChaincodeError.fromError(error);
		}
	}

	@Transaction()
	public async updateStore(
		ctx: Context,
		storeId: string,
		newValue: string
	): Promise<string> {
		try {
			let store = await recoverKeyState<Store>(ctx, storeId);
			store.value = newValue;
			store = validateData(StoreSchema, store);
			const keyStateSaved = await saveKeyState(ctx, storeId, store);
			return keyStateSaved;
		} catch (error) {
			throw ChaincodeError.fromError(error);
		}
	}

	@Transaction()
	public async deleteStore(ctx: Context, storeId: string): Promise<string> {
		try {
			const store = await recoverKeyState<Store>(ctx, storeId);
			await ctx.stub.deleteState(storeId);
			return consistentStringfy(store);
		} catch (error) {
			throw ChaincodeError.fromError(error);
		}
	}

	@Transaction(false)
	public async getHistoryForKey(
		ctx: Context,
		storeId: string
	): Promise<string> {
		try {
			await requireKeyExists(ctx, storeId);
			const historyIterator = await ctx.stub.getHistoryForKey(storeId);
			const events: KeyModification[] = [];
			let current = await historyIterator.next();
			while (!current.done) {
				const { txId, timestamp, isDelete } = current.value;
				events.push({ txId, timestamp, isDelete });
				current = await historyIterator.next();
			}
			return consistentStringfy(events);
		} catch (error) {
			throw ChaincodeError.fromError(error);
		}
	}

	@Transaction(false)
	public async getHistoryTransactionForKey(
		ctx: Context,
		storeId: string,
		findTxId: string
	): Promise<string> {
		try {
			await requireKeyExists(ctx, storeId);
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
					return consistentStringfy(response);
				}
				current = await historyIterator.next();
			}
			throw new Error(`The store ${storeId} has no given txId history`);
		} catch (error) {
			throw ChaincodeError.fromError(error);
		}
	}
}
