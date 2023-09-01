import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';


// Configure Firebase.
let firebaseConfig = {
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

//connectAuthEmulator(auth,'http://127.0.0.1:9099')

export const db = getFirestore(app);
//connectFirestoreEmulator(db, '127.0.0.1', 8080); //Remove this line for production

export const storage = getStorage(app); 

// if (location.hostname === "localhost") {
//   // Point to the Storage emulator running on localhost.
//   connectStorageEmulator(storage, "127.0.0.1", 9199);
// } 