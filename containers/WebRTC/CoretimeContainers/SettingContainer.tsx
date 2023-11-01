/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { getCoreEndtime } from '@/apis/coretimes';
import {
  MediaBtn,
  MikeBtn,
  SpeakerBtn,
  StudyroomBtn,
} from '@/components/Coretime/Setting';
import { TimeProvider, Timer } from '@/components/Coretime/Timer';
import { useToggle } from '@/hooks/Common';
import { UseModalReturnType } from '@/hooks/Common/useModal';
import { MediaType } from '@/types/socket';

interface SettingContainerProps {
  curCoreTimeId: number;
  produce: (type: MediaType) => Promise<void>;
  issue: UseModalReturnType;
  gallery: UseModalReturnType;
  isSpeaker: boolean;
  handleSpeaker: () => void;
  handleTurnOff: (type: string) => Promise<void>;
}
const SettingContainer = ({
  curCoreTimeId,
  produce,
  issue,
  gallery,
  isSpeaker,
  handleSpeaker,
  handleTurnOff,
}: SettingContainerProps) => {
  const [curCoreEndTime, setCurCoreEndTime] = useState<Date>();
  const [isMedia, handleMedia] = useToggle(false);
  const [isMike, handleMike] = useToggle(false);

  const setCoreEndTime = async () => {
    const coreEndTime = await getCoreEndtime(curCoreTimeId);
    setCurCoreEndTime(coreEndTime);
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
    if (curCoreTimeId) {
      setCoreEndTime();
    }
  }, [curCoreTimeId]);

  return (
    <StSettingWrapper>
      <StSettingBtnWrapper>
        <TimeProvider coreEndTime={curCoreEndTime!}>
          <Timer />
        </TimeProvider>
        <MediaBtn isMedia={isMedia} handleMedia={handleMediaToggle} />
        <MikeBtn isMike={isMike} handleMike={handleMikeToggle} />
        <SpeakerBtn isSpeaker={isSpeaker} handleSpeaker={handleSpeaker} />
      </StSettingBtnWrapper>
      {!isMedia && <StShare>코딩중인 화면을 공유해주세요!</StShare>}
      <StStudyroomBtnWrapper>
        <StudyroomBtn name="issue" handleClick={issue.toggle} />
        <StudyroomBtn name="gallery" handleClick={gallery.toggle} />
      </StStudyroomBtnWrapper>
    </StSettingWrapper>
  );
};

export default SettingContainer;

const StSettingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StSettingBtnWrapper = styled.div``;

const StStudyroomBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  width: fit-content;
`;

const StShare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 34rem;
  height: 5rem;

  border-radius: 2.5rem;
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title4};
  background: linear-gradient(
      0deg,
      rgba(238, 238, 250, 0.15) 0%,
      rgba(238, 238, 250, 0.15) 100%
    ),
    linear-gradient(
      47deg,
      rgba(238, 238, 250, 0.1) 6.63%,
      rgba(238, 238, 250, 0.1) 54.72%,
      rgba(238, 238, 250, 0) 96.81%
    );
  box-shadow: -5px -5px 20px 0px rgba(255, 255, 255, 0.3) inset,
    0px 4px 150px 0px rgba(153, 133, 254, 0.2) inset,
    0px 10px 50px 0px rgba(255, 255, 255, 0.5) inset;
`;
