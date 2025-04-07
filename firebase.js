// firebase.js

// Firebase JS SDK CDN ke through import karna (import { ... } wali line HTML mein hoga)

const firebaseConfig = {
    apiKey: "AIzaSyABU2EBs83lnAC07SI6P5zZJhFyEGSm7PI",
    authDomain: "mahalaxmipestscheduletrack.firebaseapp.com",
    projectId: "mahalaxmipestscheduletrack",
    storageBucket: "mahalaxmipestscheduletrack.firebasestorage.app",
    messagingSenderId: "643552440527",
    appId: "1:643552440527:web:b315b2e5648dacb5e9c7ba"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Realtime database reference
  const database = firebase.database();
  