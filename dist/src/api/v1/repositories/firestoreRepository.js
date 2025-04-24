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
exports.deleteDocument = exports.updateDocument = exports.getDocuments = exports.createDocument = exports.runTransaction = void 0;
const firebaseConfig_1 = require("../../../../config/firebaseConfig");
const errors_1 = require("../errors/errors");
const errorUtils_1 = require("../utils/errorUtils");
/**
 * Executes a Firestore transaction and handles errors if they occur.
 *
 * @async
 * @function runTransaction
 * @template T - The type of the result returned by the transaction operation.
 * @param {Function} operations - A function that takes a Firestore `Transaction` object and performs operations within the transaction.
 * @param {FirebaseFirestore.Transaction} operations.transaction - The Firestore transaction object passed to the operation function.
 * @returns {Promise<T>} A promise that resolves with the result of the transaction operation.
 * @throws {RepositoryError} If the transaction fails, a custom `RepositoryError` is thrown with error details.
 */
const runTransaction = (operations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield firebaseConfig_1.db.runTransaction(operations);
    }
    catch (error) {
        throw new errors_1.RepositoryError(`Transaction failed: ${(0, errorUtils_1.getErrorMessage)(error)}`, (0, errorUtils_1.getErrorCode)(error), (0, errorUtils_1.getFirebaseErrorStatusCode)(error));
    }
});
exports.runTransaction = runTransaction;
/**
 * Creates a new document in the specified collection.
 *
 * @template T - The type of data being stored
 * @param collectionName - The name of the collection to create the document in
 * @param data - The data to be stored in the document
 * @param id - Optional custom document ID. If not provided, Firestore will auto-generate one
 * @returns Promise resolving to the created document's ID
 * @throws Error if document creation fails
 *
 * @example
 * const docId = await createDocument('users', { name: 'John', age: 25 });
 */
const createDocument = (collectionName, data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let docRef;
        // If an ID is provided, use it to create a document at that specific ID
        // Otherwise, let Firestore auto-generate an ID
        if (id) {
            docRef = firebaseConfig_1.db.collection(collectionName).doc(id);
            yield docRef.set(data);
        }
        else {
            docRef = yield firebaseConfig_1.db.collection(collectionName).add(data);
        }
        return docRef.id;
    }
    catch (error) {
        throw new errors_1.RepositoryError(`Failed to create document in ${collectionName}: ${(0, errorUtils_1.getErrorMessage)(error)}`, (0, errorUtils_1.getErrorCode)(error), (0, errorUtils_1.getFirebaseErrorStatusCode)(error));
    }
});
exports.createDocument = createDocument;
/**
 * Retrieves all documents from a specified collection.
 * Note: Be cautious with this function on large collections as it fetches all documents.
 *
 * @param collectionName - The name of the collection to retrieve documents from
 * @returns Promise resolving to a QuerySnapshot containing all documents
 * @throws Error if fetching documents fails
 */
const getDocuments = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield firebaseConfig_1.db.collection(collectionName).get();
    }
    catch (error) {
        throw new errors_1.RepositoryError(`Failed to fetch documents from ${collectionName}: ${(0, errorUtils_1.getErrorMessage)(error)}`, (0, errorUtils_1.getErrorCode)(error), (0, errorUtils_1.getFirebaseErrorStatusCode)(error));
    }
});
exports.getDocuments = getDocuments;
/**
 * Updates a specific document in a collection with new data.
 * Only the fields specified in the data parameter will be updated.
 *
 * @template T - The type of the document data
 * @param collectionName - The name of the collection containing the document
 * @param id - The ID of the document to update
 * @param data - Partial data to update in the document
 * @throws Error if updating the document fails
 *
 * @example
 * await updateDocument('users', 'userId', { age: 26, lastUpdated: new Date() });
 */
const updateDocument = (collectionName, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield firebaseConfig_1.db.collection(collectionName).doc(id).update(data);
    }
    catch (error) {
        throw new errors_1.RepositoryError(`Failed to update document ${id} in ${collectionName}: ${(0, errorUtils_1.getErrorMessage)(error)}`, (0, errorUtils_1.getErrorCode)(error), (0, errorUtils_1.getFirebaseErrorStatusCode)(error));
    }
});
exports.updateDocument = updateDocument;
/**
 * Deletes a specific document from a collection.
 * Can be used both with and without a transaction.
 *
 * @param collectionName - The name of the collection containing the document
 * @param id - The ID of the document to delete
 * @param transaction - Optional transaction object for atomic operations
 * @throws Error if deleting the document fails
 *
 * @example
 * // Simple delete
 * await deleteDocument('users', 'userId');
 *
 * // Delete within a transaction
 * await runTransaction(async (transaction) => {
 *   await deleteDocument('users', 'userId', transaction);
 * });
 */
const deleteDocument = (collectionName, id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = firebaseConfig_1.db
            .collection(collectionName)
            .doc(id);
        // If transaction is provided, use it for atomic operations
        // Otherwise, perform a regular delete
        if (transaction) {
            transaction.delete(docRef);
        }
        else {
            yield docRef.delete();
        }
    }
    catch (error) {
        throw new errors_1.RepositoryError(`Failed to delete document ${id} from ${collectionName}: ${(0, errorUtils_1.getErrorMessage)(error)}`, (0, errorUtils_1.getErrorCode)(error), (0, errorUtils_1.getFirebaseErrorStatusCode)(error));
    }
});
exports.deleteDocument = deleteDocument;
//# sourceMappingURL=firestoreRepository.js.map