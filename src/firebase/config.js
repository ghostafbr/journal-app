// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1J9zrMC5BI5u_e3NM3Mui9JYb4hZFMiE',
  authDomain: 'journalapp-react-742da.firebaseapp.com',
  projectId: 'journalapp-react-742da',
  storageBucket: 'journalapp-react-742da.appspot.com',
  messagingSenderId: '268386636311',
  appId: '1:268386636311:web:1a350e53c0461ac1234252',
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
