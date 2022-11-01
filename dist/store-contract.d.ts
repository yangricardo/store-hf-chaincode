import { Context, Contract } from "fabric-contract-api";
export declare class StoreContract extends Contract {
    healthcheck(ctx: Context): Promise<string>;
    storeExists(ctx: Context, storeId: string): Promise<boolean>;
    createStore(ctx: Context, storeId: string, value: string): Promise<string>;
    readStore(ctx: Context, storeId: string): Promise<string>;
    updateStore(ctx: Context, storeId: string, newValue: string): Promise<string>;
    deleteStore(ctx: Context, storeId: string): Promise<string>;
    getHistoryForKey(ctx: Context, storeId: string): Promise<string>;
    getHistoryTransactionForKey(ctx: Context, storeId: string, findTxId: string): Promise<string>;
}
