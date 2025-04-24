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
const branchController = __importStar(require("../controllers/branchController"));
const branchSchema_1 = require("../schemas/branchSchema");
const validate_1 = require("../middleware/validate");
const routerBranch = express_1.default.Router();
/**
 * @openapi
 * /branch:
 *   get:
 *     summary: Get all branches
 *     operationId: getAllBranches
 *     tags:
 *       - Branches
 *     responses:
 *       200:
 *         description: A list of all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
routerBranch.get("/", branchController.controllerGetAllBranches);
/**
 * @openapi
 * /branch:
 *   post:
 *     summary: Create a new branch
 *     operationId: createBranch
 *     tags:
 *       - Branches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *       400:
 *         description: Bad request (invalid data)
 *       500:
 *         description: Internal server error
 */
routerBranch.post("/", (0, validate_1.validateRequest)(branchSchema_1.branchSchema), branchController.controllerCreateBranches);
/**
 * @openapi
 * /branch/{id}:
 *   put:
 *     summary: Update an existing branch
 *     operationId: updateBranch
 *     tags:
 *       - Branches
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the branch to update
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
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       400:
 *         description: Invalid data supplied
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Internal server error
 */
routerBranch.put("/:id", (0, validate_1.validateRequest)(branchSchema_1.branchSchema), branchController.controllerUpdateBranches);
/**
 * @openapi
 * /branch/{id}:
 *   delete:
 *     summary: Delete a branch
 *     operationId: deleteBranch
 *     tags:
 *       - Branches
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the branch to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       400:
 *         description: Invalid branch ID
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Internal server error
 */
routerBranch.delete("/:id", branchController.controllerDeleteBranches);
exports.default = routerBranch;
//# sourceMappingURL=branchRoutes.js.map