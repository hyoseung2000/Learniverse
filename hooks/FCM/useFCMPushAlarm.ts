import "firebase/messaging";

import firebase from "firebase/app";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { captureTimeState } from "@/recoil/atom";

import useFirebaseInit from "./useFirebaseInit";

const useFCMPushAlarm = () => {
  useFirebaseInit();

  const setIsCaptureTime = useSetRecoilState(captureTimeState);

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
