import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getCoreEndtime } from '@/apis/coretimes';
import { useToggle } from '@/hooks/Common';
import { useFCMPushAlarm } from '@/hooks/FCM';
import {
  useChatHandler,
  useSocketConnection,
  useVideoSelector,
  useWebRTC,
} from '@/hooks/Socket';
import { captureTimeState, memberIdState } from '@/recoil/atom';
import { getNickName } from '@/utils/getNicknames';

import WebRTCLayout from './WebRTCLayout';

const WebRTCContainer = () => {
  // 전역 상태 (coreTimeId, memberId, 캡처 시간)
  const router = useRouter();
  const { coreTimeId } = router.query;
  const curMemberId = useRecoilValue(memberIdState);

  // 푸시 알림 받기
  useFCMPushAlarm();
  const captureTime = useRecoilValue(captureTimeState);

  // 현재 코어타임, 사용자 관련 상태
  const [curNickname, setCurNickname] = useState('');
  const [curCoreTimeId, setCurCoreTimeId] = useState<number>();
  const [curCoreEndTime, setCurCoreEndTime] = useState<Date>();

  // 소켓 관련 상태
  const curSocket = useSocketConnection(curCoreTimeId!);
  const {
    produce,
    curMembers,
    videoStreams,
    audioStreams,
    chattingList,
    addChattingList,
    handleCloseProducer,
    handleExitRoom,
  } = useWebRTC(curCoreTimeId!, curMemberId!, curSocket!);
  const [chatting, setChatting, handleSendChatting] = useChatHandler(
    curSocket!,
    curMemberId,
    curNickname!,
    addChattingList,
  );

  // 토글 버튼
  const [isMedia, handleMedia] = useToggle();
  const [isMike, handleMike] = useToggle();
  const [isSpeaker, handleSpeaker] = useToggle();
  const [selectedVideo, handleSelectVideo] = useVideoSelector();

  const setCoreEndTime = async () => {
    const coreEndTime = await getCoreEndtime(Number(curCoreTimeId));
    setCurCoreEndTime(coreEndTime);
  };

  const setNickname = async () => {
    const nickname = await getNickName(curMemberId!);
    setCurNickname(nickname);
  };

  const handleTurnOff = async (type: string) => {
    const medias = type === 'video' ? videoStreams : audioStreams;
    const foundPeer = medias.find((media) => media.memberId === curMemberId);
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

  useEffect(() => {
    if (curMemberId && coreTimeId) {
      setCurCoreTimeId(Number(coreTimeId));
    }
  }, [curMemberId, coreTimeId]);

  useEffect(() => {
    setNickname();
  }, [curMemberId]);

  useEffect(() => {
    if (curCoreTimeId) {
      setCoreEndTime();
    }
  }, [curCoreTimeId]);

  return (
    <WebRTCLayout
      captureTime={captureTime}
      coreEndTime={curCoreEndTime!}
      curNickname={curNickname!}
      curCoreTimeId={curCoreTimeId!}
      curMemberId={curMemberId!}
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
