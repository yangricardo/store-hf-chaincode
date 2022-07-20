import * as Joi from "joi";
import { ChaincodeError } from "./chaincode.error";

type ErrorValidationOptions =
	| {
			errorMessage: string | undefined;
			errorStatus: string | number | undefined;
			options: Joi.ValidationOptions | undefined;
	  }
	| undefined;

const defaultErrorValidationOptions = {
	errorMessage: "Invalid Data",
	errorStatus: 400,
	options: {
		abortEarly: false,
	},
};

export const validateData = <ValidatedDTO = any>(
	schema: Joi.ObjectSchema<ValidatedDTO>,
	data: any,
	errorOptions: ErrorValidationOptions = defaultErrorValidationOptions
) => {
	const validated = schema.validate(data, {
		...errorOptions?.options,
		abortEarly: false,
	});
	if (validated.error) {
		throw new ChaincodeError(
			errorOptions?.errorMessage || "Invalid Data",
			errorOptions?.errorStatus || 400,
			validated.error.details
		);
	}
	return validated.value;
};
