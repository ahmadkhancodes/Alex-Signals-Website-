import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig2 = {
  apiKey: "AIzaSyAwuztQa-cDflnndsBPjkEfwUgqYBjDQgU",
  authDomain: "trading-markets-notifications.firebaseapp.com",
  projectId: "trading-markets-notifications",
  storageBucket: "trading-markets-notifications.appspot.com",
  messagingSenderId: "1069278574035",
  appId: "1:1069278574035:web:94cba49ddc7c6b9041ab26",
  databaseURL:
    "https://trading-markets-notifications-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig2, "secondary");
// = initializeApp(firebaseConfig);
export const userdb = getDatabase(app);
