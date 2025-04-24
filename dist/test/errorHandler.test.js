"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../src/api/v1/errors/errors");
const errorHandler_1 = __importDefault(require("../src/api/v1/middleware/errorHandler"));
const responseModel_1 = require("../src/api/v1/models/responseModel");
// Mock the console.error to avoid cluttering test output
console.error = jest.fn();
describe("Error Handler Middleware", () => {
    let mockReq;
    let mockRes;
    let mockNext;
    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });
    /**
     * Tests handling of a RepositoryError with a custom status and error code.
     */
    it("should handle RepositoryError with custom status code and error code", () => {
        // Arrange
        const testError = new errors_1.RepositoryError("Document not found", "DOCUMENT_NOT_FOUND", 404);
        // Act
        (0, errorHandler_1.default)(testError, mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith((0, responseModel_1.errorResponse)("Document not found", "DOCUMENT_NOT_FOUND"));
        expect(console.error).toHaveBeenCalledWith("Error: Document not found");
    });
    /**
     * Tests handling of a ServiceError with a custom status and error code.
     */
    it("should handle ServiceError with custom status code and error code", () => {
        // Arrange
        const testError = new errors_1.ServiceError("Invalid input", "INVALID_INPUT", 400);
        // Act
        (0, errorHandler_1.default)(testError, mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith((0, responseModel_1.errorResponse)("Invalid input", "INVALID_INPUT"));
    });
    /**
     * Tests handling of a basic Error object with default status and error code.
     */
    it("should handle basic Error object with default status and code", () => {
        // Arrange
        const testError = new Error("Basic error");
        // Act
        (0, errorHandler_1.default)(testError, mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith((0, responseModel_1.errorResponse)("An unexpected error occurred", "UNKNOWN_ERROR"));
        expect(console.error).toHaveBeenCalledWith("Error: Basic error");
    });
    /**
     * Tests handling of malformed Error objects.
     */
    it("should handle malformed Error objects", () => {
        // Arrange
        const testError = {};
        // Act
        (0, errorHandler_1.default)(testError, mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith((0, responseModel_1.errorResponse)("An unexpected error occurred", "UNKNOWN_ERROR"));
        expect(console.error).toHaveBeenCalledWith("Error: undefined");
    });
    /**
     * Tests handling of null errors.
     */
    it("should handle null errors", () => {
        // Arrange
        const testError = null;
        // Act
        (0, errorHandler_1.default)(testError, mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith((0, responseModel_1.errorResponse)("An unexpected error occurred", "UNKNOWN_ERROR"));
        expect(console.error).toHaveBeenCalledWith("Error: null or undefined error received");
    });
    /**
     * Tests handling of a ControlError with a custom status and error code.
     */
    it("It should test Control Error with custom and error code", () => {
        // Arrange
        const testError = new errors_1.ControlError("Document not found", "DOCUMENT_NOT_FOUND", 400);
        // Act
        (0, errorHandler_1.default)(testError, mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith((0, responseModel_1.errorResponse)("Document not found", "DOCUMENT_NOT_FOUND"));
        expect(console.error).toHaveBeenCalledWith("Error: Document not found");
    });
    /**
     * Tests handling of a RouteError with a custom status and error code.
     */
    it("It should test Route Error with custom and error code", () => {
        // Arrange
        const testError = new errors_1.RouteError("Document not found", "DOCUMENT_NOT_FOUND", 404);
        // Act
        (0, errorHandler_1.default)(testError, mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith((0, responseModel_1.errorResponse)("Document not found", "DOCUMENT_NOT_FOUND"));
        expect(console.error).toHaveBeenCalledWith("Error: Document not found");
    });
    /**
    * Tests handling of a ValidationError with a custom status and error code.
    */
    it("It should test Validate Error with custom and error code", () => {
        // Arrange
        const testError = new errors_1.ValidationError("Document not found", "DOCUMENT_NOT_FOUND", 500);
        // Act
        (0, errorHandler_1.default)(testError, mockReq, mockRes, mockNext);
        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith((0, responseModel_1.errorResponse)("Document not found", "DOCUMENT_NOT_FOUND"));
        expect(console.error).toHaveBeenCalledWith("Error: Document not found");
    });
});
//# sourceMappingURL=errorHandler.test.js.map