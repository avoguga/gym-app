import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
// };

// VITE_API_KEY=AIzaSyD5kVw9KCNNo4_HI9G8NcsQglUBW2QN7uw
// VITE_AUTH_DOMAIN=gym-app-ce7a7.firebaseapp.com
// VITE_PROJECT_ID=gym-app-ce7a7
// VITE_STORAGE_BUCKET=gym-app-ce7a7.appspot.com
// VITE_MESSAGING_SENDER_ID=313118599086
// VITE_APP_ID=1:313118599086:web:8e74b026bcba36d6458a3f

const firebaseConfig = {
  apiKey: "AIzaSyD5kVw9KCNNo4_HI9G8NcsQglUBW2QN7uw",
  authDomain: "gym-app-ce7a7.firebaseapp.com",
  projectId: "gym-app-ce7a7",
  storageBucket: "gym-app-ce7a7.appspot.com",
  messagingSenderId: "313118599086",
  appId: "1:313118599086:web:8e74b026bcba36d6458a3f"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);


