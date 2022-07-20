import { Context, Contract } from "fabric-contract-api";
import { Store } from "./store";
import { Iterators } from "fabric-shim";
import { KeyModification } from "./types";
import { HealthcheckDTO } from "./helpers/healthcheck";
export declare class StoreContract extends Contract {
    healthcheck(ctx: Context): Promise<HealthcheckDTO>;
    storeExists(ctx: Context, storeId: string): Promise<boolean>;
    createStore(ctx: Context, storeId: string, value: string): Promise<Store>;
    readStore(ctx: Context, storeId: string): Promise<Store>;
    updateStore(ctx: Context, storeId: string, newValue: string): Promise<Store>;
    deleteStore(ctx: Context, storeId: string): Promise<boolean>;
    getHistoryForKey(ctx: Context, storeId: string): Promise<KeyModification[]>;
    getHistoryTransactionForKey(ctx: Context, storeId: string, txId: string): Promise<Iterators.KeyModification>;
}
