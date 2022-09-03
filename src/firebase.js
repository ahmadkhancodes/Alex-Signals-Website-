import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC36tWrIySq1m0OcWAziSSfPI7Tq9fFPE",
  authDomain: "alex-signals.firebaseapp.com",
  projectId: "alex-signals",
  storageBucket: "alex-signals.appspot.com",
  messagingSenderId: "662576775245",
  appId: "1:662576775245:web:a11bc5da66c2c1e5655c04",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
