// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrqBRPx9YVg-ii7kizxexmQsovoqnQD-U",
    authDomain: "alura-geek-izix.firebaseapp.com",
    projectId: "alura-geek-izix",
    storageBucket: "alura-geek-izix.appspot.com",
    messagingSenderId: "575375446936",
    appId: "1:575375446936:web:cf3b7270e178dd16df11ed"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
