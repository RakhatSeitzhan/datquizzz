// import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyB_Lhb2N0REtdUbDH4smCCXebJZZY9zi24",
    authDomain: "datquizzz.firebaseapp.com",
    databaseURL: "https://datquizzz-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "datquizzz",
    storageBucket: "datquizzz.appspot.com",
    messagingSenderId: "499762579494",
    appId: "1:499762579494:web:b6c3bd1cb7c5a9697a3ee7",
    measurementId: "G-WWVCPCPN5M"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database }
// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);
