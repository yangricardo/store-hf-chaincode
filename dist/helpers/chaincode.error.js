"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaincodeError = void 0;
class ChaincodeError {
    constructor(message, status, details = null) {
        this.message = message;
        this.status = status;
        this.details = details;
        // console.error(this);
    }
    static fromError(error) {
        if (error instanceof ChaincodeError) {
            return error;
        }
        else if (error instanceof Error) {
            return new ChaincodeError(error.message, 500, {
                name: error.name,
                stack: error.stack,
            });
        }
        return new ChaincodeError("Unkown Error", 500, error);
    }
}
exports.ChaincodeError = ChaincodeError;
//# sourceMappingURL=chaincode.error.js.map