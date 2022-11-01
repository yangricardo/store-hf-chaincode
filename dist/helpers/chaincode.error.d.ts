export declare class ChaincodeError<RawErrorType = any> {
    name: "ChaincodeError";
    message: string;
    status: string | number;
    details?: RawErrorType;
    constructor(message: string, status: string | number, details?: any | undefined);
    static fromError(error: string | ChaincodeError | Error | unknown, status?: string | number | undefined): ChaincodeError<any>;
    toString(): string;
    toError(): Error;
}
//# sourceMappingURL=chaincode.error.d.ts.map