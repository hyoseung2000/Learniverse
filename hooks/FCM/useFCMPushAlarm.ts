import { getMessaging, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { captureTimeState } from '@/recoil/atom';

import useFirebaseInit from './useFirebaseInit';

const useFCMPushAlarm = () => {
  useFirebaseInit();

  const setIsCaptureTime = useSetRecoilState(captureTimeState);

  useEffect(() => {
    const messaging = getMessaging();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('[Foreground]Message received. ', payload);
      setIsCaptureTime((prev) => prev + 1);
    });

    return () => unsubscribe();
  }, []);
};

export default useFCMPushAlarm;
