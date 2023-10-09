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

  self.addEventListener('push', function (e) {
    const bc = new BroadcastChannel('fcm_channel');
    // if (!e.data.json()) return;
    // console.log(e);

    // const resultData = e.data.json();
    // const notificationTitle = resultData.notification.title;
    // const notificationOptions = {
    //   body: resultData.notification.body,
    //   data: resultData.data,
    //   ...resultData,
    // };

    // e.waitUntil(
    //   self.registration.showNotification(
    //     notificationTitle,
    //     notificationOptions,
    //   ),
    // );

    bc.postMessage(payload);
  });
});

// self.addEventListener('notificationclick', function (event) {
//   const url = `http://localhost:3002/`;
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });

// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();

//   // 클릭 액션 URL을 이용하여 새 탭을 엽니다.
//   if (event.notification.data && event.notification.data.click_action) {
//     event.waitUntil(clients.openWindow(event.notification.data.click_action));
//   }
// });
