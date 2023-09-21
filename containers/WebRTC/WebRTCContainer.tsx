/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { Chatting } from '@/components/Coretime/Chatting';
import Gallery from '@/components/Coretime/Gallery/Gallery';
import { Member } from '@/components/Coretime/Member';
import {
  MediaBtn,
  MikeBtn,
  SpeakerBtn,
  StudyroomBtn,
} from '@/components/Coretime/Setting';
import { TimeProvider, Timer } from '@/components/Coretime/Timer';
import { WebRTCAudio, WebRTCVideo } from '@/components/Coretime/WebRTCMedia';
import { useSocketConnection } from '@/hooks/Socket/useSocketConnection';
import { useWebRTC } from '@/hooks/Socket/useWebRTC';
import useModal from '@/hooks/useModal';
import { usePushNotification } from '@/hooks/usePushNotification';
import { memberIdState } from '@/recoil/atom';
import { ChattingInfo, ConsumeInfo } from '@/types/socket';
import { getTime } from '@/utils/getTime';

const WebRTCContainer = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const name = useRecoilValue(memberIdState);

  const [curName, setCurName] = useState<string>();
  const [curRoomId, setRoomId] = useState<string>();
  const curSocket = useSocketConnection(curRoomId!);
  const {
    curMembers,
    curDevice,
    curProducer,
    curPeerList,
    videoStreams,
    audioStreams,
    chattingList,
    addChattingList,
  } = useWebRTC(curRoomId!, curName!, curSocket!);

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [chatting, setChatting] = useState<string>('');

  const [isMedia, setIsMedia] = useState(true);
  const [isMike, setIsMike] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);

  const gallery = useModal();
  const pushNotification = usePushNotification();

  const handleSendChatting = () => {
    if (!curSocket) return;
    curSocket.emit('message', chatting);
    const sentChat: ChattingInfo = {
      name: name.toString(),
      message: chatting,
      time: getTime(new Date()),
    };
    addChattingList(sentChat);
    setChatting('');
  };

  const handleMedia = () => {
    setIsMedia((prevState) => !prevState);
  };
  const handleMike = () => {
    setIsMike((prevState) => !prevState);
  };
  const handleSpeaker = () => {
    setIsSpeaker((prevState) => !prevState);
  };
  const handleSelectVideo = (stream: ConsumeInfo) => {
    setSelectedVideo(
      selectedVideo === stream.producer_id ? null : stream.producer_id,
    );
  };

  useEffect(() => {
    if (name && room_id) {
      setCurName(name.toString());
      setRoomId(room_id as string);
    }
  }, [name, room_id]);

  useEffect(() => {
    if (pushNotification) {
      pushNotification.fireNotification('스크린이 캡처되었습니다!', {
        body: '60초 이내에 전송해주세요!',
      });
    }
  }, []);

  return (
    <StWebRTCContainerWrapper>
      <StMediaContainer>
        <StSettingWrapper>
          <StSettingBtnWrapper>
            <TimeProvider>
              <Timer />
            </TimeProvider>
            <MediaBtn isMedia={isMedia} handleMedia={handleMedia} />
            <MikeBtn isMike={isMike} handleMike={handleMike} />
            <SpeakerBtn isSpeaker={isSpeaker} handleSpeaker={handleSpeaker} />
          </StSettingBtnWrapper>
          <StStudyroomBtnWrapper>
            <StudyroomBtn name="issue" handleClick={gallery.toggle} />
            <StudyroomBtn name="gallery" handleClick={gallery.toggle} />
          </StStudyroomBtnWrapper>
        </StSettingWrapper>
        <StMediaWrapper>
          {videoStreams.map((stream) => (
            <WebRTCVideo
              key={stream.producer_id}
              roomId={curRoomId!}
              nickname={stream.nickname}
              mediaStream={stream.stream}
              isSelected={selectedVideo === stream.producer_id}
              onClick={() => handleSelectVideo(stream)}
            />
          ))}
          {audioStreams.map((stream) => (
            <WebRTCAudio
              key={stream.producer_id}
              mediaStream={stream.stream}
              ismuted={!isSpeaker}
            />
          ))}
        </StMediaWrapper>
      </StMediaContainer>
      <StCoretimeInfoWrapper>
        <Member curMembers={curMembers} />
        <StChattingWrapper>
          <Chatting chattingList={chattingList} />
          <StChatInputWrapper>
            <StChatInput
              type="text"
              placeholder="메시지를 입력하세요."
              value={chatting || ''}
              onChange={(e) => setChatting(e.target.value)}
            />
            <button type="button" onClick={handleSendChatting}>
              전송
            </button>
          </StChatInputWrapper>
        </StChattingWrapper>
        <StCoreTimeBtnWrapper>
          <StExitButton type="button">코어타임 나가기</StExitButton>
        </StCoreTimeBtnWrapper>
      </StCoretimeInfoWrapper>
      <StGalleryModalWrapper $showing={gallery.isShowing}>
        <Gallery isShowing={gallery.isShowing} handleCancel={gallery.toggle} />
      </StGalleryModalWrapper>
    </StWebRTCContainerWrapper>
  );
};

export default WebRTCContainer;

const StWebRTCContainerWrapper = styled.main`
  display: grid;
  grid-template-columns: 3fr 2fr;
`;

const StMediaContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 2rem 0rem 2rem 6.5rem;
  box-sizing: border-box;
`;

const StSettingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StSettingBtnWrapper = styled.div``;

const StMediaWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;

  width: fit-content;
`;

const StCoretimeInfoWrapper = styled.section`
  width: 100%;

  box-sizing: border-box;
  padding: 2rem 6.5rem 2rem 2rem;
`;

const StChattingWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 33.9rem;
  padding: 1.8rem;
  box-sizing: border-box;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 38.14%,
    rgba(238, 238, 250, 0.03) 128.32%
  );

  & > h3 {
    padding: 0 1rem 1rem 2rem;

    ${({ theme }) => theme.fonts.Title1};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StChatInputWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 4rem;

  border-radius: 0 0 2rem 2rem;
  background: ${({ theme }) => theme.colors.White};

  & > button {
    box-sizing: border-box;
    padding: 0.5rem 1rem;

    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.Learniverse_BG};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StChatInput = styled.input`
  width: 75%;
  padding: 0.7rem 2rem;
  ${({ theme }) => theme.fonts.Body1};
`;

const StCoreTimeBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  padding-top: 3rem;
`;

const StStudyroomBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  width: fit-content;
`;

const StExitButton = styled.button`
  padding: 1.2rem 7.6rem;

  border-radius: 100rem;
  background-color: ${({ theme }) => theme.colors.Purple3};
  box-shadow: 2.47864px 4.33762px 3.71796px 1.23932px rgba(0, 0, 0, 0.15),
    0.61966px 1.23932px 7.43592px 4.33762px rgba(153, 153, 153, 0.3) inset,
    0.61966px 1.23932px 8.67524px 4.33762px rgba(255, 255, 255, 0.15) inset;

  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title2};
`;

const StGalleryModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
