
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {

  apiKey: "AIzaSyCKbjpgvUqUTsk8L_OGHtaKbE5qqf1yXaA",
  authDomain: "react-curd-64aea.firebaseapp.com",
  projectId: "react-curd-64aea",
  storageBucket: "react-curd-64aea.firebasestorage.app",
  messagingSenderId: "725174299053",
  appId: "1:725174299053:web:6f5a5d865e62dcfb6c1924",
  measurementId: "G-BSHG9P7JZD"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)