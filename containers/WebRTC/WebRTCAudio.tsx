/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

interface WebRTCAudioProps {
  mediaStream: MediaStream | undefined;
}

const WebRTCAudio = ({ mediaStream }: WebRTCAudioProps) => {
  const viewRef = useRef<HTMLAudioElement>(null);

  console.log(mediaStream);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = mediaStream || null;
  }, [mediaStream]);

  return (
    <StAudioWrapper>
      <StAudio ref={viewRef} autoPlay controls muted={false} />
    </StAudioWrapper>
  );
};

export default WebRTCAudio;

const StAudioWrapper = styled.div`
  display: none;
`;

const StAudio = styled.audio``;
