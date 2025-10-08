import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// For React Native use initializeAuth + react-native persistence
import { initializeAuth } from 'firebase/auth/react-native';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { signInWithEmailAndPassword as _signInWithEmailAndPassword, createUserWithEmailAndPassword as _createUserWithEmailAndPassword, onAuthStateChanged as _onAuthStateChanged, signOut as _signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyChcZ2SQ4mgB1Su6_wyg6qD32wL2kgVkxY",
  authDomain: "semestertest2-6d13d.firebaseapp.com",
  databaseURL: "https://semestertest2-6d13d-default-rtdb.firebaseio.com",
  projectId: "semestertest2-6d13d",
  storageBucket: "semestertest2-6d13d.firebasestorage.app",
  messagingSenderId: "79730576071",
  appId: "1:79730576071:web:5b83e057b08143d4a04ce2",
};


const app = initializeApp(firebaseConfig);

// Initialize Auth with React Native persistence (AsyncStorage)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const database = getDatabase(app);

// Re-export auth helpers bound to the initialized auth instance so other files
// can import these from './firebase' safely (ensures initializeAuth runs first).
export const signInWithEmailAndPassword = (email, password) => _signInWithEmailAndPassword(auth, email, password);
export const createUserWithEmailAndPassword = (email, password) => _createUserWithEmailAndPassword(auth, email, password);
export const onAuthStateChanged = (cb) => _onAuthStateChanged(auth, cb);
export const signOut = () => _signOut(auth);

export default app;
