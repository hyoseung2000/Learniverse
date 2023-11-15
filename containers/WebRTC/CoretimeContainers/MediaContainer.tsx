import React, { Dispatch, SetStateAction } from 'react';
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

  const selectedStream = videoStreams.find(
    (stream) => stream.consumer_id === selectedVideo,
  );
  const otherStreams = videoStreams.filter(
    (stream) => stream.consumer_id !== selectedVideo,
  );

  return (
    <StMediaWrapper>
      {selectedStream && (
        <WebRTCVideo
          key={selectedStream.consumer_id}
          memberId={selectedStream.memberId}
          coreTimeId={curCoreTimeId!}
          nickname={selectedStream.nickname}
          mediaStream={selectedStream.stream}
          captureTime={captureTime}
          setCapturedImageFile={setCapturedImageFile}
          isSelected
          onClick={() => handleSelectVideo(selectedStream)}
        />
      )}
      {otherStreams.map((stream) => (
        <WebRTCVideo
          key={stream.consumer_id}
          memberId={stream.memberId}
          coreTimeId={curCoreTimeId!}
          nickname={stream.nickname}
          mediaStream={stream.stream}
          captureTime={captureTime}
          setCapturedImageFile={setCapturedImageFile}
          isSelected={false}
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
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;
