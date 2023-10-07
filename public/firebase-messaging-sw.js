importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

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

messaging.onBackgroundMessage((payload) => {
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

  // clients.matchAll().then((clientsList) => {
  //   if (clientsList.length) {
  //     clientsList.forEach((client) => {
  //       client.postMessage({ type: 'FCM_MESSAGE_RECEIVED', payload });
  //     });
  //   }
  // });

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'FCM_BACKGROUND_NOTIFICATION',
        payload: payload,
      });
    });
  });
});

// self.addEventListener('notificationclick', function (event) {
//   const url = `http://localhost:4003/`;
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });
