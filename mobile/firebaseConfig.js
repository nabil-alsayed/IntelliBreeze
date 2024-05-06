import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBnz-EGZsxJSTq1c1VRFCLzeRIq0i4Xzd8",
    authDomain: "intelliiibreeze.firebaseapp.com",
    databaseURL: "https://intelliiibreeze-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "intelliiibreeze",
    storageBucket: "intelliiibreeze.appspot.com",
    messagingSenderId: "852271854530",
    appId: "1:852271854530:web:479eb1aba6cfc4b69f1c5b",
    measurementId: "G-Q7EF05D56J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };