import { Context } from "fabric-contract-api";
import { ChaincodeError } from "./chaincode.error";
export const toBuffer = (data: any) => Buffer.from(JSON.stringify(data));

export const fromUint8Array = (data: Uint8Array) => JSON.parse(data.toString());

export const keyHasData = async (ctx: Context, key: string) => {
	const data: Uint8Array = await ctx.stub.getState(key);
	return !!data && data.length > 0;
};

export const saveKeyState = async (ctx: Context, key: string, data: any) => {
	const buffer: Buffer = toBuffer(data);
	await ctx.stub.putState(key, buffer);
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

export const recoverKeyState = async <T = any>(
	ctx: Context,
	key: string
): Promise<T> => {
	await requireKeyExists(ctx, key);
	const rawState = await ctx.stub.getState(key);
	return fromUint8Array(rawState);
};
