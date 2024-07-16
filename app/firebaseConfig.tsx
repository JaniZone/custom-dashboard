//app/firenbaseConfig.tsx
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLVwxGHdLdFXFGv1f6SDQ-7V_727o4e0Q",
  authDomain: "firetrial-6b8a2.firebaseapp.com",
  projectId: "firetrial-6b8a2",
  storageBucket: "firetrial-6b8a2.appspot.com",
  messagingSenderId: "703792372551",
  appId: "1:703792372551:web:ffa9e459fbe927c2a54a62",
  measurementId: "G-KH1PY3Q136"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//export const firestore = getFirestore(app);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage=getStorage(app);


export { db };
export { storage };

