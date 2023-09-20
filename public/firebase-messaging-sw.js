// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );

  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: payload,
    icon: '/public/favicon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
