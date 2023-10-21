import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getPresignedUrl } from '@/apis/alarm';
import { createCapture, putFile } from '@/apis/coretimes';
import { addMoon } from '@/apis/profile';
import { useModal, useToggle } from '@/hooks/Common';
import { useFCMPushAlarm } from '@/hooks/FCM';
import { useSocketConnection, useWebRTC } from '@/hooks/Socket';
import { captureTimeState, memberIdState, moonScoreState } from '@/recoil/atom';
import { formatHHMMSS } from '@/utils/getFormattedTime';

import {
  CoreTimeInfoContainer,
  MediaContainer,
  ModalContainer,
  SettingContainer,
} from './CoretimeContainers';

const WebRTCContainer = () => {
  // 코어타임, 멤버 관련 상태
  const router = useRouter();
  const { coreTimeId } = router.query;
  const curMemberId = useRecoilValue(memberIdState);
  const captureTime = useRecoilValue(captureTimeState);
  const [curMoonScore, setCurMoonScore] = useRecoilState(moonScoreState);
  const [curCoreTimeId, setCurCoreTimeId] = useState<number>();
  const [isEnter, setIsEnter] = useState(false);

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
  const [capturedImageFile, setCapturedImageFile] = useState<
    File | undefined
  >();

  // 모달, 토글
  const issue = useModal();
  const cIssue = useModal();
  const discuss = useModal();
  const gallery = useModal();
  const exit = useModal();
  const capture = useModal();
  const captureComplete = useModal();
  const [isSpeaker, handleSpeaker] = useToggle();

  // 푸시 알림 받기
  useFCMPushAlarm();

  const handleTurnOff = async (type: string) => {
    const medias = type === 'video' ? videoStreams : audioStreams;
    const foundPeer = medias.find((media) => media.memberId === curMemberId);
    if (foundPeer) {
      await handleCloseProducer(foundPeer.consumer_id);
    } else {
      console.error('No match found');
    }
  };

  const handleUploadImage = async () => {
    const now = new Date();
    const captureData = {
      coreTimeId: Number(curCoreTimeId),
      memberId: Number(curMemberId),
      fileName: `coretime-${curCoreTimeId}-${curMemberId}-${formatHHMMSS(
        now.toString(),
      )}.png`,
    };
    const url: string = await getPresignedUrl(captureData.fileName);
    if (capturedImageFile) {
      await putFile(url, capturedImageFile);
      await createCapture(captureData);
      const moonScoreRes = await addMoon(curMemberId, curMoonScore);
      if (moonScoreRes === 422) {
        setCurMoonScore(4);
      }
    }
  };

  const handleCapture = () => {
    handleUploadImage();
    capture.toggle();
    captureComplete.toggle();
    setCapturedImageFile(undefined);
  };

  useEffect(() => {
    console.log(router.query);
    if (router.query.coreTimeId) {
      setCurCoreTimeId(Number(router.query.coreTimeId));
    }
  }, [router]);

  useEffect(() => {
    if (curMemberId && coreTimeId) {
      setCurCoreTimeId(Number(coreTimeId));
    }
  }, [curMemberId, coreTimeId]);

  useEffect(() => {
    if (captureTime === 0 && !isEnter) {
      setIsEnter(true);
      return;
    }
    if (isEnter) {
      capture.setShowing(true);
    }
  }, [captureTime]);

  return (
    <StWebRTCContainerWrapper>
      <StWebRTCContainer>
        <SettingContainer
          curCoreTimeId={curCoreTimeId!}
          produce={produce}
          issue={issue}
          gallery={gallery}
          handleTurnOff={handleTurnOff}
          isSpeaker={isSpeaker}
          handleSpeaker={handleSpeaker}
        />
        <MediaContainer
          curCoreTimeId={curCoreTimeId!}
          videoStreams={videoStreams}
          audioStreams={audioStreams}
          setCapturedImageFile={setCapturedImageFile}
          isSpeaker={isSpeaker}
        />
      </StWebRTCContainer>

      <CoreTimeInfoContainer
        curSocket={curSocket}
        curMembers={curMembers}
        chattingList={chattingList}
        addChattingList={addChattingList}
        exit={exit}
      />

      <ModalContainer
        coreTimeId={curCoreTimeId!}
        issue={issue}
        cIssue={cIssue}
        discuss={discuss}
        gallery={gallery}
        exit={exit}
        capture={capture}
        captureComplete={captureComplete}
        capturedImageFile={capturedImageFile}
        handleCapture={handleCapture}
        handleExitRoom={handleExitRoom}
      />
    </StWebRTCContainerWrapper>
  );
};

export default WebRTCContainer;

const StWebRTCContainerWrapper = styled.main`
  display: grid;
  grid-template-columns: 3fr 2fr;
`;

const StWebRTCContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 2rem 0rem 2rem 6.5rem;
  box-sizing: border-box;
`;
