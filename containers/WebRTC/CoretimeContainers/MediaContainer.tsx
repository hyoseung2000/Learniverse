import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { WebRTCAudio, WebRTCVideo } from '@/components/Coretime/WebRTCMedia';
import { useVideoSelector } from '@/hooks/Socket';
import { captureTimeState } from '@/recoil/atom';
import { ConsumeInfo } from '@/types/socket';

interface MediaContainerProps {
  curCoreTimeId: number;
  videoStreams: ConsumeInfo[];
  audioStreams: ConsumeInfo[];
  setCapturedImageFile: Dispatch<SetStateAction<File | undefined>>;
  isSpeaker: boolean;
}
const MediaContainer = ({
  curCoreTimeId,
  videoStreams,
  audioStreams,
  setCapturedImageFile,
  isSpeaker,
}: MediaContainerProps) => {
  const captureTime = useRecoilValue(captureTimeState);
  const [selectedVideo, handleSelectVideo] = useVideoSelector();

  console.log(videoStreams, audioStreams);
  return (
    <StMediaWrapper>
      {videoStreams.map((stream) => (
        <WebRTCVideo
          key={stream.consumer_id}
          memberId={stream.memberId}
          coreTimeId={curCoreTimeId!}
          nickname={stream.nickname}
          mediaStream={stream.stream}
          captureTime={captureTime}
          setCapturedImageFile={setCapturedImageFile}
          isSelected={selectedVideo === stream.consumer_id}
          onClick={() => handleSelectVideo(stream)}
        />
      ))}
      {audioStreams.map((stream) => (
        <WebRTCAudio
          key={stream.consumer_id}
          memberId={stream.memberId}
          mediaStream={stream.stream}
          ismuted={!isSpeaker}
        />
      ))}
    </StMediaWrapper>
  );
};

export default MediaContainer;

const StMediaWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;

  width: fit-content;
`;
