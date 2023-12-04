
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArtplzkg48t6JWaeWX8j0wrfO5R7RxRIM",
  authDomain: "react-native-chatapp-c20de.firebaseapp.com",
  projectId: "react-native-chatapp-c20de",
  storageBucket: "react-native-chatapp-c20de.appspot.com",
  messagingSenderId: "317443225175",
  appId: "1:317443225175:web:993bb18123f741c9ccd512"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);
const firestoreDB = getFirestore(app);

export { app, firebaseAuth, firestoreDB };