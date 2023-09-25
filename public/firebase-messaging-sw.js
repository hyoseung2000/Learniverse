// Import the functions you need from the SDKs you need
importScripts(
  'https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js',
);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA88Fvimx5-5b5FkFP4iOCODcM7OUTRBAo',
  authDomain: 'learniverse-649f9.firebaseapp.com',
  projectId: 'learniverse-649f9',
  storageBucket: 'learniverse-649f9.appspot.com',
  messagingSenderId: '965172005133',
  appId: '1:965172005133:web:796a9283ed296d398bc844',
  measurementId: 'G-1QLQ4JJSH0',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);
