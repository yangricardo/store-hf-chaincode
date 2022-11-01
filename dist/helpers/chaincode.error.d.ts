/// <reference types="fabric-shim-api" />
/// <reference types="fabric-shim" />
export declare class ChaincodeError<RawErrorType = any> {
    name: "ChaincodeError";
    message: string;
    status: string | number;
    details?: RawErrorType;
    constructor(message: string, status: string | number, details?: any | undefined);
    static fromError(error: ChaincodeError | Error | unknown): ChaincodeError<any>;
    toString(): any;
    toShimResponseError(): import("fabric-shim-api").ChaincodeResponse;
}
//# sourceMappingURL=chaincode.error.d.ts.map