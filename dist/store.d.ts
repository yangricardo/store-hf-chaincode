import * as Joi from "joi";
export interface Store {
    value: any;
    [key: string]: any;
}
export declare const StoreSchema: Joi.ObjectSchema<Store>;
//# sourceMappingURL=store.d.ts.map