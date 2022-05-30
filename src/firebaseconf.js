import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCrqBRPx9YVg-ii7kizxexmQsovoqnQD-U",
    authDomain: "alura-geek-izix.firebaseapp.com",
    projectId: "alura-geek-izix",
    storageBucket: "alura-geek-izix.appspot.com",
    messagingSenderId: "575375446936",
    appId: "1:575375446936:web:cf3b7270e178dd16df11ed"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
auth.languageCode = 'es';
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp)
export default firebaseApp;
