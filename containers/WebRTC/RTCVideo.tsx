/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

interface RTCVideoProps {
  mediaStream: MediaStream | undefined;
}

const RTCVideo = ({ mediaStream }: RTCVideoProps) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = mediaStream || null;
  }, [mediaStream]);

  return <StVideo ref={viewRef} autoPlay playsInline />;
};

export default RTCVideo;

const StVideo = styled.video`
  min-width: 30rem;
  max-width: 30rem;
  min-height: 20rem;
  max-height: 20rem;

  background-color: ${({ theme }) => theme.colors.Gray4};
  border-radius: 1rem;
`;
