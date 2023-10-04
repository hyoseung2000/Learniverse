import { Dispatch, SetStateAction, useState } from 'react';
import { styled } from 'styled-components';

import { Chatting } from '@/components/Coretime/Chatting';
import Gallery from '@/components/Coretime/Gallery/Gallery';
import {
  CreateIssueModal,
  DiscussIssueModal,
  IssueModal,
} from '@/components/Coretime/Issue';
import { Member } from '@/components/Coretime/Member';
import {
  MediaBtn,
  MikeBtn,
  SpeakerBtn,
  StudyroomBtn,
} from '@/components/Coretime/Setting';
import { TimeProvider, Timer } from '@/components/Coretime/Timer';
import { WebRTCAudio, WebRTCVideo } from '@/components/Coretime/WebRTCMedia';
import useModal, { UseModalReturnType } from '@/hooks/useModal';
import { ChattingInfo, ConsumeInfo, RoomPeerInfo } from '@/types/socket';

interface WebRTCLayoutProps {
  coreEndTime: Date;
  curNickname: string;
  curRoomId: string;
  isMedia: boolean;
  handleMedia: () => void;
  isMike: boolean;
  handleMike: () => void;
  isSpeaker: boolean;
  handleSpeaker: () => void;
  selectedVideo: string | null;
  chatting: string;
  setChatting: Dispatch<SetStateAction<string>>;
  curMembers: RoomPeerInfo[];
  videoStreams: ConsumeInfo[];
  audioStreams: ConsumeInfo[];
  handleSelectVideo: (stream: ConsumeInfo) => void;
  chattingList: ChattingInfo[];
  handleSendChatting: () => void;
  handleExitRoom: () => void;
  gallery: UseModalReturnType;
  issue: UseModalReturnType;
}

const WebRTCLayout = ({
  coreEndTime,
  curNickname,
  curRoomId,
  isMedia,
  handleMedia,
  isMike,
  handleMike,
  isSpeaker,
  handleSpeaker,
  selectedVideo,
  chatting,
  setChatting,
  curMembers,
  videoStreams,
  audioStreams,
  handleSelectVideo,
  chattingList,
  handleSendChatting,
  handleExitRoom,
  gallery,
  issue,
}: WebRTCLayoutProps) => {
  const [isSending, setIsSending] = useState(false);
  const cIssue = useModal();
  const discuss = useModal();

  const handleChatSend = async () => {
    if (isSending) return;

    setIsSending(true);
    await handleSendChatting();
    setIsSending(false);
  };

  const handleCreateIssue = () => {
    issue.toggle();
    cIssue.toggle();
  };

  const handleDiscuss = () => {
    issue.toggle();
    discuss.toggle();
  };

  return (
    <StWebRTCContainerWrapper>
      <StMediaContainer>
        <StSettingWrapper>
          <StSettingBtnWrapper>
            <TimeProvider coreEndTime={coreEndTime}>
              <Timer />
            </TimeProvider>
            <MediaBtn isMedia={isMedia} handleMedia={handleMedia} />
            <MikeBtn isMike={isMike} handleMike={handleMike} />
            <SpeakerBtn isSpeaker={isSpeaker} handleSpeaker={handleSpeaker} />
          </StSettingBtnWrapper>
          <StStudyroomBtnWrapper>
            <StudyroomBtn name="issue" handleClick={issue.toggle} />
            <StudyroomBtn name="gallery" handleClick={gallery.toggle} />
          </StStudyroomBtnWrapper>
        </StSettingWrapper>
        <StMediaWrapper>
          {videoStreams.map((stream) => (
            <WebRTCVideo
              key={stream.consumer_id}
              roomId={curRoomId!}
              nickname={stream.nickname}
              mediaStream={stream.stream}
              isSelected={selectedVideo === stream.consumer_id}
              onClick={() => handleSelectVideo(stream)}
            />
          ))}
          {audioStreams.map((stream) => (
            <WebRTCAudio
              key={stream.consumer_id}
              mediaStream={stream.stream}
              ismuted={!isSpeaker}
            />
          ))}
        </StMediaWrapper>
      </StMediaContainer>
      <StCoretimeInfoWrapper>
        <Member curMembers={curMembers} />
        <StChattingWrapper>
          <Chatting curNickname={curNickname} chattingList={chattingList} />
          <StChatInputWrapper>
            <StChatInput
              type="text"
              placeholder="메시지를 입력하세요."
              value={chatting || ''}
              onChange={(e) => setChatting(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter' && chatting.trim()) {
                  e.preventDefault();
                  handleChatSend();
                }
              }}
            />
            <button type="button" onClick={handleSendChatting}>
              전송
            </button>
          </StChatInputWrapper>
        </StChattingWrapper>
        <StCoreTimeBtnWrapper>
          <StExitButton type="button" onClick={handleExitRoom}>
            코어타임 나가기
          </StExitButton>
        </StCoreTimeBtnWrapper>
      </StCoretimeInfoWrapper>
      <StGalleryModalWrapper $showing={gallery.isShowing}>
        <Gallery isShowing={gallery.isShowing} handleCancel={gallery.toggle} />
      </StGalleryModalWrapper>
      <StIssueModalWrapper $showing={issue.isShowing}>
        <IssueModal
          isShowing={issue.isShowing}
          handleClick={handleDiscuss}
          handleCreate={handleCreateIssue}
          handleCancel={issue.toggle}
        />
      </StIssueModalWrapper>
      <StCreateIssueModalWrapper $showing={cIssue.isShowing}>
        <CreateIssueModal
          isShowing={cIssue.isShowing}
          handleCancel={cIssue.toggle}
        />
      </StCreateIssueModalWrapper>
      <StDiscussIssueModalWrapper $showing={discuss.isShowing}>
        <DiscussIssueModal
          isShowing={discuss.isShowing}
          handleCancel={discuss.toggle}
        />
      </StDiscussIssueModalWrapper>
    </StWebRTCContainerWrapper>
  );
};

export default WebRTCLayout;

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
  box-shadow:
    2.47864px 4.33762px 3.71796px 1.23932px rgba(0, 0, 0, 0.15),
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

const StIssueModalWrapper = styled.div<{ $showing: boolean }>`
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

const StCreateIssueModalWrapper = styled.div<{ $showing: boolean }>`
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

const StDiscussIssueModalWrapper = styled.div<{ $showing: boolean }>`
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
