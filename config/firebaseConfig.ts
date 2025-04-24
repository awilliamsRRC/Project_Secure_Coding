import {
    initializeApp,
    cert,
    ServiceAccount,
    AppOptions,
    App,
    getApps,
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";


const getFirebaseConfig = (): AppOptions => {
    // extract the Firebase credentials from environment variables
    const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
        process.env;

    if (
        !FIREBASE_PROJECT_ID ||
        !FIREBASE_CLIENT_EMAIL ||
        !FIREBASE_PRIVATE_KEY
    ) {
        // This really should be a custom error type
        throw new Error(
            "Missing Firebase configuaration. Please check your environment variables"
        );
    }
    console.log(process.env.FIREBASE_PROJECT_ID);
    console.log(process.env.FIREBASE_CLIENT_EMAIL);
    console.log(process.env.FIREBASE_PRIVATE_KEY);

    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        // replace escaped newlines in the private key string with acutal newlines
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    return {
        credential: cert(serviceAccount),
    };
};

const initializeFirebaseAdmin = (): App => {
    // check if an app is already initialized
    const existingApp: App = getApps()[0];

    if (existingApp) {
        // return existing app if found
        return existingApp;
    }

    // otherwise create and return new app
    return initializeApp(getFirebaseConfig());
};

// initialize Firebase Admin app
const app: App = initializeFirebaseAdmin();

const auth: Auth = getAuth(app);

const db: Firestore = getFirestore(app);

export { auth, db };