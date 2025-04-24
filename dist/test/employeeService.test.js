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
const employeesService_1 = require("../src/api/v1/services/employeesService");
const firestoreRepository_1 = require("../src/api/v1/repositories/firestoreRepository");
jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
    getDocuments: jest.fn(),
    createDocument: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
}));
describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // Test for `getAllEmployees`
    describe("getDocuments", () => {
        it("should return all employees when the request is successful", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock dat
            const mockEmployees = [
                {
                    id: "emp1",
                    data: () => ({
                        name: "John Doe",
                        position: "Manager",
                        department: "Sales",
                        email: "john.doe@example.com",
                        phone: "555-1234",
                        branchId: 1,
                    }),
                },
                {
                    id: "emp2",
                    data: () => ({
                        name: "Jane Smith",
                        position: "Developer",
                        department: "IT",
                        email: "jane.smith@example.com",
                        phone: "555-5678",
                        branchId: 2,
                    }),
                },
            ];
            const mockSnapshot = {
                docs: mockEmployees,
            };
            firestoreRepository_1.getDocuments.mockResolvedValue(mockSnapshot);
            console.log(firestoreRepository_1.getDocuments);
            const result = yield (0, employeesService_1.serviceGetAllEmployees)();
            // Assertions
            expect(firestoreRepository_1.getDocuments).toHaveBeenCalledWith("employees");
            expect(firestoreRepository_1.getDocuments).toHaveBeenCalledTimes(1);
            expect(result).toHaveLength(2);
            expect(result).toEqual([
                {
                    id: "emp1",
                    name: "John Doe",
                    position: "Manager",
                    department: "Sales",
                    email: "john.doe@example.com",
                    phone: "555-1234",
                    branchId: 1,
                },
                {
                    id: "emp2",
                    name: "Jane Smith",
                    position: "Developer",
                    department: "IT",
                    email: "jane.smith@example.com",
                    phone: "555-5678",
                    branchId: 2,
                },
            ]);
        }));
    });
    // Test for `createEmployee`
    describe("Employee Service - createEmployee", () => {
        it("should create a new employee and return it with an id", () => __awaiter(void 0, void 0, void 0, function* () {
            const newEmployeeData = {
                name: "Alice Johnson",
                position: "Designer",
                department: "Design",
                email: "alice.johnson@example.com",
                phone: "555-9876",
                branchId: 3,
            };
            const mockDocId = "newEmployeeId123";
            firestoreRepository_1.createDocument.mockResolvedValue(mockDocId);
            const result = yield (0, employeesService_1.serviceCreateEmployee)(newEmployeeData);
            // Assertions
            expect(firestoreRepository_1.createDocument).toHaveBeenCalledWith("employees", {
                name: newEmployeeData.name,
                position: newEmployeeData.position,
                department: newEmployeeData.department,
                email: newEmployeeData.email,
                phone: newEmployeeData.phone,
                branchId: newEmployeeData.branchId,
            });
            expect(firestoreRepository_1.createDocument).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                id: mockDocId,
                name: newEmployeeData.name,
                position: newEmployeeData.position,
                department: newEmployeeData.department,
                email: newEmployeeData.email,
                phone: newEmployeeData.phone,
                branchId: newEmployeeData.branchId,
            });
        }));
    });
    // Test for `updateEmployee`
    describe("Employee Service - updateEmployee", () => {
        it("should update an employee and return the updated data", () => __awaiter(void 0, void 0, void 0, function* () {
            const employeeId = "emp1";
            const updatedEmployeeData = {
                name: "John Doe Updated",
                position: "Senior Manager",
                department: "Sales",
                email: "john.doe.updated@example.com",
                phone: "555-4321",
                branchId: 1,
            };
            firestoreRepository_1.updateDocument.mockResolvedValue(undefined);
            const result = yield (0, employeesService_1.serviceUpdateEmployee)(employeeId, updatedEmployeeData);
            // Assertions
            expect(firestoreRepository_1.updateDocument).toHaveBeenCalledWith("employees", employeeId, updatedEmployeeData);
            expect(firestoreRepository_1.updateDocument).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                id: employeeId,
                name: updatedEmployeeData.name,
                position: updatedEmployeeData.position,
                department: updatedEmployeeData.department,
                email: updatedEmployeeData.email,
                phone: updatedEmployeeData.phone,
                branchId: updatedEmployeeData.branchId,
            });
        }));
    });
    // Test for `deleteEmployee`
    describe("Employee Service - deleteEmployee", () => {
        it("should delete an employee and not return anything", () => __awaiter(void 0, void 0, void 0, function* () {
            const employeeId = "emp1";
            firestoreRepository_1.deleteDocument.mockResolvedValue(undefined);
            yield (0, employeesService_1.serviceDeleteEmployee)(employeeId);
            // Assertions
            expect(firestoreRepository_1.deleteDocument).toHaveBeenCalledWith("employees", employeeId);
            expect(firestoreRepository_1.deleteDocument).toHaveBeenCalledTimes(1);
        }));
        it("should throw an error if delete fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const employeeId = "emp1";
            firestoreRepository_1.deleteDocument.mockRejectedValue(new Error("Failed to delete"));
            try {
                yield (0, employeesService_1.serviceDeleteEmployee)(employeeId);
            }
            catch (error) {
                expect(error).toEqual(new Error("Failed to delete"));
            }
        }));
    });
});
//# sourceMappingURL=employeeService.test.js.map