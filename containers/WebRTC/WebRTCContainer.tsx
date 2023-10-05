/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-globals */
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';
/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { createToken } from '@/apis/alarm';
import { getCoreEndtime } from '@/apis/coretimes';
import {
  useChatHandler,
  useSocketConnection,
  useVideoSelector,
  useWebRTC,
} from '@/hooks/Socket';
import useModal from '@/hooks/useModal';
import { usePushNotification } from '@/hooks/usePushNotification';
import useToggle from '@/hooks/useToggle';
import { memberIdState } from '@/recoil/atom';
import { getNickName } from '@/utils/getNicknames';

import WebRTCLayout from './WebRTCLayout';

const WebRTCContainer = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const name = useRecoilValue(memberIdState);

  const [curName, setCurName] = useState<string>();
  const [curNickname, setCurNickname] = useState('');
  const [curRoomId, setRoomId] = useState<string>();
  const [curCoreEndTime, setCurCoreEndTime] = useState<Date>();

  const curSocket = useSocketConnection(curRoomId!);
  const {
    produce,
    curMembers,
    // curDevice,
    // curPeerList,
    videoStreams,
    audioStreams,
    chattingList,
    addChattingList,
    handleCloseProducer,
    handleExitRoom,
  } = useWebRTC(curRoomId!, curName!, curSocket!);

  const [isMedia, handleMedia] = useToggle();
  const [isMike, handleMike] = useToggle();
  const [isSpeaker, handleSpeaker] = useToggle();
  const [selectedVideo, handleSelectVideo] = useVideoSelector();
  const [chatting, setChatting, handleSendChatting] = useChatHandler(
    curSocket!,
    curNickname!,
    addChattingList,
  );
  const coreIssue = useModal();

  const pushNotification = usePushNotification();
  const [isCaptureTime, setIsCaptureTime] = useState(false);

  const setCoreEndTime = async () => {
    const coreEndTime = await getCoreEndtime(Number(curRoomId));
    setCurCoreEndTime(coreEndTime);
  };

  const setNickname = async () => {
    const nickname = await getNickName(curName!);
    setCurNickname(nickname);
  };

  const handleTurnOff = async (type: string) => {
    const medias = type === 'video' ? videoStreams : audioStreams;
    const foundPeer = medias.find((media) => media.name === curName);
    if (foundPeer) {
      await handleCloseProducer(foundPeer.consumer_id);
    } else {
      console.error('No match found');
    }
  };

  const handleMediaToggle = async () => {
    if (isMedia) {
      await handleTurnOff('video');
    } else {
      await produce('screenType');
    }
    handleMedia();
  };

  const handleMikeToggle = async () => {
    if (isMike) {
      await handleTurnOff('audio');
    } else {
      await produce('audioType');
    }
    handleMike();
  };

  const memberId = useRecoilValue(memberIdState);

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
      console.log('[Foreground]Message received. ', payload);
      setIsCaptureTime((prev) => !prev);
      pushNotification?.fireNotification('스크린이 캡처되었습니다!', {
        body: '60초 이내에 전송해주세요!',
      });
    });

    // onBackgroundMessage(messaging, (payload) => {
    //   console.log(
    //     '[firebase-messaging-sw.js] Received background message ',
    //     payload,
    //   );

    //   const notificationTitle = '[Background] 스크린이 캡처되었습니다!';
    //   const notificationOptions = {
    //     body: payload,
    //     icon: '/public/favicon-32x32.png',
    //   };

    //   self.registration.showNotification(
    //     notificationTitle,
    //     notificationOptions,
    //   );
    // }
    // );
  };

  useEffect(() => {
    if (name && room_id) {
      setCurName(name.toString());
      setRoomId(room_id as string);
    }
  }, [name, room_id]);

  useEffect(() => {
    if (curName) {
      setNickname();
    }
  }, [curName]);

  useEffect(() => {
    if (curRoomId) {
      setCoreEndTime();
    }
  }, [curRoomId]);

  useEffect(() => {
    askPermission();
    if (pushNotification) {
      pushNotification.fireNotification('스크린이 캡처되었습니다!', {
        body: '60초 이내에 전송해주세요!',
      });
    }
  }, []);

  return (
    <WebRTCLayout
      isCaptureTime={isCaptureTime}
      coreEndTime={curCoreEndTime!}
      curNickname={curNickname!}
      curRoomId={curRoomId!}
      curMemberId={curName!}
      isMedia={isMedia}
      handleMedia={handleMediaToggle}
      isMike={isMike}
      handleMike={handleMikeToggle}
      isSpeaker={isSpeaker}
      handleSpeaker={handleSpeaker}
      selectedVideo={selectedVideo}
      chatting={chatting}
      setChatting={setChatting}
      curMembers={curMembers}
      videoStreams={videoStreams}
      audioStreams={audioStreams}
      handleSelectVideo={handleSelectVideo}
      chattingList={chattingList}
      handleSendChatting={handleSendChatting}
      handleExitRoom={handleExitRoom}
      issue={coreIssue}
    />
  );
};

export default WebRTCContainer;
