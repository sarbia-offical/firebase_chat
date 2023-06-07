/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-06-01 13:53:47
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-02 16:07:30
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuV7SxawSfVEGkHFCNf7OFvmwMGDufbmQ",
  authDomain: "chat-88061.firebaseapp.com",
  projectId: "chat-88061",
  storageBucket: "chat-88061.appspot.com",
  messagingSenderId: "917078184061",
  appId: "1:917078184061:web:db4744a385f466c40a2114"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();