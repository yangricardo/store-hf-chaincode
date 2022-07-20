import { Context } from "fabric-contract-api";
export declare const keyHasData: (ctx: Context, key: string) => Promise<boolean>;
export declare const requireKeyExists: (ctx: Context, key: string) => Promise<void>;
export declare const requireKeyNotExists: (ctx: Context, key: string) => Promise<void>;
export declare const recoverKeyState: <T = any>(ctx: Context, key: string) => Promise<T>;
export declare const saveKeyState: (ctx: Context, key: string, data: any) => Promise<void>;
