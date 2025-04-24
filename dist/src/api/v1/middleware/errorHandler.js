"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors/errors");
const httpConstants_1 = require("../../../constants/httpConstants");
const responseModel_1 = require("../models/responseModel");
/**
 * Global error handling middleware for an Express application.
 * Catches all errors passed to next() and formats them into a consistent response format.
 *
 * @param err - The error object passed from previous middleware or route handlers
 * @param req - Express request object
 * @param res - Express response object
 * @param _next - Express next function (unused but required for Express error middleware signature)
 *
 * Features:
 * - Handles RepositoryError and ServiceError with their specific status codes and messages
 * - Provides consistent error response format
 * - Logs errors for debugging
 *
 * @example
 * // In your Express app setup after all other middleware and controllers:
 * app.use(errorHandler);
 *
 * // In your route handlers:
 * router.get('/users/:id', async (req, res, next) => {
 *   try {
 *     // ... your logic
 *   } catch (error: unknown) {
 *     if (error instanceof RepositoryError) {
 *       next(error);  // Will be handled with proper status code and message
 *     } else {
 *       next(new ServiceError("User operation failed", "USER_ERROR", 400));
 *     }
 *   }
 * });
 */
const errorHandler = (err, req, res, _next // Underscore prefix indicates this parameter is required but unused
) => {
    if (!err) {
        console.error("Error: null or undefined error received");
        res.status(httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json((0, responseModel_1.errorResponse)("An unexpected error occurred", "UNKNOWN_ERROR"));
        return;
    }
    // Log the error message for debugging
    console.error(`Error: ${err.message}`);
    if (err instanceof errors_1.RepositoryError || err instanceof errors_1.ServiceError) {
        res.status(err.statusCode).json((0, responseModel_1.errorResponse)(err.message, err.code));
    }
    else if (err instanceof errors_1.ControlError) {
        res.status(err.statusCode).json((0, responseModel_1.errorResponse)(err.message, err.code));
    }
    else if (err instanceof errors_1.RouteError) {
        res.status(err.statusCode).json((0, responseModel_1.errorResponse)(err.message, err.code));
    }
    else if (err instanceof errors_1.ValidationError) {
        res.status(err.statusCode).json((0, responseModel_1.errorResponse)(err.message, err.code));
    }
    else {
        res.status(httpConstants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json((0, responseModel_1.errorResponse)("An unexpected error occurred", "UNKNOWN_ERROR"));
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map