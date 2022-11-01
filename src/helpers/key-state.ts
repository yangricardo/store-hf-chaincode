import { Context } from "fabric-contract-api";
import { fromUint8Array, toBuffer } from "./buffer";
import { ChaincodeError } from "./chaincode.error";

export const keyHasData = async (ctx: Context, key: string) => {
	const data: Uint8Array = await ctx.stub.getState(key);
	return !!data && data.length > 0;
};

export const requireKeyExists = async (ctx: Context, key: string) => {
	const stateExists = await keyHasData(ctx, key);
	if (!stateExists) {
		throw new ChaincodeError(`Data not found for given key`, 404, {
			keyNotFound: key,
		});
	}
};

export const requireKeyNotExists = async (ctx: Context, key: string) => {
	const stateExists = await keyHasData(ctx, key);
	if (stateExists) {
		throw new ChaincodeError(`The given key already has data`, 409, {
			keyFound: key,
		});
	}
};

export const recoverKeyState = async <T = any>(ctx: Context, key: string) => {
	await requireKeyExists(ctx, key);
	const rawState = await ctx.stub.getState(key);
	return fromUint8Array<T>(rawState);
};

export const saveKeyState = async (ctx: Context, key: string, data: any) => {
	const buffer: Buffer = toBuffer(data);
	await ctx.stub.putState(key, buffer);
	return buffer.toString("utf-8");
};
