import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { createToken } from '@/apis/alarm';
// import { addMoon } from '@/apis/profile';
import { Home } from '@/components/Home';
import { usePushNotification } from '@/hooks/usePushNotification';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { memberIdState, moonScoreState, todayState } from '@/recoil/atom';
import { totalMoonScoreSelector } from '@/recoil/selector';
import getToday from '@/utils/getToday';

const HomeContainer = () => {
  const totalMoonScore = useRecoilValue(totalMoonScoreSelector);
  const memberId = useRecoilValue(memberIdState);
  const [moonScore, setMoonScore] = useRecoilState(moonScoreState);
  const [lastDay, setLastDay] = useRecoilState(todayState);
  const pushNotification = usePushNotification();

  const saveToken = async (token: string) => {
    await createToken(memberId, token);
  };

  const askPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if (permission !== 'granted') return;

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
  const isMax = () => {
    return totalMoonScore >= 4;
  };

  const addFirstAccess = () => {
    if (isMax() || moonScore.isFirstAccess >= 1) return;
    setMoonScore((prevMoonScore) => ({
      ...prevMoonScore,
      isFirstAccess: prevMoonScore.isFirstAccess + 1,
    }));
  };

  // const addCoreTimeAccess = () => {
  //   if (isMax()) return;
  //   setMoonScore((prevMoonScore) => ({
  //     ...prevMoonScore,
  //     isCoreTimeParticipate: prevMoonScore.isCoreTimeParticipate + 1,
  //   }));
  // };

  // const addCapture = () => {
  //   if (isMax()) return;
  //   setMoonScore((prevMoonScore) => ({
  //     ...prevMoonScore,
  //     isCapture: prevMoonScore.isCapture + 1,
  //   }));
  // };

  const initMoonScore = () => {
    setMoonScore({
      isFirstAccess: 0,
      isCoreTimeParticipate: 0,
      isCapture: 0,
    });
  };

  useEffect(() => {
    const today = getToday();
    if (lastDay !== today) {
      setLastDay(today);
      initMoonScore();
      addFirstAccess();
    }
  }, []);

  // useEffect(() => {
  //   const addMoons = async () => {
  //     const res = await addMoon(memberId, totalMoonScore);
  //     if (res === 400) return null;
  //     return res;
  //   };
  //   addMoons();
  // }, [moonScore]);

  return (
    <StHomeContainer>
      <Home />
    </StHomeContainer>
  );
};

export default HomeContainer;

const StHomeContainer = styled.main``;
