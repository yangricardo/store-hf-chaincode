import * as Joi from "joi";
declare type ErrorValidationOptions = {
    errorMessage: string | undefined;
    errorStatus: string | number | undefined;
    options: Joi.ValidationOptions | undefined;
} | undefined;
export declare const validateData: <ValidatedDTO = any>(schema: Joi.ObjectSchema<ValidatedDTO>, data: any, errorOptions?: ErrorValidationOptions) => ValidatedDTO;
export {};
//# sourceMappingURL=validate-data-schema.d.ts.map