export class ChaincodeError<RawErrorType = any> {
	name: "ChaincodeError";
	message: string;
	status: string | number;
	details?: RawErrorType;
	constructor(
		message: string,
		status: string | number,
		details: any | undefined = null
	) {
		this.message = message;
		this.status = status;
		this.details = details;
		console.error(this);
	}

	static fromError(error: ChaincodeError | Error | unknown) {
		if (error instanceof ChaincodeError) {
			return error;
		} else if (error instanceof Error) {
			return new ChaincodeError(error.message, 500, {
				name: error.name,
				stack: error.stack,
			});
		}
		return new ChaincodeError("Unkown Error", 500, error);
	}
}
