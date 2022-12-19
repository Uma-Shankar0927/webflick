import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDEHPJCgEN_SD4pzk2Onw_iuHQSIBjLx0c",
  authDomain: "netflixreact-a74a7.firebaseapp.com",
  projectId: "netflixreact-a74a7",
  storageBucket: "netflixreact-a74a7.appspot.com",
  messagingSenderId: "381292680579",
  appId: "1:381292680579:web:26da869befdb3137bf92b6",
  measurementId: "G-G9F7GEYL5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);