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
    static fromError(error, status = 500) {
        if (error instanceof Error) {
            return new ChaincodeError(error.message, status, (0, buffer_1.consistentStringfy)(error));
        }
        else if (error instanceof ChaincodeError) {
            return error;
        }
        else if (typeof error === "string") {
            return new ChaincodeError(error, status);
        }
        return new ChaincodeError("Unknown Error", status, (0, buffer_1.consistentStringfy)(error));
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
