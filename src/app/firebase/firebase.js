import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configure Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyCefhN_WDoVg78rqE6xvsxZ2mhog2R9q58",
  authDomain: "wattleartcreations.firebaseapp.com",
  projectId: "wattleartcreations",
  storageBucket: "wattleartcreations.appspot.com",
  messagingSenderId: "947361534354",
  appId: "1:947361534354:web:cf323c4a5c771ad1ceb14b",
  measurementId: "G-X3LFHN1S9C"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 