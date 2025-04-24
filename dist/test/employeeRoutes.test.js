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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const employeesController_1 = require("../src/api/v1/controllers/employeesController");
jest.mock("../src/api/v1/controllers/employeesController", () => ({
    controllerGetAllEmployees: jest.fn((req, res) => res.status(200).json({ message: 'Employees Retrieved', data: [] })),
    controllerCreateEmployees: jest.fn((req, res) => res.status(201).json({ message: 'Employee Created', data: req.body })),
    controllerUpdateEmployees: jest.fn((req, res) => res.status(200).json({ message: 'Employee Updated', data: req.body })),
    controllerDeleteEmployees: jest.fn((req, res) => res.status(200).json({ message: 'Employee Deleted' })),
}));
describe("Employee Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    // Test for GET /api/v1/employees
    describe("GET /api/v1/employees", () => {
        it("should call getAllEmployees controller", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default).get("/api/v1/employees");
            expect(employeesController_1.controllerGetAllEmployees).toHaveBeenCalled();
        }));
    });
    // Test for POST /api/v1/employees
    describe("POST /api/v1/employees", () => {
        it("should call createEmployee controller", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockEmployee = {
                id: "1",
                name: "John Brown",
                position: "Branch Manager",
                department: "Managmenet",
                email: "test@email.com",
                phone: "12456789",
                branchId: "1"
            };
            yield (0, supertest_1.default)(app_1.default).post("/api/v1/employees").send(mockEmployee);
            expect(employeesController_1.controllerCreateEmployees).toHaveBeenCalled();
        }));
    });
    // Test for PUT /api/v1/employees/:id
    describe("PUT /api/v1/employees/:id", () => {
        it("should call updateEmployee controller", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockEmployee = {
                id: "1",
                name: "John Brown",
                position: "Branch Manager",
                department: "Managmenet",
                email: "test@email.com",
                phone: "12456789",
                branchId: "1"
            };
            const mockId = 1;
            // Log the mock employee and ID being sent
            console.log("Mock employee data:", mockEmployee);
            console.log("Mock employee ID:", mockId);
            const response = yield (0, supertest_1.default)(app_1.default).put(`/api/v1/employees/${mockId}`).send(mockEmployee);
            console.log("Response from PUT request:", response.body);
            expect(employeesController_1.controllerUpdateEmployees).toHaveBeenCalled();
        }));
    });
    // Test for DELETE /api/v1/employees/:id
    describe("DELETE /api/v1/employees/:id", () => {
        it("should call deleteEmployee controller", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default).delete("/api/v1/employees/1");
            expect(employeesController_1.controllerDeleteEmployees).toHaveBeenCalled();
        }));
    });
});
//# sourceMappingURL=employeeRoutes.test.js.map