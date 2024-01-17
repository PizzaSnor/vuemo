import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVESzUe1dEQMco3W603xU5tfkVlSDKCKk",
  authDomain: "vuemo-grasp.firebaseapp.com",
  projectId: "vuemo-grasp",
  storageBucket: "vuemo-grasp.appspot.com",
  messagingSenderId: "320551227573",
  appId: "1:320551227573:web:7a424f12eabf090951aefc",
  measurementId: "G-NL7MFJW3QH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };