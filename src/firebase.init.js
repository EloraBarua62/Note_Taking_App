// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdxqvsdupilg1s-s9bQQBu0cF3BO9lQY8",
    authDomain: "notefriend-5a4c3.firebaseapp.com",
    projectId: "notefriend-5a4c3",
    storageBucket: "notefriend-5a4c3.appspot.com",
    messagingSenderId: "238652310281",
    appId: "1:238652310281:web:8a3cbc7ebbb97bbe5449d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;