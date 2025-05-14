import  { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { getStorage, getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiM_e_KWJg4-Adi7IMTGN9yv7y-o2FTP4",
  authDomain: "job-connector-59fc0.firebaseapp.com",
  projectId: "job-connector-59fc0",
  storageBucket: "job-connector-59fc0.appspot.com",
  messagingSenderId: "660224980842",
  appId: "1:660224980842:web:6904cd4efe2a1e4e37d713",
  measurementId: "G-LXY7C4T8BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  db, 
  storage, 
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  firebaseSignOut,
  onAuthStateChanged,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  limit,
  getDownloadURL,
  storageRef,
  uploadBytes
};

export type FirebaseUser = User;
 