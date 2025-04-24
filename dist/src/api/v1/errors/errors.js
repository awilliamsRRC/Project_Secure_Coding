"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.RouteError = exports.ControlError = exports.ServiceError = exports.RepositoryError = void 0;
const errorConstants_1 = require("../../../constants/errorConstants");
const httpConstants_1 = require("../../../constants/httpConstants");
/**
 * Class representing a repository error.
 * Extends the built-in Error class to include an error code.
 */
class RepositoryError extends Error {
    /**
     * Creates a new RepositoryError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} code - The the http response code.
     */
    constructor(message, code, statusCode = httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = "RepositoryError";
        this.code = code;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, RepositoryError.prototype);
    }
}
exports.RepositoryError = RepositoryError;
/**
 * Class representing a service error.
 * Extends the built-in Error class to include an error code.
 */
class ServiceError extends Error {
    /**
     * Creates a new ServiceError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} code - The the http response code.
     */
    constructor(message, code, statusCode = httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = "ServiceError";
        this.code = code;
        this.statusCode = statusCode;
    }
}
exports.ServiceError = ServiceError;
/**
 * Class representing a controller error.
 * Extends the built-in Error class to include an error code.
 */
class ControlError extends Error {
    /**
     * Creates a new ControlError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} statusCode - The the http response code.
     */
    constructor(message = "Server was not reached.", code = errorConstants_1.CONTROL_ERROR_CODE, statusCode = httpConstants_1.HTTP_STATUS.BAD_REQUEST) {
        super(message);
        this.name = "ControlError";
        this.code = code;
        this.statusCode = statusCode;
    }
}
exports.ControlError = ControlError;
/**
 * Class representing a Router error.
 * Extends the built-in Error class to include an error code.
 */
class RouteError extends Error {
    /**
     * Creates a new RouteError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} code - The the http response code.
     */
    constructor(message = "Client Enter Wrong Route", code = errorConstants_1.ROUTE_ERROR_CODE, statusCode = httpConstants_1.HTTP_STATUS.NOT_FOUND) {
        super(message);
        this.name = "RouteError";
        this.code = code;
        this.statusCode = statusCode;
    }
}
exports.RouteError = RouteError;
/**
 * Class representing a validation error.
 * Extends the built-in Error class to include an error code.
 */
class ValidationError extends Error {
    /**
     * Creates a new ValidationError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} code - The the http response code.
     */
    constructor(message = " incorrect data format.", code = errorConstants_1.VALIDATION_ERROR_CODE, statusCode = httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = "ValidationError";
        this.code = code;
        this.statusCode = statusCode;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=errors.js.map