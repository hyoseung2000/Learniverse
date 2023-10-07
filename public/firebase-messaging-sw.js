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
const broadcast = new BroadcastChannel('my-channel');

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

  self.addEventListener('push', function (e) {
    const bc = new BroadcastChannel('fcm_channel');
    console.log('push: ', e.data.json());
    if (!e.data.json()) return;

    const resultData = e.data.json();
    const notificationTitle = resultData.notification.title;
    const notificationOptions = {
      body: resultData.notification.body,
      data: resultData.data,
      ...resultData,
    };

    e.waitUntil(
      self.registration.showNotification(
        notificationTitle,
        notificationOptions,
      ),
    );

    bc.postMessage(resultData);
  });

  // 메시지 수신
  broadcast.onmessage = (event) => {
    if (event.data && event.data.type === 'PRINT');
    {
      // 메시지 발송
      broadcast.postMessage({ payload: 'Hello, Client. I am Service-worker' });
    }
  };
});

// self.addEventListener('notificationclick', function (event) {
//   const url = `http://localhost:4003/`;
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });
