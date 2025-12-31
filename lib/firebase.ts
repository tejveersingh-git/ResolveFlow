import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyBt9eQKpHSQnzWo1DAGxE3HJf_UwTyAoZ4",
  authDomain: "resolveflow-1313.firebaseapp.com",
  projectId: "resolveflow-1313",
  storageBucket: "resolveflow-1313.firebasestorage.app",
  messagingSenderId: "165053151580",
  appId: "1:165053151580:web:c919222e41063a34d96999",
  measurementId: "G-T5THYEX3CT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
