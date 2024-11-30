import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAhz1YgjYWB9zv8TZa_mZTV-zEtwbTebI4",
  authDomain: "netflix-clone-fb8c3.firebaseapp.com",
  projectId: "netflix-clone-fb8c3",
  storageBucket: "netflix-clone-fb8c3.firebasestorage.app",
  messagingSenderId: "918429093701",
  appId: "1:918429093701:web:752712c06b77f3a16c382c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup Function
const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    // Add user to Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    console.log("User signed up and added to Firestore.");
  } catch (error) {
    console.error("Signup Error:", error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Login Function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in.");
  } catch (error) {
    console.error("Login Error:", error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Logout Function
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out.");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};

export { auth, db, login, signup, logout };
