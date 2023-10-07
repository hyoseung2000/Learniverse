/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { captureTimeState } from "@/recoil/atom";

const ServiceWorkerManager = () => {
  const [captureTime, setIsCaptureTime] = useRecoilState(captureTimeState);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const handleMessage = (event: any) => {
        console.log('알림 수신', event);
        setIsCaptureTime((prev) => prev + 1);

        if (event.data && event.data.type === 'FCM_MESSAGE_RECEIVED') {
          setIsCaptureTime((prev) => prev + 1);
          console.log('백그라운드 알림 수신');
        }
      };

      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('SW registered: ', registration);
          },
          (err) => {
            console.log('SW registration failed: ', err);
          },
        );
        navigator.serviceWorker.register('/firebase-messaging-sw.js').then(
          (registration) => {
            console.log('FCM registered: ', registration);
          },
          (err) => {
            console.log('FCM registration failed: ', err);
          },
        );

        navigator.serviceWorker.addEventListener('message', handleMessage);
      });

      // return () => {
      //   navigator.serviceWorker.removeEventListener('message', handleMessage);
      // };
    }
  }, [captureTime]);

  return null;
};

export default ServiceWorkerManager;
