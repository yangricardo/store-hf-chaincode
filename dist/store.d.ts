import Joi from "joi";
export interface Store {
    value: string;
    [key: string]: any;
}
export declare const StoreSchema: Joi.ObjectSchema<Store>;
