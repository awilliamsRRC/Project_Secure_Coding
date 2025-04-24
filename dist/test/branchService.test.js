"use strict";
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
const branchService_1 = require("../src/api/v1/services/branchService");
const firestoreRepository_1 = require("../src/api/v1/repositories/firestoreRepository");
jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
    getDocuments: jest.fn(),
    createDocument: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
    getDocumentsByFieldValue: jest.fn(),
}));
/**
 * Test suite for Branch Service functions.
 *
 * This suite tests the service functions for interacting with branch data, including
 * retrieving, creating, updating, and deleting branches. Each test ensures that the
 * corresponding service function calls the required database functions and returns
 * the expected results.
 *
 * @group BranchService
 */
describe("Branch Service", () => {
    describe("getDocuments", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return all branches when the request is successful", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock data
            const mockDocs = [
                {
                    id: "item1",
                    data: () => ({
                        //id: "1",
                        name: "John Brown",
                        address: "Canada Street",
                        phone: "123456789",
                    }),
                },
                {
                    id: "item2",
                    data: () => ({
                        //id: "2",
                        name: "Jane Doe",
                        address: "Winnipeg",
                        phone: "9876545",
                    }),
                },
            ];
            const mockSnapshot = {
                docs: mockDocs,
            };
            firestoreRepository_1.getDocuments.mockResolvedValue(mockSnapshot);
            console.log(firestoreRepository_1.getDocuments);
            const result = yield (0, branchService_1.serviceGetAllBranches)();
            // Assertions
            expect(firestoreRepository_1.getDocuments).toHaveBeenCalledWith("branches");
            expect(firestoreRepository_1.getDocuments).toHaveBeenCalledTimes(1);
            console.log(firestoreRepository_1.getDocuments);
            expect(result).toHaveLength(2);
            console.log(result);
            expect(result[0]).toEqual({
                id: "item1",
                name: "John Brown",
                address: "Canada Street",
                phone: "123456789",
            });
            expect(result[1]).toEqual({
                id: "item2",
                name: "Jane Doe",
                address: "Winnipeg",
                phone: "9876545",
            });
        }));
    });
    /**
   * Test for the `createBranch` service function.
   * This test ensures that a new branch is created and returned with an ID.
   *
   * @test {createDocument}
   */
    describe("Branch Service - createBranch", () => {
        it("should create a new branch and return it with an id", () => __awaiter(void 0, void 0, void 0, function* () {
            const newBranchData = {
                name: "John's Store",
                address: "123 Main St",
                phone: "555-*1234",
            };
            const mockDocID = "newBranchId123";
            firestoreRepository_1.createDocument.mockResolvedValue(mockDocID);
            const result = yield (0, branchService_1.serviceCreateBranches)(newBranchData);
            expect(firestoreRepository_1.createDocument).toHaveBeenCalledWith("branches", {
                name: newBranchData.name,
                address: newBranchData.address,
                phone: newBranchData.phone,
            });
            expect(firestoreRepository_1.createDocument).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                id: mockDocID,
                name: newBranchData.name,
                address: newBranchData.address,
                phone: newBranchData.phone,
            });
        }));
    });
    /**
   * Test for the `updateBranch` service function.
   * This test ensures that an existing branch is updated and returned with the updated data.
   *
   * @test {updateDocument}
   */
    describe("Branch Service - Update Branch", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should update a branch and return the updated branch", () => __awaiter(void 0, void 0, void 0, function* () {
            const branchId = "12345";
            const updatedBranchData = {
                name: "Updated Store",
                address: "456 Updated St.",
                phone: "555-9876",
            };
            firestoreRepository_1.updateDocument.mockResolvedValue(undefined);
            const result = yield (0, branchService_1.serviceUpdateBranches)(branchId, updatedBranchData);
            expect(firestoreRepository_1.updateDocument).toHaveBeenCalledWith("branches", branchId, updatedBranchData);
            expect(firestoreRepository_1.updateDocument).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                id: branchId,
                name: updatedBranchData.name,
                address: updatedBranchData.address,
                phone: updatedBranchData.phone
            });
        }));
    });
    /**
   * Test for the `deleteBranch` service function.
   * This test ensures that an existing branch is deleted without any return value.
   *
   * @test {deleteDocument}
   */
    describe("Branch Service - Delete Branch", () => {
        beforeEach(() => {
            jest.clearAllMocks(); // Ensure mocks are cleared before each test
        });
        it("should delete a branch and not return anything", () => __awaiter(void 0, void 0, void 0, function* () {
            const branchId = "12345";
            // Mock deleteDocument to resolve successfully without doing anything
            firestoreRepository_1.deleteDocument.mockResolvedValue(undefined);
            // Call the service function
            yield (0, branchService_1.serviceDeleteBranches)(branchId);
            // Verify that deleteDocument was called with the correct arguments
            expect(firestoreRepository_1.deleteDocument).toHaveBeenCalledWith("branches", branchId);
            expect(firestoreRepository_1.deleteDocument).toHaveBeenCalledTimes(1);
        }));
    });
});
//# sourceMappingURL=branchService.test.js.map