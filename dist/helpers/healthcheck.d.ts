import { Context } from "fabric-contract-api";
export declare class HealthcheckDTO {
    readonly binding: string;
    readonly channelId: string;
    readonly creator: {
        mspid: string;
        id: string;
    };
    readonly dateTimestamp: string;
    readonly tx: {
        id: string;
        timestamp: string;
    };
    readonly client: {
        id: string;
        mspId: string;
    };
    constructor(ctx: Context);
}
