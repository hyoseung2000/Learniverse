/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getCoreEndtime } from '@/apis/coretimes';
import {
  useChatHandler,
  useSocketConnection,
  useVideoSelector,
  useWebRTC,
} from '@/hooks/Socket';
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
  const pushNotification = usePushNotification();

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
      console.log('No match found');
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
    console.log(isMike);
    if (isMike) {
      await handleTurnOff('audio');
    } else {
      await produce('audioType');
    }
    handleMike();
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
    if (pushNotification) {
      pushNotification.fireNotification('스크린이 캡처되었습니다!', {
        body: '60초 이내에 전송해주세요!',
      });
    }
  }, []);

  return (
    <WebRTCLayout
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
    />
  );
};

export default WebRTCContainer;
