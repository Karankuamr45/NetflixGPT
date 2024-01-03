// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh0-7Txyk9dxs6UQn9ySkbdazer2Y6cgo",
  authDomain: "netflixgpt-3fb80.firebaseapp.com",
  projectId: "netflixgpt-3fb80",
  storageBucket: "netflixgpt-3fb80.appspot.com",
  messagingSenderId: "811831089512",
  appId: "1:811831089512:web:86926d468c1217163c9edd",
  measurementId: "G-RQB3RNFHH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();