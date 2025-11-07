// Inicializar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBZJ9F7ZqxGcXJ1MxduQ_2KeobguPIE0",
    authDomain: "soziewaaagh.firebaseapp.com",
    projectId: "soziewaaagh",
    storageBucket: "soziewaaagh.firebasestorage.app",
    messagingSenderId: "520458694843",
    appId: "1:520458694843:web:9a70d1e644c82c3148399e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
