import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCyMp1cEkz3Srrq6eRJnlQxqswS362YVJg",
  authDomain: "creative-diary-webapp.firebaseapp.com",
  projectId: "creative-diary-webapp",
  storageBucket: "creative-diary-webapp.appspot.com",
  messagingSenderId: "44053185663",
  appId: "1:44053185663:web:ded7cb030f0092945f6b4a",
  databaseURL:"https://creative-diary-webapp-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
