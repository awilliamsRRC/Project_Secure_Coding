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
const employeeController = __importStar(require("../src/api/v1/controllers/employeesController"));
const employeeService = __importStar(require("../src/api/v1/services/employeesService"));
jest.mock("../src/api/v1/services/employeesService");
describe("Employee Controller", () => {
    let mockReq;
    let mockRes;
    let mockNext;
    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {}, query: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
        mockNext = jest.fn();
    });
    /**
     * Tests successful retrieval of all employees.
     */
    describe("getAllEmployees", () => {
        it("should handle successful operation", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockEmployees = [
                { id: "1", name: "John Doe", role: "Developer", department: "Engineering" },
                { id: "2", name: "Jane Smith", role: "Manager", department: "HR" },
            ];
            employeeService.serviceGetAllEmployees.mockResolvedValue(mockEmployees);
            yield employeeController.controllerGetAllEmployees(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved",
                data: mockEmployees,
            });
        }));
        /**
         * Tests error handling in case of failure while retrieving employees.
         */
        it("should handle errors in getAllEmployees", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error("Error retrieving employees");
            employeeService.serviceGetAllEmployees.mockRejectedValue(mockError);
            yield employeeController.controllerGetAllEmployees(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        }));
    });
    /**
     * Tests the controller for creating an employee
     */
    describe("createEmployee", () => {
        it("should create an employee successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockEmployee = {
                id: "3",
                name: "Alice Green",
                role: "Designer",
                department: "Design",
            };
            const mockEmployeeData = {
                name: "Alice Green",
                role: "Designer",
                department: "Design",
            };
            employeeService.serviceCreateEmployee.mockResolvedValue(mockEmployee);
            mockReq.body = mockEmployeeData;
            yield employeeController.controllerCreateEmployees(mockReq, mockRes, mockNext);
            expect(employeeService.serviceCreateEmployee).toHaveBeenCalledWith(mockEmployeeData);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Created",
                data: mockEmployee,
            });
        }));
        /**
         * Tests error handling during employee creation.
         */
        it("should handle errors in createEmployee", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error("Error creating employee");
            employeeService.serviceCreateEmployee.mockRejectedValue(mockError);
            yield employeeController.controllerCreateEmployees(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        }));
    });
    /**
     * Tests the controller for updating an employee
     */
    describe("updateEmployee", () => {
        /**
         * Tests successful update of an employee.
         */
        it("should update an employee successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockId = "1";
            const mockUpdatedEmployee = {
                id: "1",
                name: "John Doe Updated",
                role: "Senior Developer",
                department: "Engineering",
            };
            const updateData = {
                name: "John Doe Updated",
                role: "Senior Developer",
                department: "Engineering",
            };
            employeeService.serviceUpdateEmployee.mockResolvedValue(mockUpdatedEmployee);
            mockReq.params = { id: mockId };
            mockReq.body = updateData;
            yield employeeController.controllerUpdateEmployees(mockReq, mockRes, mockNext);
            expect(employeeService.serviceUpdateEmployee).toHaveBeenCalledWith(mockId, updateData);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Updated",
                data: mockUpdatedEmployee,
            });
        }));
        /**
         * Tests error handling during employee update.
         */
        it("should handle errors in updateEmployee", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error("Error updating employee");
            employeeService.serviceUpdateEmployee.mockRejectedValue(mockError);
            yield employeeController.controllerUpdateEmployees(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        }));
    });
    /**
     * Tests the controller for deleting an employee
     */
    describe("deleteEmployee", () => {
        /**
         * Tests successful deletion of an employee.
         */
        it("should delete an employee successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockId = "1";
            employeeService.serviceDeleteEmployee.mockResolvedValue(undefined);
            mockReq.params = { id: mockId };
            yield employeeController.controllerDeleteEmployees(mockReq, mockRes, mockNext);
            expect(employeeService.serviceDeleteEmployee).toHaveBeenCalledWith(mockId);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.send).toHaveBeenCalledWith({ message: "Employee Deleted" });
        }));
        /**
         * Tests error handling during employee deletion.
         */
        it("should handle errors in deleteEmployee", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error("Error deleting employee");
            employeeService.serviceDeleteEmployee.mockRejectedValue(mockError);
            yield employeeController.controllerDeleteEmployees(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalledWith(mockError);
        }));
    });
});
//# sourceMappingURL=employeeController.test.js.map