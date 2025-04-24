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
exports.serviceDeleteEmployee = exports.serviceUpdateEmployee = exports.serviceCreateEmployee = exports.serviceGetAllEmployees = void 0;
const firestoreRepository_1 = require("../repositories/firestoreRepository");
const COLLECTION = "employees";
const employees = [];
/**
 * Retrieves all employees from the Firestore database.
 *
 * @async
 * @function serviceGetAllEmployees
 * @returns {Promise<Employee[]>} A promise that resolves to an array of employees.
 * @throws {Error} If an error occurs while fetching the employees, it will be thrown.
 */
const serviceGetAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield (0, firestoreRepository_1.getDocuments)(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return Object.assign({ id: doc.id }, data);
    });
});
exports.serviceGetAllEmployees = serviceGetAllEmployees;
/**
 * Creates a new employee in the Firestore database.
 *
 * @async
 * @function serviceCreateEmployee
 * @param {Object} employee - The employee data to be created.
 * @param {string} employee.name - The name of the new employee.
 * @param {string} employee.position - The position of the new employee.
 * @param {string} employee.email - The email address of the new employee.
 * @param {string} employee.phone - The phone number of the new employee.
 * @param {number} employee.branchId - The branch ID where the employee works.
 * @param {string} employee.department - The department of the new employee.
 * @returns {Promise<Employee>} A promise that resolves to the created employee, including its ID.
 * @throws {Error} If an error occurs while creating the employee, it will be thrown.
 */
const serviceCreateEmployee = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    const newEmployee = {
        name: employee.name,
        position: employee.position,
        email: employee.email,
        phone: employee.phone,
        branchId: employee.branchId,
        department: employee.department,
    };
    const docId = yield (0, firestoreRepository_1.createDocument)(COLLECTION, newEmployee);
    return Object.assign({ id: docId }, newEmployee);
});
exports.serviceCreateEmployee = serviceCreateEmployee;
/**
 * Updates an existing employee in the Firestore database.
 *
 * @async
 * @function serviceUpdateEmployee
 * @param {string} id - The ID of the employee to be updated.
 * @param {Object} employee - The updated employee data.
 * @param {string} employee.name - The new name of the employee.
 * @param {string} employee.position - The new position of the employee.
 * @param {string} employee.department - The new department of the employee.
 * @param {string} employee.email - The new email address of the employee.
 * @param {string} employee.phone - The new phone number of the employee.
 * @param {number} employee.branchId - The new branch ID of the employee.
 * @returns {Promise<Employee>} A promise that resolves to the updated employee, including its ID.
 * @throws {Error} If an error occurs while updating the employee, it will be thrown.
 */
const serviceUpdateEmployee = (id, employee) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, firestoreRepository_1.updateDocument)(COLLECTION, id, employee);
    return Object.assign({ id }, employee);
});
exports.serviceUpdateEmployee = serviceUpdateEmployee;
/**
 * Deletes an employee from the Firestore database.
 *
 * @async
 * @function serviceDeleteEmployee
 * @param {string} id - The ID of the employee to be deleted.
 * @returns {Promise<void>} A promise that resolves when the employee is deleted.
 * @throws {Error} If an error occurs while deleting the employee, it will be thrown.
 */
const serviceDeleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, firestoreRepository_1.deleteDocument)(COLLECTION, id);
});
exports.serviceDeleteEmployee = serviceDeleteEmployee;
//# sourceMappingURL=employeesService.js.map