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

	static fromError(
		error: string | ChaincodeError | Error | unknown,
		status: string | number | undefined = 500
	) {
		if (error instanceof Error) {
			return new ChaincodeError(
				error.message,
				status,
				consistentStringfy(error)
			);
		} else if (error instanceof ChaincodeError) {
			return new ChaincodeError(
				error.message,
				error.status || status,
				consistentStringfy(error)
			);
		} else if (typeof error === "string") {
			return new ChaincodeError(error, status);
		}
		return new ChaincodeError(
			"Unknown Error",
			status,
			consistentStringfy(error)
		);
	}

	toString() {
		return consistentStringfy(this);
	}

	toError() {
		console.error(this);
		return new Error(this.toString());
	}
}
