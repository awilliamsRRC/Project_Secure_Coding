"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const auth_1 = require("firebase-admin/auth");
const getFirebaseConfig = () => {
    // extract the Firebase credentials from environment variables
    const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
    if (!FIREBASE_PROJECT_ID ||
        !FIREBASE_CLIENT_EMAIL ||
        !FIREBASE_PRIVATE_KEY) {
        // This really should be a custom error type
        throw new Error("Missing Firebase configuaration. Please check your environment variables");
    }
    console.log(process.env.FIREBASE_PROJECT_ID);
    console.log(process.env.FIREBASE_CLIENT_EMAIL);
    console.log(process.env.FIREBASE_PRIVATE_KEY);
    const serviceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        // replace escaped newlines in the private key string with acutal newlines
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
    return {
        credential: (0, app_1.cert)(serviceAccount),
    };
};
const initializeFirebaseAdmin = () => {
    // check if an app is already initialized
    const existingApp = (0, app_1.getApps)()[0];
    if (existingApp) {
        // return existing app if found
        return existingApp;
    }
    // otherwise create and return new app
    return (0, app_1.initializeApp)(getFirebaseConfig());
};
// initialize Firebase Admin app
const app = initializeFirebaseAdmin();
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
//# sourceMappingURL=firebaseConfig.js.map