import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBVFWAHKhReclBJtwQ62POXpb45uPsgvCo",
  authDomain: "wedding-landing-606fb.firebaseapp.com",
  projectId: "wedding-landing-606fb",
  storageBucket: "wedding-landing-606fb.firebasestorage.app",
  messagingSenderId: "68633177038",
  appId: "1:68633177038:web:1b2cd1858ab51662dc599f",
  measurementId: "G-PQ6CMEM3RK"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
