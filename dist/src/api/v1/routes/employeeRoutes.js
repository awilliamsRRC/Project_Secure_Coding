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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeesController = __importStar(require("../controllers/employeesController"));
const employeeSchema_1 = require("../schemas/employeeSchema");
const validate_1 = require("../middleware/validate");
const routerEmployee = express_1.default.Router();
/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Get all employees
 *     operationId: getAllEmployees
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: A list of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   position:
 *                     type: string
 *                   department:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
routerEmployee.get("/", employeesController.controllerGetAllEmployees);
/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     operationId: createEmployee
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 position:
 *                   type: string
 *                 department:
 *                   type: string
 *       400:
 *         description: Bad request (invalid data)
 *       500:
 *         description: Internal server error
 */
routerEmployee.post("/", (0, validate_1.validateRequest)(employeeSchema_1.employeeSchema), employeesController.controllerCreateEmployees);
/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     operationId: updateEmployee
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid data supplied
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
routerEmployee.put("/:id", (0, validate_1.validateRequest)(employeeSchema_1.employeeSchema), employeesController.controllerUpdateEmployees);
/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     operationId: deleteEmployee
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       400:
 *         description: Invalid employee ID
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
routerEmployee.delete("/:id", employeesController.controllerDeleteEmployees);
exports.default = routerEmployee;
//# sourceMappingURL=employeeRoutes.js.map