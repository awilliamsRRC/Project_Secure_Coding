"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const branchController = __importStar(require("../src/api/v1/controllers/branchController"));
const branchService = __importStar(require("../src/api/v1/services/branchService"));
jest.mock('../src/api/v1/services/branchService', () => ({
    serviceGetAllBranches: jest.fn(),
    serviceCreateBranches: jest.fn(),
    serviceUpdateBranches: jest.fn(),
    serviceDeleteBranches: jest.fn(),
}));
/**
 * Test suite for the Branches Controller.
 *
 * This suite includes tests for all CRUD operations (Create, Read, Update, Delete)
 * of the `/api/v1/branches` route, ensuring that the controller interacts
 * correctly with the service layer and handles success and error scenarios appropriately.
 *
 * @group BranchesController
 */
describe('Branches Controller', () => {
    let mockReq;
    let mockRes;
    let mockNext;
    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = {
            params: {},
            body: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        mockNext = jest.fn();
    });
    /**
     * Test for the GET `/api/v1/branches` route.
     * This test ensures that the controller correctly retrieves all branches and responds with a 200 status code.
     *
     * @test {GET /api/v1/branches}
     */
    describe('GET /api/v1/branches', () => {
        it('should call getAllBranches controller', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockBranches = [
                { id: '1', name: 'Branch 1', address: '123 Street', phone: '1234567890' }
            ];
            branchService.serviceGetAllBranches.mockResolvedValue(mockBranches);
            // Act: Call the controller method with the mock request, response, and next function
            yield branchController.controllerGetAllBranches(mockReq, mockRes, mockNext);
            // Assert: Verify that the service method was called
            expect(branchService.serviceGetAllBranches).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200); // Expected status code
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Branches Retrieved',
                data: mockBranches,
            });
        }));
        /**
         * Test for handling errors in the `getAllBranches` controller.
         * Verifies that errors are correctly passed to the next middleware function.
         *
         * @test {GET /api/v1/branches} Error Case
         */
        it('should handle errors in getAllBranches controller', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange: mock the service method to reject with an error
            const mockError = new Error('Error retrieving branches');
            branchService.serviceGetAllBranches.mockRejectedValue(mockError);
            // Act: Call the controller method
            yield branchController.controllerGetAllBranches(mockReq, mockRes, mockNext);
            // Assert: Verify that the next function is called with the error
            expect(mockNext).toHaveBeenCalledWith(mockError);
        }));
    });
    /**
     * Test for the POST `/api/v1/branches` route.
     * This test ensures that the controller correctly creates a new branch and responds with a 201 status code.
     *
     * @test {POST /api/v1/branches}
     */
    describe('POST /api/v1/branches', () => {
        it('should call createBranch controller', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange: mock the service method to return a created branch
            const mockBranch = { id: '3', name: 'New Branch', address: '789 Road', phone: '1122334455' };
            branchService.serviceCreateBranches.mockResolvedValue(mockBranch);
            // Act: Call the controller method with the mock request, response, and next function
            mockReq.body = { name: 'New Branch', address: '789 Road', phone: '1122334455' }; // Simulate incoming data
            yield branchController.controllerCreateBranches(mockReq, mockRes, mockNext);
            // Assert: Verify that the service method was called with the correct arguments
            expect(branchService.serviceCreateBranches).toHaveBeenCalledWith(mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(201); // Expected status for successful creation
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Branch Created',
                data: mockBranch,
            });
        }));
        /**
         * Test for handling errors in the `createBranch` controller.
         * Verifies that errors are passed to the next middleware function.
         *
         * @test {POST /api/v1/branches} Error Case
         */
        it('should handle errors in createBranch controller', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange: mock the service method to reject with an error
            const mockError = new Error('Error creating branch');
            branchService.serviceCreateBranches.mockRejectedValue(mockError);
            // Act: Call the controller method
            yield branchController.controllerCreateBranches(mockReq, mockRes, mockNext);
            // Assert: Verify that the next function is called with the error
            expect(mockNext).toHaveBeenCalledWith(mockError);
        }));
    });
    /**
     * Test for the PUT `/api/v1/branches/:id` route.
     * This test ensures that the controller correctly updates an existing branch and responds with a 200 status code.
     *
     * @test {PUT /api/v1/branches/:id}
     */
    describe('PUT /api/v1/branches/:id', () => {
        /**
         * Test for the successful execution of the `updateBranch` controller.
         * Verifies that the service method is called with the correct arguments and the response is returned successfully.
         *
         * @test {PUT /api/v1/branches/:id} Success Case
         */
        it('should call updateBranch controller', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange: mock the service method to return the updated branch
            const updatedBranch = { id: '1', name: 'Updated Branch', address: '123 Updated Street', phone: '123456789' };
            branchService.serviceUpdateBranches.mockResolvedValue(updatedBranch);
            // Act: Call the controller method with mock request, response, and next function
            mockReq.params = { id: '1' }; // Simulate the branch ID in params
            mockReq.body = { name: 'Updated Branch', address: '123 Updated Street', phone: '123456789' };
            yield branchController.controllerUpdateBranches(mockReq, mockRes, mockNext);
            // Assert: Verify that the service method was called with the correct arguments
            expect(branchService.serviceUpdateBranches).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Branch Updated',
                data: updatedBranch,
            });
        }));
        /**
         * Test for handling errors in the `updateBranch` controller.
         * Verifies that errors are passed to the next middleware function.
         *
         * @test {PUT /api/v1/branches/:id} Error Case
         */
        it('should handle errors in updateBranch controller', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange: mock the service method to reject with an error
            const mockError = new Error('Error updating branch');
            branchService.serviceUpdateBranches.mockRejectedValue(mockError);
            // Act: Call the controller method
            yield branchController.controllerUpdateBranches(mockReq, mockRes, mockNext);
            // Assert: Verify that the next function is called with the error
            expect(mockNext).toHaveBeenCalledWith(mockError);
        }));
    });
    /**
     * Test for the DELETE `/api/v1/branches/:id` route.
     * This test ensures that the controller correctly deletes an existing branch and responds with a 200 status code.
     *
     * @test {DELETE /api/v1/branches/:id}
     */
    describe('DELETE /api/v1/branches/:id', () => {
        /**
        * Test for the successful execution of the `deleteBranch` controller.
        * Verifies that the service method is called with the correct arguments and the response is returned successfully.
        *
        * @test {DELETE /api/v1/branches/:id} Success Case
        */
        it('should call deleteBranch controller', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange: mock the service method to resolve the deletion
            const mockId = '1'; // Simulate the branch ID to delete
            branchService.serviceDeleteBranches.mockResolvedValue(undefined);
            // Act: Call the controller method with mock request, response, and next function
            mockReq.params = { id: mockId };
            yield branchController.controllerDeleteBranches(mockReq, mockRes, mockNext);
            // Assert: Verify that the service method was called with the correct arguments
            expect(branchService.serviceDeleteBranches).toHaveBeenCalledWith(mockId);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalledWith({ message: 'Branch Deleted' });
        }));
        /**
         * Test for handling errors in the `deleteBranch` controller.
         * Verifies that errors are passed to the next middleware function.
         *
         * @test {DELETE /api/v1/branches/:id} Error Case
         */
        it('should handle errors in deleteBranch controller', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange: mock the service method to reject with an error
            const mockError = new Error('Error deleting branch');
            branchService.serviceDeleteBranches.mockRejectedValue(mockError);
            // Act: Call the controller method
            yield branchController.controllerDeleteBranches(mockReq, mockRes, mockNext);
            // Assert: Verify that the next function is called with the error
            expect(mockNext).toHaveBeenCalledWith(mockError);
        }));
    });
});
//# sourceMappingURL=branchControllers.test.js.map