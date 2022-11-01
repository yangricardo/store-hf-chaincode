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
				value: JSON.parse(value),
			} as Store);
			const keyStateSaved = await saveKeyState(ctx, storeId, store);
			return keyStateSaved;
		} catch (error) {
			throw ChaincodeError.fromError(error).toError();
		}
	}

	@Transaction(false)
	public async readStore(ctx: Context, storeId: string): Promise<string> {
		try {
			const data = await recoverKeyState<Store>(ctx, storeId);
			return consistentStringfy(data);
		} catch (error) {
			throw ChaincodeError.fromError(error).toError();
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
			const newStore = validateData(StoreSchema, {
				value: JSON.parse(newValue),
			} as Store);
			store = validateData(StoreSchema, {
				...store.value,
				...newStore.value,
			});
			const keyStateSaved = await saveKeyState(ctx, storeId, store);
			return keyStateSaved;
		} catch (error) {
			throw ChaincodeError.fromError(error).toError();
		}
	}

	@Transaction()
	public async deleteStore(ctx: Context, storeId: string): Promise<string> {
		try {
			const store = await recoverKeyState<Store>(ctx, storeId);
			await ctx.stub.deleteState(storeId);
			return consistentStringfy(store);
		} catch (error) {
			throw ChaincodeError.fromError(error).toError();
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
			throw ChaincodeError.fromError(error).toError();
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
			let foundTxId = false;
			let stopIterator = foundTxId || current.done;
			let response: any = {};
			while (!stopIterator) {
				foundTxId = current.value.txId === findTxId;
				const { isDelete, timestamp, value, txId } = current.value;
				let payload = null;
				try {
					payload = JSON.parse(value.toString());
				} catch (error) {
					payload = value.toString();
				}
				let currentHistory = {
					txId,
					timestamp,
					isDelete,
					payload,
				};
				console.log(
					`getHistoryTransactionForKey(storeId=${storeId},findTxId=${findTxId},foundTxId=${foundTxId})`,
					currentHistory
				);
				if (foundTxId) {
					response = currentHistory;
					break;
				}
				current = await historyIterator.next();
				stopIterator = foundTxId || current.done;
			}
			if (!foundTxId)
				throw ChaincodeError.fromError(
					"Could not find given transaction history for key.",
					404
				);
			return consistentStringfy(response);
		} catch (error) {
			throw ChaincodeError.fromError(error).toError();
		}
	}
}
