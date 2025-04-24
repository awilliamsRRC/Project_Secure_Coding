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
exports.controllerDeleteBranches = exports.controllerUpdateBranches = exports.controllerCreateBranches = exports.controllerGetAllBranches = void 0;
const branchService = __importStar(require("../services/branchService"));
/**
 * Controller to handle the retrieval of all branches.
 *
 * @async
 * @function controllerGetAllBranches
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object to send data back to the client.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while fetching the branches, it will be passed to the next middleware.
 */
const controllerGetAllBranches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branches = yield branchService.serviceGetAllBranches();
        res.status(200).json({ message: "Branches Retrieved", data: branches });
    }
    catch (error) {
        next(error);
    }
});
exports.controllerGetAllBranches = controllerGetAllBranches;
/**
 * Controller to handle the creation of a new branch.
 *
 * @async
 * @function controllerCreateBranches
 * @param {Request} req - The request object containing the data for the new branch.
 * @param {Response} res - The response object to send back the created branch data.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while creating the branch, it will be passed to the next middleware.
 */
const controllerCreateBranches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBranch = yield branchService.serviceCreateBranches(req.body);
        res.status(201).json({ message: "Branch Created", data: newBranch });
    }
    catch (error) {
        next(error);
    }
});
exports.controllerCreateBranches = controllerCreateBranches;
/**
 * Controller to handle the updating of a branch.
 *
 * @async
 * @function controllerUpdateBranches
 * @param {Request} req - The request object containing the branch ID in the URL params and the updated data in the body.
 * @param {Response} res - The response object to send back the updated branch data.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while updating the branch, it will be passed to the next middleware.
 */
const controllerUpdateBranches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBranches = yield branchService.serviceUpdateBranches(req.params.id, req.body);
        res.status(200).json({ message: "Branch Updated", data: updatedBranches });
    }
    catch (error) {
        next(error);
    }
});
exports.controllerUpdateBranches = controllerUpdateBranches;
/**
 * Controller to handle the deletion of a branch.
 *
 * @async
 * @function controllerDeleteBranches
 * @param {Request} req - The request object containing the branch ID in the URL params.
 * @param {Response} res - The response object to send back a success message.
 * @param {NextFunction} next - The next middleware function to handle errors.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @throws {Error} If an error occurs while deleting the branch, it will be passed to the next middleware.
 */
const controllerDeleteBranches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield branchService.serviceDeleteBranches(req.params.id);
        res.status(200).send({ message: "Branch Deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.controllerDeleteBranches = controllerDeleteBranches;
//# sourceMappingURL=branchController.js.map