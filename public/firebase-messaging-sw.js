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
  apiKey: 'AIzaSyDjK6isLBGownY7C1AEA6n05-hjpZEleEo',
  authDomain: 'learniverse-b34d9.firebaseapp.com',
  projectId: 'learniverse-b34d9',
  storageBucket: 'learniverse-b34d9.appspot.com',
  messagingSenderId: '605501909741',
  appId: '1:605501909741:web:e9a496058fa8b1812bbae4',
  measurementId: 'G-PKVGVW8D2X',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );

  // Customize notification here
  const notificationTitle = '[Background] 스크린이 캡처되었습니다!';
  const notificationOptions = {
    body: payload,
    icon: '/public/favicon-32x32.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
