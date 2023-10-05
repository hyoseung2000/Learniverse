/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMessaging, getToken } from 'firebase/messaging';
// import { onBackgroundMessage } from 'firebase/messaging/sw';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { createToken } from '@/apis/alarm';
import { Home } from '@/components/Home';
import { useFirebaseInit } from '@/hooks/FCM';
import { fcmTokenState, memberIdState } from '@/recoil/atom';

declare global {
  interface Window {
    registration: any;
  }
}

const HomeContainer = () => {
  const memberId = useRecoilValue(memberIdState);
  const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);

  useFirebaseInit();

  const saveToken = async (token: string) => {
    await createToken(memberId, token);
  };

  const askPermission = async () => {
    const permission = await window.Notification.requestPermission();
    console.log('알림 허용 여부 : ', permission, ', FCM 토큰 : ', fcmToken);
    // if (permission !== 'granted' || fcmToken) return;

    const messaging = getMessaging();

    if (permission === 'granted') {
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
    } else if (permission === 'denied') {
      console.log('푸시 알림 권한이 차단되어 있습니다.');
    }
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
