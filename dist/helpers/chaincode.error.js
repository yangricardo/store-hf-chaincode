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
            return new ChaincodeError(error.message, error.status, (0, buffer_1.consistentStringfy)(error));
        }
        else if (error instanceof Error) {
            return new ChaincodeError(error.message, 500, (0, buffer_1.consistentStringfy)(error));
        }
        return new ChaincodeError("Unknown Error", 500, (0, buffer_1.consistentStringfy)(error));
    }
    toString() {
        return (0, buffer_1.consistentStringfy)(this);
    }
    toError() {
        console.error(this);
        return new Error(this.toString());
    }
}
exports.ChaincodeError = ChaincodeError;
