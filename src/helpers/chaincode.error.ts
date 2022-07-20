export class ChaincodeError<RawErrorType = any> {
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
	}
}
