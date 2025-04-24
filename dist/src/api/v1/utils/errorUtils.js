"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = isError;
exports.hasErrorCode = hasErrorCode;
exports.getErrorMessage = getErrorMessage;
exports.getErrorCode = getErrorCode;
exports.getFirebaseErrorStatusCode = getFirebaseErrorStatusCode;
const errorConstants_1 = require("../../../constants/errorConstants");
const httpConstants_1 = require("../../../constants/httpConstants");
/**
 * Type guard to check if an unknown value is an Error object.
 *
 * @param error - Value to check
 * @returns True if the value is an Error instance, false otherwise
 *
 * @example
 * const err: unknown = new Error("Something went wrong");
 * if (isError(err)) {
 *   console.log(err.message); // TypeScript knows err is Error type
 * }
 */
function isError(error) {
    return error instanceof Error;
}
/**
 * Type guard to check if an object has a 'code' property of type string.
 * Useful for handling error objects that may include error codes.
 *
 * @param error - Value to check
 * @returns True if the value is an object with a string code property
 *
 * @example
 * const err: unknown = { code: "NOT_FOUND", message: "Resource not found" };
 * if (hasErrorCode(err)) {
 *   console.log(err.code); // TypeScript knows err has code property
 * }
 */
function hasErrorCode(error) {
    return (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string");
}
/**
 * Safely extracts an error message from an unknown value.
 * Returns the error message if the value is an Error object,
 * otherwise converts the value to a string.
 *
 * @param error - Value to extract message from
 * @returns String representation of the error
 *
 * @example
 * console.log(getErrorMessage(new Error("Oops"))); // "Oops"
 * console.log(getErrorMessage("Raw error")); // "Raw error"
 * console.log(getErrorMessage({ custom: "error" })); // "[object Object]"
 */
function getErrorMessage(error) {
    if (isError(error)) {
        return error.message;
    }
    return String(error);
}
/**
 * Safely extracts an error code from an unknown value.
 * Returns the code if the value has one, otherwise returns UNKNOWN_ERROR_CODE.
 *
 * @param error - Value to extract code from
 * @returns Error code string
 *
 * @example
 * const err = { code: "NOT_FOUND" };
 * console.log(getErrorCode(err)); // "NOT_FOUND"
 * console.log(getErrorCode("string error")); // "UNKNOWN_ERROR"
 */
function getErrorCode(error) {
    if (hasErrorCode(error)) {
        return error.code;
    }
    return errorConstants_1.UNKNOWN_ERROR_CODE;
}
/**
 * Maps Firebase error codes to HTTP status codes.
 * See Firebase error codes documentation:
 * {@link https://firebase.google.com/docs/reference/node/firebase.firestore#firestoreerrorcode}
 *
 * @param error - Firebase error to map
 * @returns HTTP status code
 *
 * @example
 * const firebaseError = { code: "not-found" };
 * console.log(getFirebaseErrorStatusCode(firebaseError)); // 404
 *
 * const unknownError = new Error("Something went wrong");
 * console.log(getFirebaseErrorStatusCode(unknownError)); // 500
 */
function getFirebaseErrorStatusCode(error) {
    if (hasErrorCode(error)) {
        switch (error.code) {
            case "not-found":
                return httpConstants_1.HTTP_STATUS.NOT_FOUND;
            case "already-exists":
                return httpConstants_1.HTTP_STATUS.CONFLICT;
            case "permission-denied":
                return httpConstants_1.HTTP_STATUS.FORBIDDEN;
            case "unauthenticated":
                return httpConstants_1.HTTP_STATUS.UNAUTHORIZED;
            case "invalid-argument":
                return httpConstants_1.HTTP_STATUS.BAD_REQUEST;
            default:
                return httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR;
        }
    }
    return httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR;
}
//# sourceMappingURL=errorUtils.js.map