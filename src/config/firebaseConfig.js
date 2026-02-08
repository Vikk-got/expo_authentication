import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAf5Drdvfm_t6fYhgMk9tAr5517XSp6NTk",
    authDomain: "vatsal-auth-app.firebaseapp.com",
    projectId: "vatsal-auth-app",
    storageBucket: "vatsal-auth-app.firebasestorage.app",
    messagingSenderId: "186592728989",
    appId: "1:186592728989:web:09f7d2844af59370624174",
    measurementId: "G-3DJMNL7NQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
