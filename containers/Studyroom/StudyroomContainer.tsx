import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { styled } from 'styled-components';

import { Studyroom } from '@/components/Studyroom';
import { usePushNotification } from '@/hooks/usePushNotification';

const StudyroomContainer = () => {
  const pushNotification = usePushNotification();

  const askPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if (permission !== 'granted') return;

    const firebaseApp = initializeApp({
      apiKey: 'AIzaSyA88Fvimx5-5b5FkFP4iOCODcM7OUTRBAo',
      authDomain: 'learniverse-649f9.firebaseapp.com',
      projectId: 'learniverse-649f9',
      storageBucket: 'learniverse-649f9.appspot.com',
      messagingSenderId: '965172005133',
      appId: '1:965172005133:web:796a9283ed296d398bc844',
      measurementId: 'G-1QLQ4JJSH0',
    });

    const messaging = getMessaging(firebaseApp);

    getToken(messaging, {
      vapidKey:
        'BCTvCftz5TdxagdC1ewKCGxDnyveMrQ0jnMg-coHt6BvVCsbncEDtB0r7S3kfFq4kgn_kgTQX7H-5c2OANEEHCQ',
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('currentToken', currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });

    // onBackgroundMessage(messaging, (payload) => {
    //   console.log(
    //     '[firebase-messaging-sw.js] Received background message ',
    //     payload,
    //   );

    //   const notificationTitle = 'Background Message Title';
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
    if (pushNotification) {
      pushNotification.fireNotification('스크린이 캡처되었습니다!', {
        body: '60초 이내에 전송해주세요!',
      });
    }
  }, []);

  return (
    <StStudyroomWrapper>
      <Studyroom />
    </StStudyroomWrapper>
  );
};

export default StudyroomContainer;

const StStudyroomWrapper = styled.main`
  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;
