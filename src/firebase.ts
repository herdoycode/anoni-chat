import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSPERxHmhqJez1cmXRDTM_mt1tfy8QBHE",
  authDomain: "fire-api-b166b.firebaseapp.com",
  projectId: "fire-api-b166b",
  storageBucket: "fire-api-b166b.appspot.com",
  messagingSenderId: "519060328603",
  appId: "1:519060328603:web:0d1f82bec9a4b98f26363e",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);