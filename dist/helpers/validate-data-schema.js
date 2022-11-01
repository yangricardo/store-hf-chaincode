"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const chaincode_error_1 = require("./chaincode.error");
const defaultErrorValidationOptions = {
    errorMessage: "Invalid Data",
    errorStatus: 400,
    options: {
        abortEarly: false,
    },
};
const validateData = (schema, data, errorOptions = defaultErrorValidationOptions) => {
    const validated = schema.validate((typeof data === "string" && JSON.parse(data)) || data, {
        ...errorOptions?.options,
        abortEarly: false,
    });
    if (validated.error) {
        throw new chaincode_error_1.ChaincodeError(errorOptions?.errorMessage || "Invalid Data", errorOptions?.errorStatus || 400, validated.error.details);
    }
    return validated.value;
};
exports.validateData = validateData;
