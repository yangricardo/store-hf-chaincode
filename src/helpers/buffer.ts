export const toBuffer = (data: any) => Buffer.from(JSON.stringify(data));

export const fromUint8Array = <ExpectedDTO = any>(
	data: Uint8Array
): ExpectedDTO => JSON.parse(data.toString());
