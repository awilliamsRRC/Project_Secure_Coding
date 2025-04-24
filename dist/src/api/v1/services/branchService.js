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
exports.serviceDeleteBranches = exports.serviceUpdateBranches = exports.serviceCreateBranches = exports.serviceGetAllBranches = void 0;
//import { Branch } from "../models/branchmodel";
const firestoreRepository_1 = require("../repositories/firestoreRepository");
const COLLECTION = "branches";
const branches = [];
/**
 * Retrieves all branches from the Firestore database.
 *
 * @async
 * @function serviceGetAllBranches
 * @returns {Promise<Branch[]>} A promise that resolves to an array of branches.
 * @throws {Error} If an error occurs while fetching the branches, it will be thrown.
 */
const serviceGetAllBranches = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield (0, firestoreRepository_1.getDocuments)(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return Object.assign({ id: doc.id }, data);
    });
});
exports.serviceGetAllBranches = serviceGetAllBranches;
/**
 * Creates a new branch in the Firestore database.
 *
 * @async
 * @function serviceCreateBranches
 * @param {Object} branch - The branch data to be created.
 * @param {string} branch.name - The name of the new branch.
 * @param {string} branch.address - The address of the new branch.
 * @param {string} branch.phone - The phone number of the new branch.
 * @returns {Promise<Branch>} A promise that resolves to the created branch, including its ID.
 * @throws {Error} If an error occurs while creating the branch, it will be thrown.
 */
const serviceCreateBranches = (branch) => __awaiter(void 0, void 0, void 0, function* () {
    const newBranch = {
        name: branch.name,
        address: branch.address,
        phone: branch.phone,
    };
    const docId = yield (0, firestoreRepository_1.createDocument)(COLLECTION, newBranch);
    return Object.assign({ id: docId }, newBranch);
});
exports.serviceCreateBranches = serviceCreateBranches;
/**
 * Updates an existing branch in the Firestore database.
 *
 * @async
 * @function serviceUpdateBranches
 * @param {string} id - The ID of the branch to be updated.
 * @param {Object} branch - The updated branch data.
 * @param {string} branch.name - The new name of the branch.
 * @param {string} branch.address - The new address of the branch.
 * @param {string} branch.phone - The new phone number of the branch.
 * @returns {Promise<Branch>} A promise that resolves to the updated branch, including its ID.
 * @throws {Error} If an error occurs while updating the branch, it will be thrown.
 */
const serviceUpdateBranches = (id, branch) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, firestoreRepository_1.updateDocument)(COLLECTION, id, branch);
    return Object.assign({ id }, branch);
});
exports.serviceUpdateBranches = serviceUpdateBranches;
/**
 * Deletes a branch from the Firestore database.
 *
 * @async
 * @function serviceDeleteBranches
 * @param {string} id - The ID of the branch to be deleted.
 * @returns {Promise<void>} A promise that resolves when the branch is deleted.
 * @throws {Error} If an error occurs while deleting the branch, it will be thrown.
 */
const serviceDeleteBranches = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, firestoreRepository_1.deleteDocument)(COLLECTION, id);
});
exports.serviceDeleteBranches = serviceDeleteBranches;
//# sourceMappingURL=branchService.js.map