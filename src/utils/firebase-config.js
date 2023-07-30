import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClT-akht4VHRDiaaTqqzvn6Y9E07h7r0k",
  authDomain: "netflixx-cloney.firebaseapp.com",
  projectId: "netflixx-cloney",
  storageBucket: "netflixx-cloney.appspot.com",
  messagingSenderId: "1055526596719",
  appId: "1:1055526596719:web:4c101b30cc616382655d9a",
  measurementId: "G-H95K630CVW"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)