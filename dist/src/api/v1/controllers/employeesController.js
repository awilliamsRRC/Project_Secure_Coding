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
exports.controllerDeleteEmployees = exports.controllerUpdateEmployees = exports.controllerCreateEmployees = exports.controllerGetAllEmployees = void 0;
const employeesService = __importStar(require("../services/employeesService"));
/**
 * Controller to handle the retrieval of all employees.
 *
 * @async
 * @function controllerGetAllEmployees
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object to send back the employee data.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while retrieving the employees, it will be passed to the next middleware.
 */
const controllerGetAllEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employeesService.serviceGetAllEmployees();
        res.status(200).json({ message: "Employees Retrieved", data: employees });
    }
    catch (error) {
        next(error);
    }
});
exports.controllerGetAllEmployees = controllerGetAllEmployees;
/**
 * Controller to handle the creation of a new employee.
 *
 * @async
 * @function controllerCreateEmployees
 * @param {Request} req - The request object containing the data for the new employee.
 * @param {Response} res - The response object to send back the created employee data.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while creating the employee, it will be passed to the next middleware.
 */
const controllerCreateEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEmployee = yield employeesService.serviceCreateEmployee(req.body);
        res.status(201).json({ message: "Employee Created", data: newEmployee });
    }
    catch (error) {
        next(error);
    }
});
exports.controllerCreateEmployees = controllerCreateEmployees;
/**
 * Controller to handle the updating of an employee's details.
 *
 * @async
 * @function controllerUpdateEmployees
 * @param {Request} req - The request object containing the employee ID in the URL params and the updated data in the body.
 * @param {Response} res - The response object to send back the updated employee data.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while updating the employee, it will be passed to the next middleware.
 */
const controllerUpdateEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEmployee = yield employeesService.serviceUpdateEmployee(req.params.id, req.body);
        res.status(200).json({ message: "Employee Updated", data: updatedEmployee });
    }
    catch (error) {
        next(error);
    }
});
exports.controllerUpdateEmployees = controllerUpdateEmployees;
/**
 * Controller to handle the deletion of an employee.
 *
 * @async
 * @function controllerDeleteEmployees
 * @param {Request} req - The request object containing the employee ID in the URL params.
 * @param {Response} res - The response object to send back a success message.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while deleting the employee, it will be passed to the next middleware.
 */
const controllerDeleteEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield employeesService.serviceDeleteEmployee(req.params.id);
        res.status(200).send({ message: "Employee Deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.controllerDeleteEmployees = controllerDeleteEmployees;
//# sourceMappingURL=employeesController.js.map