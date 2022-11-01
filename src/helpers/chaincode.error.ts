import { consistentStringfy } from "./buffer";

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
		// console.error(this);
	}

	static fromError(error: ChaincodeError | Error | unknown) {
		if (error instanceof ChaincodeError) {
			return new ChaincodeError(
				error.message,
				error.status,
				consistentStringfy(error)
			);
		} else if (error instanceof Error) {
			return new ChaincodeError(error.message, 500, consistentStringfy(error));
		}
		return new ChaincodeError("Unknown Error", 500, consistentStringfy(error));
	}

	toString() {
		return consistentStringfy(this);
	}
}
