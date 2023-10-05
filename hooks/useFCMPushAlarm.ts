import { getApps, initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { captureTimeState } from '@/recoil/atom';

export const useFCMPushAlarm = () => {
  const setIsCaptureTime = useSetRecoilState(captureTimeState);

  useEffect(() => {
    if (!getApps().length) {
      initializeApp({
        apiKey: 'AIzaSyDjK6isLBGownY7C1AEA6n05-hjpZEleEo',
        authDomain: 'learniverse-b34d9.firebaseapp.com',
        projectId: 'learniverse-b34d9',
        storageBucket: 'learniverse-b34d9.appspot.com',
        messagingSenderId: '605501909741',
        appId: '1:605501909741:web:e9a496058fa8b1812bbae4',
        measurementId: 'G-PKVGVW8D2X',
      });
    }

    const messaging = getMessaging();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('[Foreground]Message received. ', payload);
      setIsCaptureTime((prev) => !prev);
    });

    return () => unsubscribe();
  }, []);
};
