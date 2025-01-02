
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBoh_2_mYubggA3LkVQpPQHYhmF0GN8SzY",
    authDomain: "onlinelibrary-58c6c.firebaseapp.com",
    projectId: "onlinelibrary-58c6c",
    storageBucket: "onlinelibrary-58c6c.firebasestorage.app",
    messagingSenderId: "595273575477",
    appId: "1:595273575477:web:f5a7ea5dacb1e2dda9d57c",
    measurementId: "G-1XN0HVBYD1"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
