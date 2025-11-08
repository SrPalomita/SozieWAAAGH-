// firebase.js (MODULAR v10)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBZJ9F7ZqxGcXJ1MxduQ_2KeobguPIE0",
    authDomain: "soziewaaagh.firebaseapp.com",
    projectId: "soziewaaagh",
    storageBucket: "soziewaaagh.firebasestorage.app",
    messagingSenderId: "520458694843",
    appId: "1:520458694843:web:9a70d1e644c82c3148399e"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
