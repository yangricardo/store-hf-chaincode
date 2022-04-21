export const toBuffer = (data: any) => Buffer.from(JSON.stringify(data));

export const fromUint8Array = (data: Uint8Array) => JSON.parse(data.toString());
