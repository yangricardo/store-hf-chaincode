"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaincodeError = void 0;
const buffer_1 = require("./buffer");
class ChaincodeError {
    name;
    message;
    status;
    details;
    constructor(message, status, details = null) {
        this.message = message;
        this.status = status;
        this.details = details;
    }
    static fromError(error) {
        if (error instanceof ChaincodeError) {
            return new ChaincodeError(error.message, error.status, error);
        }
        else if (error instanceof Error) {
            return new ChaincodeError(error.message, 500, error);
        }
        return new ChaincodeError("Unknown Error", 500, error);
    }
    toString() {
        return (0, buffer_1.consistentStringfy)(this);
    }
}
exports.ChaincodeError = ChaincodeError;
