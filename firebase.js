import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyChcZ2SQ4mgB1Su6_wyg6qD32wL2kgVkxY",
  authDomain: "semestertest2-6d13d.firebaseapp.com",
  databaseURL: "https://semestertest2-6d13d-default-rtdb.firebaseio.com",
  projectId: "semestertest2-6d13d",
  storageBucket: "semestertest2-6d13d.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", //
  appId: "1:79730576071:web:5b83e057b08143d4a04ce2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
