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
const branchController_1 = require("../src/api/v1/controllers/branchController");
jest.mock("../src/api/v1/controllers/branchController", () => ({
    controllerGetAllBranches: jest.fn((req, res) => res.status(200).send()),
    controllerCreateBranches: jest.fn((req, res) => res.status(201).send()),
    controllerUpdateBranches: jest.fn((req, res) => res.status(200).send()),
    controllerDeleteBranches: jest.fn((req, res) => res.status(200).send()),
}));
/**
 * Test suite for Branch Routes.
 *
 * This suite tests the API routes for branch-related operations, including
 * getting all branches, creating a new branch, updating an existing branch,
 * and deleting a branch. Each test ensures that the correct controller function
 * is called and that the correct HTTP status codes are returned.
 *
 * @group BranchRoutes
 */
describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    /**
   * Test for the GET `/api/v1/branches` route.
   * This test ensures that the controller for fetching all branches is called correctly
   * and that the response returns with a 200 status code.
   *
   * @test {GET /api/v1/branches}
   */
    describe("GET /api/v1/branches", () => {
        it("should call getAll Branches controller", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get("/api/v1/branches");
            expect(branchController_1.controllerGetAllBranches).toHaveBeenCalled();
            expect(response.status).toBe(200);
        }));
    });
    /**
   * Test for the POST `/api/v1/branches` route.
   * This test ensures that the controller for creating a new branch is called correctly
   * and that the response returns with a 201 status code upon successful creation.
   *
   * @test {POST /api/v1/branches}
   */
    describe("POST /api/v1/branches", () => {
        it("should call createBranchescontroller", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockBranch = {
                id: "1",
                name: "Vancouver Branch",
                address: "123 Main street",
                phone: "+1234567890",
            };
            const response = yield (0, supertest_1.default)(app_1.default).post("/api/v1/branches").send(mockBranch);
            expect(branchController_1.controllerCreateBranches).toHaveBeenCalled();
            expect(response.status).toBe(201);
        }));
    });
    /**
   * Test for the PUT `/api/v1/branches/:id` route.
   * This test ensures that the controller for updating an existing branch is called correctly
   * and that the response returns with a 200 status code after the update.
   *
   * @test {PUT /api/v1/branches/:id}
   */
    describe("PUT /api/v1/branches/:id", () => {
        it("should call updateBranchescontroller", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockBranch = {
                id: "1",
                name: "Vancouver Branch",
                address: "123 Main street",
                phone: "+1234567890",
            };
            const mockId = 1;
            const response = yield (0, supertest_1.default)(app_1.default).put(`/api/v1/branches/${mockId}`).send(mockBranch);
            console.log('Response Body:', response.body);
            expect(branchController_1.controllerUpdateBranches).toHaveBeenCalled();
            expect(response.status).toBe(200);
        }));
    });
    /**
   * Test for the DELETE `/api/v1/branches/:id` route.
   * This test ensures that the controller for deleting an existing branch is called correctly.
   * It verifies that the correct status code is returned upon successful deletion.
   *
   * @test {DELETE /api/v1/branches/:id}
   */
    describe("DELETE /api/v1/branches/:id", () => {
        it("should call deleteBranch controller", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockId = 1;
            const response = yield (0, supertest_1.default)(app_1.default).delete(`/api/v1/branches/${mockId}`);
            expect(branchController_1.controllerDeleteBranches).toHaveBeenCalled();
        }));
    });
});
//# sourceMappingURL=branchRoutes.test.js.map