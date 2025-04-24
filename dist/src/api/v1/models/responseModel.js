"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
/**
 * Creates a standardized success response object.
 * Use this helper to ensure consistent success response formatting.
 *
 * @template T - The type of data being returned
 * @param data - Optional payload to be returned to the client
 * @param message - Optional success message
 * @returns A properly formatted success response object
 *
 * @example
 * // Basic success response
 * return successResponse({ id: "123" }, "User created successfully");
 *
 * @example
 * // Typed success response
 * interface User {
 *   id: string;
 *   name: string;
 * }
 * return successResponse<User>(
 *   { id: "123", name: "John" },
 *   "User retrieved successfully"
 * );
 *
 * @example
 * // Success response without data
 * return successResponse(undefined, "Operation completed");
 */
const successResponse = (data, message) => ({
    status: "success",
    data,
    message,
});
exports.successResponse = successResponse;
/**
 * Creates a standardized error response object.
 * Use this helper to ensure consistent error response formatting.
 *
 * @param message - Error message describing what went wrong
 * @param code - Optional error code for client-side error handling
 * @returns A properly formatted error response object
 *
 * @example
 * // Basic error response
 * return errorResponse("Invalid input provided");
 *
 * @example
 * // Error response with code
 * return errorResponse(
 *   "User not found",
 *   "USER_NOT_FOUND"
 * );
 *
 * @example
 * // In an Express route handler
 * app.get('/users/:id', (req, res) => {
 *   try {
 *     // ... operation
 *   } catch (error) {
 *     return res.status(404).json(
 *       errorResponse("User not found", "USER_NOT_FOUND")
 *     );
 *   }
 * });
 */
const errorResponse = (message, code) => ({
    status: "error",
    message,
    code,
});
exports.errorResponse = errorResponse;
//# sourceMappingURL=responseModel.js.map