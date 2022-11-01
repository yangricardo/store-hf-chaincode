const stringify = require("json-stringify-deterministic");
import sortKeysRecursive from "sort-keys-recursive";

export const consistentStringfy = (data: any) => {
	try {
		const sortedData = sortKeysRecursive(data);
		return stringify(sortedData);
	} catch {
		return JSON.stringify(data);
	}
};

export const toBuffer = (data: any) => Buffer.from(consistentStringfy(data));

export const fromUint8Array = <ExpectedDTO = any>(
	data: Uint8Array
): ExpectedDTO => JSON.parse(data.toString());
