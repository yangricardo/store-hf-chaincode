import * as Joi from "joi";
export declare class Store {
    value: string;
    [key: string]: any;
}
export declare const StoreSchema: Joi.ObjectSchema<Store>;
