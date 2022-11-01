const stringify = require("json-stringify-deterministic");
import sortKeysRecursive from "sort-keys-recursive";

export const consistentStringfy = (data: any): string => {
	try {
		const sortedData = sortKeysRecursive(data);
		return stringify(sortedData);
	} catch {
		return JSON.stringify(data);
	}
};

export const toBuffer = (data: any) => {
	const uint8Array = new TextEncoder().encode(consistentStringfy(data));
	return Buffer.from(uint8Array);
};

export const fromUint8Array = <ExpectedDTO = any>(
	data: Uint8Array
): ExpectedDTO => JSON.parse(data.toString());
