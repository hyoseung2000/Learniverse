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
  const [isMedia, handleMedia] = useToggle();
  const [isMike, handleMike] = useToggle();

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
`;

const StSettingBtnWrapper = styled.div``;

const StStudyroomBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  width: fit-content;
`;
