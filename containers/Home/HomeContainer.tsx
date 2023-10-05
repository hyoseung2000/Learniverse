/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
// import { onBackgroundMessage } from 'firebase/messaging/sw';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { createToken } from '@/apis/alarm';
import { Home } from '@/components/Home';
import { fcmTokenState, memberIdState } from '@/recoil/atom';

declare global {
  interface Window {
    registration: any;
  }
}

const HomeContainer = () => {
  const memberId = useRecoilValue(memberIdState);
  const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);

  const saveToken = async (token: string) => {
    await createToken(memberId, token);
  };

  const askPermission = async () => {
    const permission = await window.Notification.requestPermission();
    console.log('알림 허용 여부 : ', permission, ', FCM 토큰 : ', fcmToken);
    // if (permission !== 'granted' || fcmToken) return;

    const firebaseApp = initializeApp({
      apiKey: 'AIzaSyDjK6isLBGownY7C1AEA6n05-hjpZEleEo',
      authDomain: 'learniverse-b34d9.firebaseapp.com',
      projectId: 'learniverse-b34d9',
      storageBucket: 'learniverse-b34d9.appspot.com',
      messagingSenderId: '605501909741',
      appId: '1:605501909741:web:e9a496058fa8b1812bbae4',
      measurementId: 'G-PKVGVW8D2X',
    });
    const messaging = getMessaging(firebaseApp);

    getToken(messaging, {
      vapidKey:
        'BFkKBCZ5O4qmyCwm50Aks7sRmMYJzF2wJ8FZCHNLXDLjVxMDEQJFZ_4U5I6uDBF1zXiRHChNAeeDWrTg2m0eL_k',
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('currentToken', currentToken);

          saveToken(currentToken);
          setFcmToken(currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });

    // onMessage(messaging, (payload) => {
    //   console.log('[Foreground]Message received. ', payload);
    //   setIsCaptureTime((prev) => !prev);
    // });

    // onBackgroundMessage(messaging, (payload) => {
    //   console.log(
    //     '[firebase-messaging-sw.js] Received background message ',
    //     payload,
    //   );
    //   // });

    //   const notificationTitle = '[Background] 스크린이 캡처되었습니다!';
    //   const notificationOptions = {
    //     body: payload,
    //     icon: '/public/favicon-32x32.png',
    //   };

    //   self.registration.showNotification(
    //     notificationTitle,
    //     notificationOptions,
    //   );
    // });
  };

  useEffect(() => {
    askPermission();
  }, [memberId]);

  return (
    <StHomeContainer>
      <Home />
    </StHomeContainer>
  );
};

export default HomeContainer;

const StHomeContainer = styled.main``;
