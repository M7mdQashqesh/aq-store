import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_apiKey,
  authDomain: import.meta.env.REACT_APP_authDomain,
  projectId: import.meta.env.REACT_APP_projectId,
  storageBucket: import.meta.env.REACT_APP_storageBucket,
  messagingSenderId: import.meta.env.REACT_APP_messagingSenderId,
  appId: import.meta.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
