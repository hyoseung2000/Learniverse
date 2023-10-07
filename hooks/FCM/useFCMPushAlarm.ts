import "firebase/messaging";

import firebase from "firebase/app";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { captureTimeState } from "@/recoil/atom";

import useFirebaseInit from "./useFirebaseInit";

const useFCMPushAlarm = () => {
  useFirebaseInit();
  const [renderKey, setRenderKey] = useState(2);
  const channel = new BroadcastChannel('fcm_channel'); // BroadcastChannel 구독
  const [isCaptureTime, setIsCaptureTime] = useRecoilState(captureTimeState);

  useEffect(() => {
    channel.onmessage = function (e) {
      setRenderKey((prevKey) => prevKey + 1);
      setIsCaptureTime((prev) => prev + 1);

      console.log('백그라운드 알림', renderKey, isCaptureTime);
    };
  }, []);

  useEffect(() => {
    const messaging = firebase.messaging();

    const unsubscribe = messaging.onMessage((payload) => {
      console.log('[Foreground]Message received. ', payload);
      setIsCaptureTime((prev) => prev + 1);
    });

    return () => unsubscribe();
  }, []);
};

export default useFCMPushAlarm;
