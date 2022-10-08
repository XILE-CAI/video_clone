
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDgN2dfEHqGg9jsxlbH2LQR0Wy1hBCvceU",
  authDomain: "video-2c615.firebaseapp.com",
  projectId: "video-2c615",
  storageBucket: "video-2c615.appspot.com",
  messagingSenderId: "700493158697",
  appId: "1:700493158697:web:5016b610835de6a5797f38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app