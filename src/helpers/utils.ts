import { Context } from "fabric-contract-api";
export const toBuffer = (data: any) => Buffer.from(JSON.stringify(data));

export const fromUint8Array = (data: Uint8Array) => JSON.parse(data.toString());

export const keyHasData = async (ctx: Context, key: string) => {
	const data: Uint8Array = await ctx.stub.getState(key);
	return !!data && data.length > 0;
};
