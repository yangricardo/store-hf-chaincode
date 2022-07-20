import { Context } from "fabric-contract-api";
export interface HealthcheckDTO {
    binding: string;
    channelId: string;
    creator: {
        mspid: string;
        id: string;
    };
    dateTimestamp: string;
    tx: {
        id: string;
        timestamp: string;
    };
    client: {
        id: string;
        mspId: string;
    };
}
export declare const buildHealthcheckFromContext: (ctx: Context) => HealthcheckDTO;
