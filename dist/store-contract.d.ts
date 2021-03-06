import { HealthcheckDTO } from "./helpers";
import { Context, Contract } from "fabric-contract-api";
import { Store } from "./store";
import { Iterators } from "fabric-shim";
import { KeyModification } from "./types";
export declare class StoreContract extends Contract {
    healthcheck(ctx: Context): Promise<HealthcheckDTO>;
    storeExists(ctx: Context, storeId: string): Promise<boolean>;
    createStore(ctx: Context, storeId: string, value: string): Promise<Store>;
    readStore(ctx: Context, storeId: string): Promise<Store>;
    updateStore(ctx: Context, storeId: string, newValue: string): Promise<Store>;
    deleteStore(ctx: Context, storeId: string): Promise<Store>;
    getHistoryForKey(ctx: Context, storeId: string): Promise<KeyModification[]>;
    getHistoryTransactionForKey(ctx: Context, storeId: string, findTxId: string): Promise<Iterators.KeyModification>;
}
